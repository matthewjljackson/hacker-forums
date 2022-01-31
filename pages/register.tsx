import { NextPage } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { signUpMutation } from '../graphql/client-queries';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const Register: NextPage = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [signUp, { loading, error }] = useMutation(signUpMutation, {
    variables: {
      data: {
        email: formState.email,
        password: formState.password,
        name: formState.name,
      },
    },
    onCompleted: ({ signUp }) => {
      console.log({ signUp });
      sessionStorage.setItem('token', signUp.token);
      sessionStorage.setItem('userId', signUp.user.id.toString());
      router.push('/');
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp();
    if (loading) return <p>Loading</p>;
    if (error) return <p>An error occurred</p>;
  };

  return (
    <div className="w-full max-w-xs md:max-w-sm mx-auto mt-16 md:mt-32">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
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
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value,
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between pt-6 ">
          <button
            type="submit"
            className="md:text-lg bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
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

export default Register;
