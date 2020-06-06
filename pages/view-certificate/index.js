
import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getCertificate } from '../../pages-helpers/view-certificate/ViewCertificate.service';
import { getCompany } from '../../pages-helpers/award-certificate/AwardCertificate.service';
import showNotification from '../../shared/showNotification';
import Spinner from '../../components/spinner/Spinner';
import Certificate from '../../components/certificate/Certificate';
import Layout from '../../components/layout/Layout';
import { addStarredCertificate } from '../../pages-helpers/starred-certificates/StarredCertificates.service';
import { verifyMe } from '../../components/auth-modal/AuthModal.service';
import { withRouter } from 'next/router';


const ViewCertificateWithoutId = ({ router }) => {
  const setupCertificate = async () => {
    try {
      const certificateObj = await getCertificate(uuid);
      setCertificate(certificateObj);
      console.log(certificateObj);
      if (certificateObj[0] !== "") {
        const companyObj = await getCompany(certificateObj['4']);
        console.log(companyObj);
        setCompany(companyObj);
        setCertificateLoading(false);
        if (companyObj['0'] === '') {
          setCertificateError('Certificate issuer not found');
        }
      } else {
        setCertificateLoading(false);
        setCertificateError('Certificate not found');
      }
    }
    catch (e) {
      showNotification('Error', 'Error occurred while fetching certificate');
      console.log(e);
    }
  }

  return <Layout>
    <div className="main-container">
      <div className="navbar-placeholder" />
      <Button type="primary" onClick={() => router.back()} className='back-btn'>
        <LeftOutlined />
      Back
    </Button>
      {certificateLoading
        ? <Spinner />
        : certificateError
          ? <div className='not-found-container'>
            <Result
              status={404}
              title={certificateError}
            />
          </div>
          : <div className='view-certificate-container'>
            <div className='certificate-container'>
              <Certificate uuid={uuid} certificate={certificate} company={company} />
            </div>
            <div className='btns-container'>
              <Button type="primary" onClick={addToStarredHandler} loading={starLoading}>
                Add to Starred
            </Button>
              <Button type="primary" onClick={copyUrlHandler}>
                Copy URL
            </Button>
            </div>
          </div>}
      <style jsx>{`
      .back-btn {
        position: absolute;
        top: 65px;
        right: 20px;
        padding-left: 10px;
      }
      .btns-container {
        align-items: center;
        display: flex;
        margin: 20px 0;
        justify-content: center;
      }
      .btns-container > button {
        margin: 0 5px;
      }
      .not-found-container {
        align-items: center;
        display: flex;
        height: calc(100vh - 60px);
        justify-content: center;
      }
      .view-certificate-container {
        padding-top: 20
      }
      `}</style>
    </div>
  </Layout>;
}

export default withRouter(ViewCertificateWithoutId);