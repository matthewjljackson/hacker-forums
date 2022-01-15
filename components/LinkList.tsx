import React from 'react';
import { ILink } from '../utils/interfaces';
import Link from './Link';

const LinkList: React.FC<LinkListProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <Link link={link} key={link.id} />
      ))}
    </>
  );
};

export default LinkList;

interface LinkListProps {
  links: ILink[];
}
