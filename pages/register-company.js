import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { registerCompanyFormFields as formFields } from '../shared/formFields';
import Layout from '../components/layout/Layout';
import { layout, tailLayout } from '../shared/formLayout';
import { registerCompany } from '../pages-helpers/register-company/RegisterCompany.service';
import { checkCompany } from '../pages-helpers/award-certificate/AwardCertificate.service';
import showNotification from '../shared/showNotification';
import ScreenContent from '../components/screen-content/ScreenContent';

const RegisterCompany = ({ web3Status }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comapnyLoading, setCompanyLoading] = useState(true);
  const [comapnyNotRegistered, setComapnyNotRegistered] = useState(true);
  const formEl = useRef(null);

  useEffect(() => {
    if (window.ethereum) {
      checkCompany(setCompanyLoading, setComapnyNotRegistered);

      window.ethereum.on('accountsChanged', () => {
        setCompanyLoading(true);
        checkCompany(setCompanyLoading, setComapnyNotRegistered);
      });

      return () => {
        window.ethereum.removeAllListeners();
      }
    } else {
      setCompanyLoading(false);
    }
  }, []);

  const onFinish = values => {
    setIsSubmitting(true);
    registerCompany(values)
      .then(res => {
        showNotification('Success', 'Company registered successfully');
        setComapnyNotRegistered(false);
        if (formEl.current) {
          formEl.current.resetFields();
        }
      })
      .catch(err => {
        console.log(err);
        showNotification('Error', 'Error occurred while registering company');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const companyAlreadyRegistered = !comapnyNotRegistered;

  return (
    <div style={{ 'pointerEvents': isSubmitting ? 'none' : 'all' }} className="main-container">
      <Layout>
        <div className="navbar-placeholder" />
        <ScreenContent web3Status={web3Status}>
          <div className='register-company-card'>
            <Card
              title="Register Company"
              loading={comapnyLoading}>
              {companyAlreadyRegistered
                ? <p className='cmp-unregistered'>
                  Sorry, the selected Ethereum address is already associated with a company.
              </p>
                : null}
              <Form
                {...layout}
                name="register-comapny"
                onFinish={onFinish}
                ref={formEl}
              >
                {formFields.map(field => <Form.Item
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                >
                  <Input disabled={isSubmitting || companyAlreadyRegistered} />
                </Form.Item>)}

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={companyAlreadyRegistered}>
                    Submit
              </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>
        </ScreenContent>
      </Layout>
      <style jsx>{`
      .cmp-unregistered {
        font-size: 16px;
        color: #ff4d4f;
        font-weight: 500;
        text-align: center;
      }
      .register-company-card {
        width: 700px;
        margin: 100px auto 0;
      }
      `}</style>
    </div>
  )
}

export default RegisterCompany;
