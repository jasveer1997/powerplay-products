import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Col, Form, Input, Row, notification} from 'antd';
import {useAuth} from "../../hooks/useAuth";
import {USER_AUTH_STATE} from "../../config/constants";
import {AUTH_LABELS, AUTH_MESSAGES, SERVER_MESSAGES} from "../../config/messages";
import {FormStyle, SubmitStyle} from "./style";

const LoginLayout = ({ doLogin, isLoading }) => (
    <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh'}}>
        <Col span={8} >
            <Form
                {...FormStyle}
                name="basic"
                initialValues={{remember: true}}
                onFinish={doLogin}
                autoComplete="off"
            >
                <Form.Item
                    label={AUTH_LABELS.USERNAME}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: AUTH_MESSAGES.USERNAME_REQ,
                        },
                    ]}
                >
                    <Input style={{ marginBottom: 12 }} />
                </Form.Item>

                <Form.Item
                    label={AUTH_LABELS.PASSWORD}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: AUTH_MESSAGES.PWD_REQ,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    {...SubmitStyle}
                >
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
);

const Wrapper = ({ doLogin, setCurrentUserState, login = {} }) => {
    const navigate = useNavigate();
    const { loginUserToBrowserSession } = useAuth();

    const [username, setUsername] = useState('');

    const onFinish = useCallback(values => {
        setUsername(values.username);
        doLogin(values);
    }, [doLogin, setUsername]);

    useEffect(() => {
        if (login.hasError) {
            const { response: { status } = {} } = login.error;
            let msg = SERVER_MESSAGES.INTERNAL_SERVER_ERROR;
            if (status === 401) {
                msg = SERVER_MESSAGES.INVALID_CREDENTIALS;
            }
            notification.error({
                duration: 3,
                message: AUTH_MESSAGES.LOGIN_FAIL,
                description: msg,
                placement: 'top',
            });
        }
    }, [login.hasError]);

    useEffect(() => {
        if (login.loaded && !login.hasError) {
            notification.info({
                duration: 2,
                message: AUTH_MESSAGES.LOGIN_SUCCESS,
                description: AUTH_MESSAGES.LOGIN_POST_SUCCESS,
                placement: 'top',
            });
            loginUserToBrowserSession(username, login.token);
            setCurrentUserState(USER_AUTH_STATE.ACTIVE);
            navigate('/');
        }
    }, [login.loaded, login.hasError, username]);

  return <LoginLayout doLogin={onFinish} isLoading={login.isLoading} />;
};

export default Wrapper;