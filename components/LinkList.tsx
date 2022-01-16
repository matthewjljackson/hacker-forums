import React from 'react';
import { ILink } from '../utils/interfaces';
import Post from './Post';

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <div className="p-4 md:px-10 lg:px-14 space-y-4">
      {links.map((link, index) => (
        <Post link={link} index={index + 1} key={link.id} />
      ))}
    </div>
  );
};

export default LinkList;

interface LinkListProps {
  links: ILink[];
}
