import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <section className="flex flex-row justify-between py-2 px-4 md:px-10 lg:px-14 bg-blue-600">
      <h1 className="font-bold text-lg lg:text-4xl text-white">
        Hacker Forums
      </h1>
      <ul className="flex space-x-4 flex-row lg:space-x-8">
        <li>
          <Link href="/register">
            <a
              className="lg:text-xl bg-blue-600 text-white border-white border-2
          hover:border-gray-200 hover:text-gray-200 rounded-full px-3 py-1"
            >
              register
            </a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a className="lg:text-xl text-white hover:text-gray-200 hover:underline">
              login
            </a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
