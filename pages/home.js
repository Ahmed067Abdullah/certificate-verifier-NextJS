import React from 'react';
import { Card } from 'antd';
import Layout from '../components/layout/Layout';

const Home = () => {

  return (
    <Layout>
      <div className="main-container">
        <div className="navbar-placeholder" />
        <Card className='container'>
          <p className='heading'>Problem:</p>
          <p className='text'>
            Whenever an employee leaves an organization or a student completes a course/bootcamp,
            a certificate is awarded to them. These certificates are usually awarded in the form of Hard
            Copy (on paper) and there is no way to check their authenticity. Such certificates are helpful
            in job search and creating resume BUT they can be forged easily.
        </p>
          <p className='heading'>Solution:</p>
          <p className='text'>
            To deal with the above mentioned issue, We can maintain a decentralized record of the
            certificates. To do that, at first the company/organization would have to register themselves
            using an ethereum address. The organization would also have to show their ethereum address on
            their official website so that it can be verified that a particular address belongs to a
            particular company. Once a company/organization is registered, they can start awarding
            the certificates to the candidates by submitting a simple form. All this data would be stored
            on ethereum blockchain in order to achieve immutability and verifiability.
        </p>
          <p className='heading'>Technology Stack:</p>

          <ol style={{ 'paddingLeft': '20px' }}>
            <li>
              <p className='bullet-point'>
                <span>Solidity</span> is used for smart contract development.
            </p>
            </li>
            <li>
              <p className='bullet-point'>
                For frontend of the application, the famous UI library of JS, i.e <span>React</span> is used.
            </p>
            </li>
            <li>
              <p className='bullet-point'>
                Backend server for user authentication and storing metadata of certificates is written in <span>Node</span>.
            </p>
            </li>
            <li>
              <p className='bullet-point'>
                The No SQL database <span>MongoDB Atlas</span> is used for data persistance.
            </p>
            </li>
          </ol>
        </Card>
      </div>
      <style jsx>{`
      .container {
        width: 90vw;
        max-width: 1000px;
        margin: 40px auto 20px;
      },
      .heading {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 0px;
      }
      .text {
        font-size: 16px;
      }
      .bullet-point {
        margin-bottom: 0px;
        margin-left: 10px;
        font-size: 16px;
      }
      .bullet-point > span {
        font-weight: 600;
      }
      `}</style>
    </Layout>
  );
}

export default Home;
