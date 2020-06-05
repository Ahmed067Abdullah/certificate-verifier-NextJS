const ScreenContent = ({ children, web3Status }) => {
  switch (web3Status) {
    case 1: return children;
    case 2: return <p>Permission denied</p>;
    case 3: return <p>Metamask not found</p>;
    default: return null;
  }
}

export default ScreenContent
