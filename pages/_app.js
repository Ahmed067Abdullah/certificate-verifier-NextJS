import App from 'next/app';
import Head from 'next/head'
import React from 'react';
import { Result } from 'antd';
import { wrapper } from "../store";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { verifyMe } from '../components/auth-modal/AuthModal.service';
import { setUser, setChecked } from '../components/auth-modal/AuthModal.actions';
import "./styles.css";

class MyApp extends App {
  state = { web3Status: 0 };

  componentDidMount() {
    this.setupApplication();

    if (window.ethereum) {
      window.ethereum.on('networkChanged', networkId => {
        if (networkId !== 3) {
          this.setState({ web3Status: 4 });
        } else {
          enableEthereum();
        }
      });
    }
  }

  setupApplication = async () => {
    const { setChecked, setUser } = this.props;
    const { ethereum } = window;
    try {
      if (!ethereum) {
        this.setState({ web3Status: 3 });
      } else if (ethereum.networkVersion !== "3") {
        this.setState({ web3Status: 4 });
      }
      let res = await verifyMe();
      if (res) {
        setUser(res.data);
      }
    } catch (e) {
      localStorage.removeItem("certificate-verifier-token");
    } finally {
      setChecked(true);
      if (ethereum && ethereum.networkVersion === "3") {
        this.enableEthereum();
      }
    }
  }

  enableEthereum = () => {
    window.ethereum.enable()
      .then(() => {
        this.setState({ web3Status: 1 });
      })
      .catch(() => {
        this.setState({ web3Status: 2 });
      })
  }

  render() {
    const { Component } = this.props;
    const { web3Status } = this.state;
    return (
      <>
        <Head>
          <title>Certificate Verifier</title>
        </Head>
        {web3Status === 4
          ? <div style={{
            'display': 'flex',
            'justifyContent': 'center',
            'height': '100vh',
            'alignItems': 'center'
          }}><Result
              status={403}
              title='Network issue'
              subTitle="Please select Ropsten Test Network in metamask extension"
            />
          </div>
          : <Component web3Status={web3Status} />}
      </>
    );
  }

}

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser, setChecked }, dispatch);

export default wrapper.withRedux(connect(null, mapDispatchToProps)(MyApp));
