import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Result, Tooltip } from 'antd';
import { CloseCircleFilled, LoadingOutlined } from '@ant-design/icons';
import AuthModal from '../components/auth-modal/AuthModal';
import Layout from '../components/layout/Layout';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { getStarredCertificates, addStarredCertificate, removeStarredCertificate } from '../pages-helpers/starred-certificates/StarredCertificates.service';
import { setUser } from '../components/auth-modal/AuthModal.actions';
import { verifyMe } from '../components/auth-modal/AuthModal.service';
import showNotification from '../shared/showNotification';
import { withRouter } from 'next/router';

const StarredCertificates = ({ router, setUser, user }) => {
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [starred, setStarred] = useState([]);
  const [toRemove, setToRemove] = useState([]);

  useEffect(() => {
    if (user.checked) {
      fetchStarred();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.checked]);

  useEffect(() => {
    if (!loading && !user.id && !showAuthModal) {
      setShowAuthModal(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const cid = toRemove[toRemove.length - 1];
    if (cid) {
      const updatedStarred = starred.filter(s => s._id !== cid);
      setStarred(updatedStarred);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toRemove]);

  const fetchStarred = async responseUser => {
    const token = localStorage.getItem("certificate-verifier-token");
    if (token && (user.id || (responseUser && responseUser.id))) {
      try {
        const res = await getStarredCertificates(token);
        setStarred(res.data.favourites);
      }
      catch (e) {
        console.log(e)
        setShowAuthModal(true);
      }
      finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setShowAuthModal(true);
    }
  }

  const userAuthenticated = async flag => {
    setTimeout(() => {
      setShowAuthModal(false);
    }, 500);
    if (flag) {
      let res;
      try {
        setLoading(true);
        res = await verifyMe();
        setUser({ ...res.data, checked: true });
        const { query: { cid } } = router;
        if (cid) {
          await addStarredCertificate(cid);
        }
      } catch (e) {
        if (e && e.response && e.response.data.error === 'Certificate is already starred') {
          showNotification('Error', e, true);
        }
      } finally {
        fetchStarred(res.data);
      }
    } else {
      router.back();
    }
  }

  const handleRemoveFromStarred = cid => {
    const updatedCertificates = starred.map(s => {
      if (cid === s._id) {
        s.loading = true;
      }
      return s;
    });
    setStarred(updatedCertificates);
    removeStarredCertificate(cid)
      .then(() => {
        setToRemove([...toRemove, cid]);
        showNotification('Success', 'Certificate removed from starred');
      })
  }

  const showCertificate = uuid => {
    router.push(`/view-certificate/${uuid}`);
    // window.open(`${window.location.origin}/view-certificate/${uuid}`)
  }

  let certificatesJSX;
  if (loading) {
    certificatesJSX = <Row gutter={[16, 24]}>
      {Array(8).fill().map((c, i) => <Col span={6} key={i}>
        <Card loading={true} />
      </Col>)}
    </Row>;
  } else if (showAuthModal) {
    certificatesJSX = <AuthModal onClose={userAuthenticated} />;
  } else if (starred.length) {
    certificatesJSX = <Row gutter={[16, 24]}>
      {starred.map(c => <Col span={6} key={c.uuid}>
        <Card style={{ 'position': 'relative' }}>
          <p>Awarded to: <span className='candidate-name'>{c.candidateName}</span></p>
          <div className='icon-container'>
            {c.loading
              ? <LoadingOutlined />
              : <Tooltip placement="top" title="Remove from starred">
                <CloseCircleFilled onClick={() => handleRemoveFromStarred(c._id)} />
              </Tooltip>}
          </div>
          <Button type="primary" onClick={() => showCertificate(c.uuid)}>
            View Certificate
        </Button>
        </Card>
      </Col>)}
    </Row>;
  } else {
    certificatesJSX = <div className='empty-state-container'>
      <Result
        status={404}
        title='No certificate found'
        subTitle={<p>You haven't starred any certificate yet</p>}
      />
    </div>
  }

  return (
    <Layout>
      <div className="main-container">
        <div className="navbar-placeholder" />
        <div className='certificates-container'>
          {certificatesJSX}
        </div>
      </div>
      <div className='icon-container' />
      <style global jsx>{`
      .certificates-container {
        width: 100vw;
        overflow-x: hidden;
        padding: 16px 24px;
        width: 100%;
      }
      .candidate-name {
        font-weight: 500;
      }
      .empty-state-container {
        align-items: center;
        display: flex;
        height: calc(100vh - 180px);
        justify-content: center;
      }
      .icon-container {
        position: absolute;
        color: #1890ff;
        font-size: 18px;
        z-index: 2;
        top: 7px;
        right: 12px;
      }
      .icon-container .anticon-close-circle {
        cursor: pointer;
      }
      `}</style>
    </Layout>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ setUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StarredCertificates));
