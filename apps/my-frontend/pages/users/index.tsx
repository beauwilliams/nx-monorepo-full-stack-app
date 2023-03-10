import { GetUserDocument, GetUsersDocument, useGetUserQuery, useGetUsersQuery } from '../../api/user/user.gql.gen';
import { withApi } from '../../api/my-client-api';
import { GetServerSidePropsContext } from 'next';
import { serverQuery } from '../../api/my-server-api';

/* eslint-disable-next-line */
export interface UsersProps {}

  //FIXME: return two props in one call for SSR and confirm no 200 requests in network tab to API
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // const cur_user = serverQuery(GetUserDocument, {}, context);
  const cur_users = await serverQuery(GetUsersDocument, {}, context);
  return cur_users;
};


export function Users(props: UsersProps) {
  const [{ data: cur_user, fetching: fetching_user }] = useGetUserQuery();
  const [{ data: cur_users, fetching: fetching_users }] = useGetUsersQuery();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <h1 className="dark:text-white text-2xl py-4">
          <span> Hello {fetching_user ? 'there' : cur_user ? cur_user?.user?.name + ' 👋 ' : 'Jane'}</span>
        </h1>
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
        <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <h1 className="flex items-center text-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Users
              </h1>
              <hr className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" />
              {cur_users?.users.map((user) => (
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
  );
}

export default withApi(Users);
