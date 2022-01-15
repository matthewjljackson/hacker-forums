import React from 'react';
import { ILink } from '../utils/interfaces';

const Link: React.FC<LinkProps> = ({ link }) => {
  return (
    <>
      <h2>
        {link.description} ({link.url})
      </h2>
    </>
  );
};

export default Link;

interface LinkProps {
  link: ILink;
}
