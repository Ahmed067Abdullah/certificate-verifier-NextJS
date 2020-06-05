import App from 'next/app';
import React from 'react';
import { wrapper } from "../store";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { verifyMe } from '../components/auth-modal/AuthModal.service';
import { setUser, setChecked } from '../components/auth-modal/AuthModal.actions';
import "./styles.css";

class MyApp extends App {
  state = { web3Status: 0 };

  componentDidMount() {
    if (window.ethereum) {
      this.setupApplication();
    } else {
      this.setState({ web3Status: 3 });
    }
  }

  setupApplication = async () => {
    const { setChecked, setUser } = this.props;
    try {
      let res = await verifyMe();
      if (res) {
        setUser({ ...res.data, checked: true });
      } else {
        setChecked(true);
      }
    } catch (e) {
      setChecked(true);
      localStorage.removeItem("certificate-verifier-token");
    } finally {
      window.ethereum.enable()
        .then(() => {
          this.setState({ web3Status: 1 });
        })
        .catch(() => {
          this.setState({ web3Status: 2 });
        })
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser, setChecked }, dispatch);

export default wrapper.withRedux(connect(null, mapDispatchToProps)(MyApp));
