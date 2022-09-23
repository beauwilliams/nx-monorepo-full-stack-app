import { useGetUserQuery } from '../api/user/user.gql.gen';
import { withApi } from '../api/my-client-api';

export function Index() {

  return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://img.icons8.com/color/48/000000/java-web-token.png"
              alt="logo"
            ></img>
            My Super Cool App
          </a>
      </div>
          </section>
  );
}

export default withApi(Index);
