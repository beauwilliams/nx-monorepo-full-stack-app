import { FormEventHandler, useState } from 'react';
import { useSignupMutation } from '../../api/auth/auth.gql.gen';
import { withApi } from '../../api/my-client-api';

/* eslint-disable-next-line */
export interface SignupProps {}

export function Signup(props: SignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [, signup] = useSignupMutation();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await signup({ args: { email, password, name } });
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
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
              Sign up for an account
            </h1>

            <form onSubmit={handleFormSubmit}>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="name"
                  className={`w-full p-2 text-black dark:text-white border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4 dark:bg-gray-800 dark:border-gray-700 dark:caret-white`}
                  id="name"
                  placeholder="Your Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
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
                  className={`w-full text-white bg-blue-700 hover:scale-105 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              By signing up you agree to the{' '}
              <a
                href="terms"
                className="font-medium text-blue-700 hover:underline dark:text-primary-500"
              >
                terms and conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withApi(Signup);
