import App from 'next/app';
import React from 'react';
import { wrapper } from "../store";
import "./styles.css";

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return (
      <Component />
    );
  }

}

export default wrapper.withRedux(MyApp);
