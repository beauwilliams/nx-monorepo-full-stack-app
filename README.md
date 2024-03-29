# Nx Monorepo Typestack Web App

![ezgif-4-59cc8e90db](https://user-images.githubusercontent.com/7098556/188893537-150670a6-3415-4790-b682-9e394df169fb.gif)

## Notable app features

- End to end typed
- Sane defaults
- Workspace management
- Enforceable static workspace dependency isolation (internal libs/apps cant inherit classes from other specified)
- Dependency graph
- Auto-code-gen on backend from schemas
- Auto-code-gen on frontend from auto-generated backend endpoints
- Auto-code-gen of boilerplate for libraries, apps, react components and more
- Frontend: NextJs, Tailwind, URQL, GraphQL Codegen
- Backend: Docker, PostgreSQL, Nest, Fastify, GraphQL,Prisma, Mercurius, Class-transformer, Class-validator

## Steps to build the app

### Setup backend

A backend workspace with:

- NodeJs, 100% typescript and typed
- Postgresql db
- GraphQL
- Docker-compose for db migrations
- Prisma database ORM to handle migrations, view database in web browser and more etc
- Auto-generated graphql endpoints with validation via prisma
- Fastify server instead of express for speed (Over 3x faster than expressJS @ 50KTPS+)
- Mercurius, a graphql adapter for fastify
- Basic CORS support using fastify builtin
- Sane http header security policy defaults via helmet, auto-disabled in dev mode

```bash
#Install basic modules needed for backend using
npx create-nx-workspace my-full-stack-app --preset=nest --tags "scope:my-backend"
npm i @nestjs/platform-fastify @nestjs/graphql @nestjs/mercurius graphql mercurius
npm uninstall @nestjs/platform-express #replace express with fastify


#Set up app module ts to use mercurius/graphql and swap express for fastify [app.module.ts] [main.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/e12c03a0e02224d3963cc147e7293d970ea0709f


#Generate our first schemas
npx nx g @nrwl/nest:resource -p my-backend --directory="app/resources" --type="graphql-code-first" --crud --name user --tags "scope:my-backend"


#Set up db workspace and init prisma
npx nx g @nrwl/nest:lib my-backend/data-access-db --buildable --tags "scope:my-backend"
cd libs/my-backend/data-access-db/src/lib && npx prisma init


#Set up docker compose file with data-access-db [docker-compose.yml]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/36c21e66c671b99db7e78f4fe3b79919f0e7c2d1
# Set up prisma [package.json]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/cb447f213061e4372a558549ab96fb47e2bab1f4
# Add docker commands to launch DB [package.json]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/36c21e66c671b99db7e78f4fe3b79919f0e7c2d1


# Add .local.env with DATABASE env like below example [.local.env]
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5433/postgres?schema=public


#Install env-cmd for using the .local.env file
npm i -D env-cmd


#Initialise db with migrations
npm run db:up


#Create basic user model [prisma.schema]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/64e69ed517206b7a7a14451d7a033582f49e5098


#Re-Initialise db with migrations to confirm its working
npm run db:up


#Install prisma client
npm install @prisma/client prisma


#create a generator for graphQL [prisma.schema]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/f8fb5411ab9091482a3f9cef70cfe68e1da3ceff
generator nestgraphql {
    provider                = "node node_modules/prisma-nestjs-graphql"
    output                  = "../../../generated/db-types/src"
    #rest of code ....
}


#Create lib for db types
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/fa1198632460ad09dd6e657e04c750a5285f0f1e
npx nx g @nrwl/nest:lib my-backend/generated/db-types --buildable --tags "scope:my-backend"


#Cleanup and remove unneeded files
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/bdeaed5ff9328ac58f752b080e41e52ce364aa59


#Install class transformer and class validator plus nestjs plugin
npm i class-transformer class-validator prisma-nestjs-graphql


#Re-Initialise db with migrations to confirm its working
npm run db:up


#Clean up uneccessary files and create the user database service [user.*.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/cd4b2ae8a8b51cb3369c3dd4cf7899fd025cfb10


#Create model with Validation using /// to denote validators [prisma.schema]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/c089e537d531873495c37650713def28f9b8bdce
/// @Validator.IsString()
/// @Validator.MaxLength(100)
/// @Validator.MinLength(8)
/// @HideField()
password String


#Update schema and server to enable validation [main.ts] [prisma.schema]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/105a072a9f2939410e455c1ad187902e1b9a08b1


#Re-Initialise db with migrations to confirm its working
npm run db:up


#Test its all working visiting http://localhost:3333/graphiql# and trying some queries
#I should be rejected with BadRequestException
mutation {
  createUser(data:{email: "tes", password: "test123s", name: "t"}) {
    id
    name
    email
  }
}
#I should pass and return back the data with the id
mutation {
  createUser(data:{email: "test@mail.com", password: "test123456", name: "test"}) {
    id
    name
    email
  }
}


#Send a test query to check data is inserted correctly
query {
    user(where: {id: 1, email: "test@mail.com"}) {
    id
    name
    email
    }
}


#Create a script to view the database from a web browser [package.json]
"db:studio": "env-cmd --no-override -f .local.env npx prisma studio"


#Enable CORS  - this is not a production grade CORS setup yet [main.ts]
app.enableCors({
  origin: true,
  credentials: true,
});


#Install helmet to set sane security defaults for http headers [main.ts]
import helmet from 'helmet'
const isProduction = process.env.NODE_ENV === 'production'
const developmentContentSecurityPolicy = {
  directives: {
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://unpkg.com/']
  }
}
app.use(
  helmet({
    contentSecurityPolicy: isProduction ? undefined : developmentContentSecurityPolicy
  })
)


#Set up rate limiting with nestJS fastify adapter with the fastify plugin [my-backend/src/main.ts]

#Install the plugin
npm i @fastify/rate-limit

#Register fastify plugin with our nestJS server
import fastifyRateLimit from '@fastify/rate-limit';

await app.register(fastifyRateLimit, {
global: true,
max: 100,
timeWindow: '1 minute',
errorResponseBuilder: function (_, context) {
    return {
    code: 429,
    error: 'Too Many Requests',
    message: `I only allow ${context.max} requests per ${context.after} to this Website. Try again soon.`,
    date: Date.now(),
    expiresIn: context.ttl, // milliseconds
    };
},
});
```

## Setup Frontend

A frontend workspace with:

- NextJS
- Auto-code-gen of react hooks to fetch data from graphql
- End to end typed
- Serverside rendering of database queries

```bash
#Install nextjs using nx to generate the workspace, selecting css, or other option if preferred
npm i --save-dev @nrwl/next
npx nx g @nrwl/next:app my-frontend --tags "scope:my-frontend"


#Install graphql frontend client
npm i urql
#NOTE: After installing urql I got upstream dependency conflict. Possible solutions are..
#Use legacy flag, I chose to use this and stick with npm for now, either way the same problem persists, yarn just hides it better
#I chose to update my justfile so we can run 'just install $package' and worry about dependency conflicts later without forgetting about it
npm install --legacy-peer-deps
#Or switch to yarn, which tends to handle this issue better without crashing (also fixed issue for me)
rm package-lock.json && yarn install


#Install client side graphql code generation modules
npm i @graphql-codegen/cli @graphql-codegen/near-operation-file-preset @graphql-codegen/typed-document-node @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-urql graphql-codegen


#Install concurrently which we will use to run backend and frontend in one command during development
npm i --save-dev concurrently


#Set up scripts in package.json to run both at once [package.json]
"start:dev": "env-cmd -f .local.env concurrently --kill-others \"npm:db:up\" \"npm:dev:my-frontend\" \"npm:dev:my-backend\" ",
"dev:my-backend": "nx serve my-backend",
"dev:my-frontend": "nx serve my-frontend",


#Test our new frontend is working visiting http://localhost:4200 and commit changes afterward
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/a3565eb3b87d14af93c90cc235d60371a6b5c378


#Set up scripts to perform graphql code generation [package.json]
"gen:gql": "graphql-codegen --config tools/gql-client-side-code-generation/gql-client-side-code-generation.yml --watch"


#Create a library for the graphql code generation
npx nx g @nrwl/node:lib my-client/generated/graphql-types --tags "scope:my-client"


#Create a tools dir and yaml file for graph-ql-code-gen config
mkdir ./tools/gql-client-side-code-generation/
touch ./tools/gql-client-side-code-generation/gql-client-side-code-generation.yml


#Create config for client side graphql endpoint hooks code gen specifying files included to parse [/tools/gql-client-side-code-generation/gql-client-side-code-generation.yml]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/aff183556a72c04e30a38b07bfd170a657f867e6
#..rest of file in commit
documents:
  - 'apps/**/*gql.ts'
  - 'libs/**/*gql.ts'


#Create a client side api dir and gql.ts file to store our first query
mkdir ./apps/my-frontend/api/user/
touch ./apps/my-frontend/api/user/user.gql.ts


#Create our first query used to auto-generate react hooks to fetch data using graphql [/apps/my-frontend/api/user/user.gql.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/285f265188591a92c3caed2c697de8345f402d0d
import { gql } from 'urql'

const GET_USER = gql`
  query GetUser($args: UserWhereUniqueInput!) {
    user(where: $args) {
      name
      email
    }
  }


#Test out autogeneration of client side graphql hooks
npm run gen:gql


#Create client side urql provider to server up the graphql api, later we will enhance this with SSR [apps/my-frontend/api/my-client-api.tsx]
#...rest of code is in commit
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/b2c6e419acd3c8a1f496e5c2ac8e5c8a59c748ef
export const withApi = (Component: FC) => {
  return function ApiWrappedComponent({ ...properties }) {
    return (
      <Provider value={clientApi}>
        <Component {...properties} />
      </Provider>
    );
  };
};


#Import the provider into our app to test, wrapping it in the urql-provider so we can fetch data in the app context [/apps/my-frontend/pages/index.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/b2c6e419acd3c8a1f496e5c2ac8e5c8a59c748ef
import { withApi } from '../api/my-client-api';
#...rest of code
export default withApi(Index)


#Confirm our graphql hooks are working by logging a user from the database [/apps/my-frontend/pages/index.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/b2c6e419acd3c8a1f496e5c2ac8e5c8a59c748ef
import { useGetUserQuery } from '../api/user.gql.gen';
export function Index() {
  const [{ data, fetching }] = useGetUserQuery({
    variables: { args: { id: 1, email: 'test@mail.com' } },
  });
  #log it
  console.log(data);

  #or render it
  return (
    <h1>
        <span> Hello {fetching ? 'there' : data?.user?.name}</span>
        Welcome my-frontend 👋
    </h1>

  )
}


# 🥳 We should now have data displayed from our backend on our frontend 🥳
npm run start:devtools

```

### Setting up Tailwind css

#### Install tailwind using the builtin NX generator.

I chose to install manually, so that we could define some colours, and create a global config.
But the automatic setup is what I might use next time. [See nx docs for ref here](https://nx.dev/recipe/using-tailwind-css-in-react)

```bash
npx nx g @nrwl/next:setup-tailwind --project=my-frontend
```

#### Installing manually

```bash
npm i tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography

cd apps/my-frontend && npx tailwindcss init -p
```

##### Update our postcss config [apps/my-frontend/postcss.config.js]

```javascript
const { join } = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: join(__dirname, 'tailwind.config.js'),
    },
    autoprefixer: {},
  },
};
```

##### Update styles.css to use tailwind [apps/my-frontend/pages/styles.css]

Note: We can delete rest of styles later. For now we keep until we update our pages.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

##### Setup globally shared tailwind presets (i.e colour scheme) for use in multiple apps [./tailwind.workspace.preset.js]

We import typography package globally here as example, [see more presets here](https://tailwindcss.com/docs/presets)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'my-white': '#ffffff',
        'my-grey': '#333333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

##### Update tailwind config in our frontend [my-frontend/tailwind.config.js]

```javascript
const { join } = require('path');

// available since Nx v 12.5
const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

module.exports = {
  presets: [require('../../tailwind.workspace.preset.js')],
  purge: [
    join(__dirname, 'pages/**/*.{js,ts,jsx,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

##### Test our bundle sizes in the frontend. Consider routes for optimisation if necessary.

```bash
npx nx run my-frontend:export
```

[Long manual setup guide here](https://blog.nrwl.io/setup-next-js-to-use-tailwind-with-nx-849b7e21d8d0)

##### Automatic Dark/Light

## Setting up Authentication


*NOTE: gql query createUser, does not encrypt password, its for admin use if anything. FYI. Auth not work when made that way.. use signupInput gql query instead*


### Create lib

```bash
npx nx g @nrwl/nest:resource -p my-backend --directory="app/resources" --type="graphql-code-first" --crud --name authentication
```

### Test sign up graphiql playground

```graphql
mutation {
  signup(signupInput: { email: "test@ysignup.com", password: "tytycftgc" }) {
    id
  }
}
```

### [Implementing auth guards and securing auth](https://github.com/beauwilliams/nx-monorepo-full-stack-app/tree/main/apps/my-backend/src/app/guards/auth-guards)

*Summary*
- Add libraries
- Add jwt modules etc to .module files
- Add validation logic
- Add guards
- Add local strategy
- Test query to confirm its all working

*Commits*
- Using passport -> `npm i passport-jwt`
- [Implementing our own jwt strategies](https://github.com/beauwilliams/nx-monorepo-full-stack-app/tree/main/apps/my-backend/src/app/guards/auth-guards/strategy)
- [Create our set and verify auth guards logic](https://github.com/beauwilliams/nx-monorepo-full-stack-app/tree/main/apps/my-backend/src/app/guards/auth-guards)
- [Add guard decorators to routes](https://github.com/beauwilliams/nx-monorepo-full-stack-app/blob/main/apps/my-backend/src/app/resources/user/user.resolver.ts)
- [make cookies secure](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/ef2461d4dd25be3143c6ec3b07dadc3f80b7f970)
- [add CSRF protection to cookies](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/6844644512f239dafa75780901bb1e50a9fea1ba)
- read best practises: https://www.rfc-editor.org/rfc/rfc8725.html

```graphql
mutation {
  login(loginInput: { email: "test@ysignup.com", password: "tytycftgc" }) {
    id
  }
}
```

![testLogin](https://i.ibb.co/R7YQcVy/Screen-Shot-2022-09-06-at-5-08-12-pm.png)

Now we will verify our jwt [here at jwt.io](jwt.io)

![verifyCookie](https://i.ibb.co/FVPJ4D4/Screen-Shot-2022-09-06-at-5-13-34-pm.png)

### Create some pages for /login and /signup

```bash
npx nx g @nrwl/next:page --project=my-frontend --style=css --name=login
npx nx g @nrwl/next:page --project=my-frontend --style=css --name=signup
```

### Testing our login through the dev tools response section

![response](https://i.ibb.co/znGmSvF/Screen-Shot-2022-09-07-at-11-18-53-pm.png)

Implement cookies ....

### Confirming cookies received through dev tools application section

![cookies](https://i.ibb.co/RDW94zQ/Screen-Shot-2022-09-07-at-11-18-41-pm.png)



## Setup Serverside rendering (SSR) for graphql backend requests


1. Let's start by checking the dev tools under Network -> Fetch/XHR

2. Here we can see the client side requests our app makes

3. Notice that the graphql server is requested from the client side [fetch] , this is going to slow our page loads!

![No SSR](https://i.ibb.co/HFFNdwV/Screen-Shot-2022-09-09-at-10-48-55-am.png)

Let's get to work implementing it...

- create my-server-api to handle SSR -> [example of my-server-api.ts](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/fc624efad0bbf46d0fc1bfa77346fabfd768833e)

- add get serverside props to /users -> [example commit implementing SSR on frontend](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/8a026e2cc2f8173bec7abc43f9132a59a246c080)

- confirm its working in dev tools as above in network tab. No more 200 request to Graphql


Here we can confirm using the chrome dev tools that the graphql server is no longer fetched from the client side.

![With SSR](https://i.ibb.co/GF9wCMf/Screen-Shot-2022-09-13-at-11-52-15-am.png)

## Setup linting and enforce code style with eslint

[See commit diff here](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/2d8f4f94f8d97ce09f1ba2cb4bc506f574d799dd)

We are going to use a [eslint rules library](https://github.com/sindresorhus/eslint-plugin-unicorn)

the reason being is that we wish to start with sane defaults, enforce modern and up to date code styles

Later on we can configure on a rule by rule basis as we desire

### Install eslint deps

```bash
npm i --save-dev eslint eslint-plugin-unicorn eslint-plugin-prettier
```

### Configure eslint with our new plugins and rules [./.eslintrc.json]

```json
{
  "root": true,
  "ignorePatterns": ["**/*"],
  "plugins": ["@nrwl/nx", "unicorn", "prettier"],
  "overrides": [
    {
      "extends": ["plugin:unicorn/recommended", "plugin:prettier/recommended"],
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "prettier/prettier": ["error"],
        "unicorn/prevent-abbreviations": "warn",
        "unicorn/no-null": "off",
        "unicorn/prefer-module": ["warn"],
        "unicorn/no-abusive-eslint-disable": ["warn"],
        "@nrwl/nx/enforce-module-boundaries": [
          "error",
          {
        ...rest-of-code...
```

### Configure prettier with our new rules [./prettierrc]

Let's start by familisarising ourselves with available options [here](https://prettier.io/docs/en/options.html)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "bracketSpacing": true,
  "printWidth": 100
}
```

### Run linters and formatters to test our new rules

```bash
npx nx format:write --all
npx nx run-many --target=lint --all
```

## Setup application logging and analytics services

TODO

## Setup Workspace Dependency Isolation

### Defining boundaries with nx

Start by revieiwng the [docs here](https://nx.dev/core-features/enforce-project-boundaries)

Let's check out our current dependency graph in a web browser using this command [http://127.0.0.1:4211/?]

```bash
npx nx graph
```

We can see here our dependency graphs are nicely laid out with our backend and frontend decoupled

![good](https://i.ibb.co/zbytVNs/Screen-Shot-2022-09-04-at-9-45-12-pm.png)

Now let's try inheriting a library from our backend into our frontend to see how our dependency graph changes [my-frontend/pages/index.tsx]

```typescript
import {
  CreateOneUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from '@my-full-stack-app/my-backend/generated/db-types';
type test = CreateOneUserArgs;
```

As we can see, we now have an extra path in our dependency graph, coupling our frontend and backend

![bad](https://i.ibb.co/5KNpTCq/Screen-Shot-2022-09-04-at-6-45-40-pm.png)

We're now going to modify the snippet for our project as so and paste it into our config [./.eslintrc.json]

This will tell eslint to emit errors when we break the constraints we have defined. We will tell eslint that the backend and frontend aren't allowed in each others scope

```json
"rules": {
"@nrwl/nx/enforce-module-boundaries": [
    "error",
    {
    "allow": [],
    "depConstraints": [
        {
        "sourceTag": "scope:shared",
        "onlyDependOnLibsWithTags": ["scope:shared"]
        },
        {
        "sourceTag": "scope:my-frontend",
        "onlyDependOnLibsWithTags": ["scope:shared", "scope:my-frontend", "scope:my-client"]
        },
        {
        "sourceTag": "scope:my-backend",
        "onlyDependOnLibsWithTags": ["scope:shared", "scope:my-backend"]
        },
        {
        "sourceTag": "scope:my-client",
        "onlyDependOnLibsWithTags": ["scope:shared", "scope:my-client"]
        }
    ]
    }
]
}
```

Run the linter to see if our boundaries are applied correctly, we should see an error

```bash
#Lint the frontend scope

npx nx lint my-frontend

#We should receive the response from the linter containing the below error

/Users/admin/Git_Downloads/monorepo-full-stack-web-app/nx-monorepo-full-stack-app/apps/my-frontend/pages/index.tsx
  4:1   error    A project tagged with "scope:my-frontend" can only depend on libs tagged with "scope:shared", "scope:my-frontend"  @nrwl/nx/enforce-module-boundaries
```

Let's delete the code we added earlier so that the frontend no longer inherits a library in the backend scope

Run the linter again and the error shown above should go away, there may still be some warnings, but we can fix those later

Our dependency graph should now look that same as it did [earlier](https://i.ibb.co/fXkSYNJ/Screen-Shot-2022-09-04-at-6-47-58-pm.png), perfect! We've now isolated our frontend from our backend successfully

```bash
npx nx lint my-frontend
```

Try lint the rest of your application, and get familiar with some of the other features of nx boundaries

```bash
#Lint all at once
npx nx run-many --target=lint --all
#Lint only changed files
npx nx affected --target=lint --all

```

**NOTE** If you are getting this error linting your app

```bash
error  A project without tags matching at least one constraint cannot depend on any libraries  @nrwl/nx/enforce-module-boundaries
```

Check that you have defined the scope tags properly in each library in your app, [like so](https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/f86a9b1cbb8bd33d1021c1af79e34a8bb1728298) [./project.json]

## Setting up CICD with Github Actions

### Adding secrets to our GitHub repository for use in our actions

Head to the repository settings and configure your secrets as seen in the example below.

We will use a JWT_SECRET env var in our tests, so here we are setting it up.

<img width="1312" alt="Screen Shot 2022-11-20 at 11 22 08 am" src="https://user-images.githubusercontent.com/7098556/202876978-c63e1dda-1c4a-4fc5-9c16-ce6aab4663e9.png">

### Creating the GitHub action

Create a new .yaml file in `./.github/workflows/`

Here we will create a `CI.yaml` as shown below

Things to make note of:

- The secrets we are injecting into the CI using Github action secrets
- We have configured the CI to continue on lint errors for now instead of exiting

```
name: CI
on:
  push:
    branches:
      - main
  pull_request:

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - uses: nrwl/nx-set-shas@v3
      - run: npm ci

      - run: npx nx workspace-lint
      - run: npx nx format:check
      - run: npx nx affected --target=lint --parallel=3
        continue-on-error: true
      - run: npx nx affected --target=test --parallel=3 --ci --code-coverage
        env:
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
      - run: npx nx affected --target=build --parallel=3
```

### Checking our CI runs, and NX cloud runs cache feature with parallelisation

If all is well, we should have a [successful run](https://github.com/beauwilliams/nx-monorepo-full-stack-app/actions/runs/3505798693/jobs/5872356960)

But do take note, 0 packages were actually tested! Why? The NX cache noticed no code was changed since last commit.

<img width="1485" alt="Screen Shot 2022-11-20 at 11 40 05 am" src="https://user-images.githubusercontent.com/7098556/202877366-d4f862aa-39d3-4e1b-93eb-f3e29f5b7558.png">

So with that said, lets add some code to a package, and see if the CI does run on that package.

Lets add a `console.log('Index page');` to the index.tsx of our frontend and try it out

[Success!! We can see our frontend was tested only, not the other unchanged packages in our NX workspace](https://github.com/beauwilliams/nx-monorepo-full-stack-app/actions/runs/3505834061/jobs/5872424307)

<img width="1440" alt="Screen Shot 2022-11-20 at 11 51 06 am" src="https://user-images.githubusercontent.com/7098556/202877594-f8203169-bd9b-4ec8-89c6-28bfe6a17bf6.png">

### Enabling NX Cloud runs github integration

Ensure `@nrwl/nx-cloud` is in `package.json`

Then run `nx g @nrwl/nx-cloud:init`

And follow the instructions, once setup, you should see NX bot in your Pull Requests make a comment with the status of the runs/builds etc as shown below

<img width="942" alt="Screen Shot 2022-11-20 at 12 26 12 pm" src="https://user-images.githubusercontent.com/7098556/202878370-241d7945-41d6-4dee-bc4e-7b82b634abdd.png">

...time to fix up those lint warnings 😉

## Benchmarking our API performance

Let's start with a very simple benchmark, to set a baseline, pulling our our GraphQL playground route

You can run this command directly on your CLI or add it to `justfile` and run it with `just benchmark-backend`

NOTE: Ensure the backend is running before benchmarking it

```
benchmark-backend:
    npx autocannon local -c 100 -d 5 -p 10 http://localhost:3333/graphql
```

**Success! Our API is serving up our GraphQL playground frontend at ~50KTPS. That is over 3x faster than ExpressJS maximum throughput!!**

<img width="673" alt="Screen Shot 2022-11-20 at 12 01 16 pm" src="https://user-images.githubusercontent.com/7098556/202877850-b40307aa-f35f-427b-a5cd-cd4544a571d8.png">

### Setting up code formatting to ignore auto-generated code

- Create an `.eslintignore`
- List the files and folders to ignore i.e
- Add files here to ignore them from prettier formatting `*.gql.gen.ts`


# DEV NOTES AND FAQ

- ERROR

`tried: '/Users/admin/Git_Downloads/AfricaRare/Africarare-Monorepo/node_modules/bcrypt/lib/binding/napi-v3/bcrypt_lib.node' (mach-o file, but is an incompatible architecture (have 'x86_64', need 'arm64e'))`

- FIX:

Use node 18

- ERROR:

```
Failed to load schema from dist/apps/africarare-backend/autogenerated-schema.gql:
Unable to find any GraphQL type definitions for the following pointers:
- dist/apps/africarare-backend/autogenerated-schema.gql
```

- FIX:

Ensure the database is in a working state. If the app does not start, running the gen won't work either. Check db-migrations.

- ERROR:

  Ran `npm run gen:gql` with some new queries added in `apps/my-frontend/api/**.gql.ts` but the `apps/my-frontend/api/**.gql.gen.ts` is not updating

- FIX:

  Check the syntax of your gql queries in `apps/my-frontend/api/**.gql.ts` is correct and perhaps consider trying them on postman to confirm they work


## Application Architecture

### Workspace

- [Using NX](https://nx.dev/)

### Backend

- [Web Server](Fastify)
- [Database]()
- [Database Validation]()
- [Database Schemas]()

### Frontend

- [Framework](React)
- [SSR & Goodies](NextJS)

# Autogenerated content is below

This project was generated using [Nx](https://nx.dev).

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@my-full-stack-app/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Distributed Computation Caching & Distributed Task Execution

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.rea
