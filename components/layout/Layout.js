import React from 'react';
import Footer from '../footer/Footer';
import NavBar from '../nav-bar/NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;