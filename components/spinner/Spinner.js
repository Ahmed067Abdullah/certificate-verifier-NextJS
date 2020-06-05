import React from 'react';
import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div className='spinner-container'>
      <Spin size="large" />
      <style jsx>{`
       .spinner-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      `}
      </style>
    </div>
  )
}

export default Spinner;
