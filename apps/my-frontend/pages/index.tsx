import { useGetUserQuery } from '../api/user/user.gql.gen';
import { withApi } from '../api/my-client-api';

export function Index() {
  const [{ data, fetching }] = useGetUserQuery({
    variables: { args: { id: 1, email: 'test@mail.com' } },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen">
      <div className="container">
        <div>
          <h1 className="dark:text-white">
            <span> Hello {fetching ? 'there' : data ? data?.user?.name : 'Jane'}</span>
            <br></br>
            Welcome my-frontend 👋
          </h1>
        </div>

      </div>
    </section>
  );
}

export default withApi(Index);
