import React from 'react';
import { LinkedinFilled, GithubFilled, MailFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className='dev-name'>Developed by <span>Ahmed Abdullah</span> &#127881; </p>
      <div className='icons-container'>
        <Tooltip placement="top" title="Source Code">
          <a
            className='code-icon'
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ahmed067Abdullah/certificate-verifier-Solidity-NextJS">
            &lt;/&gt;
        </a>
        </Tooltip>
        <Tooltip placement="top" title="Email">
          <a href="mailto:ahmed067abdullah@gmail.com">
            <span><MailFilled /></span></a>
        </Tooltip>
        <Tooltip placement="top" title="Github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ahmed067Abdullah">
            <span>
              <GithubFilled />
            </span>
          </a>
        </Tooltip>
        <Tooltip placement="top" title="LinkedIn">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pk.linkedin.com/in/ahmed-abdullah-74a414172">
            <span>
              <LinkedinFilled />
            </span>
          </a>
        </Tooltip>
      </div>
      <style jsx>{`
        .code-icon {
          color: white !important;
          background: #1890ff;
          border-radius: 3px;
          padding: 2px 3px 4px;
          height: 22px;
          margin-top: 8px;
          display: flex;
          align-items: center;
          font-size: 16px;
          line-height: 0.3;
          margin-right: 5px;
          transform: scale(0.7, 1);
        }
        .footer-container {
          background-color: #FFF;
          border-top: 1px solid #f0f0f0;
          padding: 10px;
          display: flex;
          align-items: center;
          position: fixed;
          flex-direction: column;
          width: 100%; 
          z-index: 2;
          bottom: 0;
        }
        .dev-name {
          font-size: 16px;
          margin-bottom: 2px;
        }
        .dev-name > span {
          font-weight: 500
        }
        .icons-container {
          display: flex;
          height: 35px;
        }
        .icons-container span {
          color: #1890ff;
          margin: 0 8px;
          cursor: pointer;
          font-size: 24px;
        }
      `}</style>
    </div>
  )
}

export default Footer;
