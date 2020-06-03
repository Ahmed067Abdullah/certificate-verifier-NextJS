import React, { useState } from 'react';
import { Provider } from "react-redux";
import Footer from '../footer/Footer';
import NavBar from '../nav-bar/NavBar';
import store from "../../store";

const Layout = ({ children }) => {
  return (
    <Provider store={store}>
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;