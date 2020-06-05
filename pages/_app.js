import App from 'next/app';
import React from 'react';
import { wrapper } from "../store";
import "./styles.css";

class MyApp extends App {
  state = { web3Status: 0 };

  componentDidMount() {
    if (window.ethereum) {
      window.ethereum.enable()
        .then(() => {
          this.setState({ web3Status: 1 });
        })
        .catch(() => {
          this.setState({ web3Status: 2 });
        })
    } else {
      this.setState({ web3Status: 3 });
    }
  }


  render() {
    const { Component } = this.props;
    const { web3Status } = this.state;
    return (
      <Component web3Status={web3Status} />
    );
  }

}

export default wrapper.withRedux(MyApp);
