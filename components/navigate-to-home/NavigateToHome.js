import React, { useEffect } from 'react';
import { withRouter } from 'next/router';

const NavigateToHome = ({ router }) => {
  useEffect(() => {
    router.push('/home');
  }, []);

  return (
    <div />
  );
};

export default withRouter(NavigateToHome);
