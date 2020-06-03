import App from 'next/app';
import React from 'react';
import { wrapper } from "../store";

const MyApp = ({ Component }) => {
  return (
    <Component />
  );
}

export default wrapper.withRedux(MyApp);
