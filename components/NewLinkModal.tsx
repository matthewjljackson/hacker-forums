import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { createLinkMutation } from '../graphql/client-queries';

const NewLinkModal: React.FC = () => {
  const token = useRef<null | string>(null);
  useEffect(() => {
    if (typeof window !== undefined && window.sessionStorage) {
      token.current = sessionStorage.getItem('token');
      console.log({ token });
    }
  }, []);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });
  const [createLink, { error }] = useMutation(createLinkMutation, {
    variables: {
      data: {
        description: formState.description,
        url: formState.url,
      },
    },
    context: {
      headers: {
        authorization: token.current ? `Bearer ${token.current}` : '',
      },
    },
    onCompleted: ({ createLink }) => {
      console.log('voila2', createLink);
      console.log({ error });
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createLink();
    setModalIsVisible(false);
    setFormState({ description: '', url: '' });
  };
  return (
    <>
      <button
        className="bg-blue-600 lg:text-xl mx-auto py-1 px-4 text-white font-bold uppercase rounded shadow hover:shadow-lg mb-4"
        type="button"
        onClick={() => setModalIsVisible(true)}
      >
        Create New Link
      </button>
      {modalIsVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">New Link</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                      >
                        Description
                      </label>
                      <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="url"
                        className="block text-gray-700 text-sm md:text-lg font-bold mb-2"
                      >
                        Url
                      </label>
                      <input
                        type="text"
                        id="url"
                        placeholder="Url"
                        value={formState.url}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            url: e.target.value,
                          })
                        }
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                    <div className="flex items-center justify-end pt-6 border-t border-solid border-blueGray-800 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalIsVisible(false)}
                      >
                        Close
                      </button>
                      <button
                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default NewLinkModal;
