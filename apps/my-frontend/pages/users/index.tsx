import {
  GetUsersDocument,
  useGetUsersQuery,
} from '../../api/user/user.gql.gen';
import { withApi } from '../../api/my-client-api';
import { GetServerSidePropsContext } from 'next';
import { serverQuery } from '../../api/my-server-api';

/* eslint-disable-next-line */
export interface UsersProps {}

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return serverQuery(GetUsersDocument, {}, context);
};

export function Users(props: UsersProps) {
  const [data] = useGetUsersQuery({ variables: {} });

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            ></img>
            My Super Cool App
          </a>
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div>
                <h1 className="flex items-center text-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  Users
                </h1>
                <hr className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                {data?.data?.users.map((user) => (
                  <div key={user.id}>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Name: {user.name}
                    </p>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email: {user.email}
                    </p>
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      ID: {user.id}
                    </p>
                    <hr className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default withApi(Users);
