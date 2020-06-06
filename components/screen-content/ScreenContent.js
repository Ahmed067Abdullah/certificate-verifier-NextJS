import { Result, Spin, Button } from 'antd';

const ScreenContent = ({ children, web3Status }) => {

  const Container = ({ children }) => <div style={{
    'display': 'flex',
    'justifyContent': 'center',
    'height': 'calc(100vh - 148px)',
    'alignItems': 'center'
  }}>{children}</div>

  const renderResult = (status, title, subTitle, btn) => <Container>
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={btn}
    />
  </Container>;

  const renderSpinner = () => <Container>
    <Spin size="large" />
  </Container>;

  switch (web3Status) {
    case 1: return children;
    case 2: return renderResult(403, 'Access denied',
      "Please allow application to access metamask addresses",
      <Button type="primary" onClick={() => window.location.reload()}>
        Reload
      </Button>);
    case 3: return renderResult(404, 'Metamask not found',
      "Please install metamask extension",
      <Button type="primary" onClick={() => window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en')}>
        Get Metamask
      </Button>);
    default: return renderSpinner();
  }
}

export default ScreenContent
