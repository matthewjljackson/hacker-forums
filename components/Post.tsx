import React, { useState, useEffect, useRef } from 'react';
import { ILink } from '../utils/interfaces';
import { formatDate } from '../utils/format-date';
import { FaArrowUp } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { upvoteMutation } from '../graphql/client-queries';

const Post: React.FC<LinkProps> = ({ link, index }) => {
  const token = useRef<null | string>(null);
  useEffect(() => {
    if (typeof window !== undefined && window.sessionStorage) {
      token.current = sessionStorage.getItem('token');
      console.log({ token });
    }
  }, []);
  const [count, setCount] = useState<number>(link.voters.length);
  const formattedDate = formatDate(link.createdAt);
  const [vote, { error }] = useMutation(upvoteMutation, {
    variables: {
      linkId: link.id,
    },
    context: {
      headers: {
        authorization: token.current ? `Bearer ${token.current}` : '',
      },
    },
    onCompleted: ({ vote }) => {
      setCount(count + 1);
      console.log({ vote });
      console.log({ error });
    },
  });
  const handleClick = async () => {
    await vote();
  };
  return (
    <div className="space-y-0 border-b-2 pb-4 border-blue-500">
      <h1 className="flex flex-wrap items-end">
        <span className="text-xl lg:text-3xl">
          <span className="text-blue-500">{index}.</span> {link.description}
        </span>
        <a href={link.url} className="px-2 text-sm lg:text-xl text-gray-500">
          ({link.url})
        </a>
      </h1>
      <div className="flex flex-row items-center space-x-4">
        <FaArrowUp size={20} color="green" onClick={() => handleClick()} />
        <h4 className="text-xs lg:text-base">{count} points</h4>
        <h4 className="text-xs lg:text-base">{formattedDate}</h4>
      </div>
    </div>
  );
};

export default Post;

interface LinkProps {
  link: ILink;
  index: number;
}
