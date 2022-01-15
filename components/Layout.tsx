import React from 'react';
import Navbar from './Navbar';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../utils/apollo';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ApolloProvider>
  );
};

export default Layout;
