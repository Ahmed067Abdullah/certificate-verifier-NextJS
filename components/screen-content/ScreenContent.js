import { Result, Spin } from 'antd';

const ScreenContent = ({ children, web3Status }) => {

  const Container = ({ children }) => <div style={{
    'display': 'flex',
    'justifyContent': 'center',
    'height': 'calc(100vh - 148px)',
    'alignItems': 'center'
  }}>{children}</div>

  const renderResult = (status, title, subTitle) => <Container>
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
    />
  </Container>;

  const renderSpinner = () => <Container>
    <Spin size="large" />
  </Container>;

  switch (web3Status) {
    case 1: return children;
    case 2: return renderResult(403, 'Access denied', "Please allow application to access metamask addresses");
    case 3: return renderResult(404, 'Metamask not found', "Please install metamask extension");
    default: return renderSpinner();
  }
}

export default ScreenContent
