import { useState } from "react";
import { Button } from 'antd';

const Layout = ({ doLogin }) => {
  return (
      <Button onClick={doLogin}>
        Click to trigger login
      </Button>
  )
};

const Wrapper = ({ doLogin }) => {
    const [username, setUsername] = useState(""); // use form
  return <Layout doLogin={doLogin} />;
};

export default Wrapper;