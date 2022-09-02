#  nx-monorepo-full-stack-web-app

## Setup backend

A backend workspace with:
- NodeJs, 100% typescript and typed
- Postgresql db
- Docker-compose for db migrations
- Prisma ORM to handle migrations
- Auto-generated graphql endpoints with validation via prisma
- Fastify server instead of express for speed with 
- Mercurius, a graphql adapter for fastify
- Basic CORS support using fastify builtin
- Sane http header policy defaults via helmet

```bash
#Install basic modules needed for backend using 
npx create-nx-workspace my-full-stack-app --preset=nest --tags "scope:my-backend"
npm i @nestjs/platform-fastify @nestjs/graphql @nestjs/mercurius graphql mercurius
npm uninstall @nestjs/platform-express #replace express with fastify

#Set up app module ts to use mercurius/graphql and swap express for fastify [app.module.ts] [main.ts]
https://github.com/beauwilliams/nx-monorepo-full-stack-app/commit/e12c03a0e02224d3963cc147e7293d970ea0709f

#Generate our first Schemas
npx nx g @nrwl/nest:resource -p my-backend --directory="app/resources" --type="graphql-code-first" --crud --name user


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

#create basic user model [prisma.schema]
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

# Install class transformer and class validator plus nestjs plugin
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

#Test its all working visiting localhost/graphql e.g such as below query to see if validation works
mutation {
  createUser(data:{email: "tes", password: "test123s", name: "t"}) {
    id
    name
    email
  }
}


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


```


## Workspace

- [Using NX](https://nx.dev/)


## Backend

- [Web Server](Fastify)
- [Database]()
- [Database Validation]()
- [Database Schemas]()


## Frontend

- [Framework](React)
- [SSR & Goodies](NextJS)




```
Your workspace is currently unclaimed. Run details from unclaimed workspaces can be viewed on cloud.nx.app by anyone
with the link. Claim your workspace at the following link to restrict access.

https://cloud.nx.app/orgs/workspace-setup?accessToken=MjExNDZjMzktY2YyMS00YTUzLWJlMDYtMDVkZGMyYTA4MmIzfHJlYWQtd3JpdGU=
```

## NOTE: Autogenerated MD content is below


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

Visit [Nx Cloud](https://nx.app/) to learn more.
