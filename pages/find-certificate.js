import React, { useRef, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import Layout from '../components/layout/Layout';
import { findCertificateFields as formFields } from '../shared/formFields';
import { layout, tailLayout } from '../shared/formLayout';
import { getCertificate } from '../pages-helpers/view-certificate/ViewCertificate.service';
import showNotification from '../shared/showNotification';
import { withRouter } from 'next/router';
// import { SketchPicker } from 'react-color';

const QueryCertificate = ({ router }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formEl = useRef(null);

  const onFinish = values => {
    setIsSubmitting(true);
    getCertificate(values.uuid)
      .then(res => {
        if (res['0'] === '') {
          formEl.current.setFields([
            {
              name: 'uuid',
              errors: ['Certificate not found!'],
            },
          ]);
        } else {
          router.push(`/view-certificate/${values.uuid}`);
          // window.open(`${window.location.origin}/view-certificate/${values.uuid}`)
        }
        console.log(res);
      })
      .catch(err => {
        showNotification('Error', 'Error occurred while checking address');
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false);
      })
  };

  return (
    <Layout>
      <div className="main-container">
        <div className="navbar-placeholder" />
        <Card
          className="card"
          title="Find Certificate">
          <Form
            {...layout}
            name="find-certificate"
            onFinish={onFinish}
            ref={formEl}
          >
            {formFields.map(field => <Form.Item
              key={field.name}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              <Input disabled={isSubmitting} />
            </Form.Item>)}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit
            </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <style jsx>{`
      .card {
        width: 700px;
        margin: 100px auto 0;
      }
      `}</style>
    </Layout>
  )
}

export default withRouter(QueryCertificate);
