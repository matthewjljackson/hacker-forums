import { NextPage } from 'next';
import Link from 'next/link';

const Login: NextPage = () => {
  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto mt-16 md:mt-32">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between pt-6 ">
          <button className="md:text-lg bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Sign In
          </button>
          <Link href="/">
            <a className="md:text-md inline-block align-baseline font-bold text-blue-600 hover:text-blue-400">
              Go Back
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
