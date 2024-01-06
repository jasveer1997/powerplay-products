import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Form, Input, Row, notification} from 'antd';
import {useAuth} from "../../hooks/useAuth";

const LoginLayout = ({ doLogin, isLoading }) => (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh'}}>
        <Col span={8} >
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 800,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={doLogin}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input style={{ marginBottom: 12 }} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

const Wrapper = ({ doLogin, login = {} }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { loginUserToBrowserSession } = useAuth();
    const onFinish = useCallback(values => {
        setUsername(values.username);
        doLogin(values);
    }, [doLogin]);

    useEffect(() => {
        if (login.hasError) {
            const { response: { status } = {} } = login.error;
            let msg = 'We are facing some internal server error. Please retry after some time';
            if (status === 401) {
                msg = 'Invalid credentials';
            }
            notification.error({
                duration: 3,
                message: `Login Failed`,
                description: msg,
                placement: 'top',
            });
        }
    }, [login.hasError]);

    useEffect(() => {
        if (login.loaded && !login.hasError) {
            notification.info({
                duration: 2,
                message: `Successfully logged in`,
                description: "Welcome to powerplay products",
                placement: 'top',
            });
            loginUserToBrowserSession(username, login.token)
            navigate('/');
        }
    }, [login.loaded, login.hasError, username]);

  return <LoginLayout doLogin={onFinish} isLoading={login.isLoading} />;
};

export default Wrapper;