import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
