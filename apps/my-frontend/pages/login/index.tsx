import { useLoginMutation } from '../../api/auth/auth.gql.gen';
import { withApi } from '../../api/my-client-api';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, login] = useLoginMutation();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await login({ args: { email, password } });
  };

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
          <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>

              <form onSubmit={handleFormSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full p-2 text-black dark:text-white border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 dark:bg-gray-800 dark:border-gray-700 dark:caret-white`}
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`w-full p-2 text-black dark:text-white border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 dark:bg-gray-800 dark:border-gray-700 dark:caret-white`}
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>

                <div className="flex justify-center items-center mt-6">
                  <button
                    className={`w-full text-white bg-blue-700 hover:scale-95 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a
                  href="signup"
                  className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
  );
}

export default withApi(Login);
