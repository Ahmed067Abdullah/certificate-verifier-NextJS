import React, { useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { callLogout } from '../auth-modal/AuthModal.service';
import { withRouter } from 'next/router';

const NavBar = ({ user, callLogout, router }) => {
  const [current, setCurrent] = useState(router.pathname.slice(1));

  return (
    <div className='navbar-container'>
      <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          <Link href="/home">
            <a>Home</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="register-company">
          <Link href="/register-company">
            <a>Register Company</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="award-certificate">
          <Link href="/award-certificate">
            <a>Award Certificate</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="find-certificate">
          <Link href="/find-certificate">
            <a>Find Certificate</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="issued-certificates">
          <Link href="/issued-certificates">
            <a>Issued Certificates</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="starred-certificates">
          <Link href="/starred-certificates">
            <a>Starred Certificates</a>
          </Link>
        </Menu.Item>
        {user && user.name
          ? <Menu.Item onClick={callLogout}>
            <a>Logout</a>
          </Menu.Item>
          : null}
      </Menu>
      <style jsx>{`
          .navbar-container {
            position: fixed;
            width: 100%;
            z-index: 3;
          }
      `}</style>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ callLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
