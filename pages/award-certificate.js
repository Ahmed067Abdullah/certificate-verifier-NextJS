import React, { useEffect, useState, useRef } from 'react';
import { Form, Input, Button, Card, DatePicker } from 'antd';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { awardCertificateFormFields as formFields } from '../shared/formFields';
import { layout, tailLayout } from '../shared/formLayout';
import { awardCertificate, checkCompany } from '../pages-helpers/award-certificate/AwardCertificate.service';
import showNotification from '../shared/showNotification';

const AwardCertificate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comapny, setCompany] = useState('');
  const [comapnyLoading, setCompanyLoading] = useState(true);
  const [comapnyNotRegistered, setComapnyNotRegistered] = useState(true);
  const formEl = useRef(null);

  useEffect(() => {
    if (window.ethereum) {
      checkCompany(setCompanyLoading, setComapnyNotRegistered, setCompany);

      window.ethereum.on('accountsChanged', () => {
        setCompanyLoading(true);
        checkCompany(setCompanyLoading, setComapnyNotRegistered, setCompany);
      });

      return () => {
        window.ethereum.removeAllListeners();
      }
    }
  }, []);

  const onFinish = values => {
    if (!comapnyNotRegistered) {
      setIsSubmitting(true);
      awardCertificate(values)
        .then(res => {
          showNotification('Success', 'Certificate created successfully');
          if (formEl.current) {
            formEl.current.resetFields();
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  if (typeof window !== 'undefined' && typeof window.ethereum === 'undefined') {
    return <p>No meta mask</p>
  }

  return (
    <Layout>
      <div className="main-container">
        <div className="navbar-placeholder" />
        <Card
          className='register-company-card'
          title="Award Certificate"
          loading={comapnyLoading}>
          {comapnyNotRegistered
            ? <p className='cmp-unregistered'>
              Sorry, the selected Ethereum address is not associated with any company.
          <span>Click <Link href="/register-company">here</Link> to register your comapny</span>
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
              {field.type === 'date'
                ? <DatePicker.RangePicker style={{ width: '100%' }} disabled={isSubmitting || comapnyNotRegistered} />
                : <Input disabled={isSubmitting || comapnyNotRegistered} />}
            </Form.Item>)}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={isSubmitting} disabled={comapnyNotRegistered}>
                Submit
            </Button>
              {comapny['0'] ? <p className='company-name'>from <span>{comapny['0']}</span></p> : ''}
            </Form.Item>
          </Form>
        </Card>
      </div>
      <style jsx>{`
       .company-name {
        display: inline-block;
        margin-bottom: 0;
        margin-left: 7px;
      }
      .company-name > span {
        font-weight: 600;
      }
      .cmp-unregistered {
        font-size: 16px;
        color: #ff4d4f;
        font-weight: 500;
        text-align: center;
      }
      .cmp-unregistered > span {
        color: rgba(0, 0, 0, 0.65);
        display: block;
      },
      .register-company-card {
        width: 700px;
        margin: 100px auto 0;
      }
      `}</style>
    </Layout>
  )
}

export default AwardCertificate;
