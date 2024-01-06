import { useState } from "react";
import { Button, Modal } from "antd";
import {useNavigate} from "react-router-dom";
import {USER_AUTH_STATE} from "../../config/constants";
import {useAuth} from "../../hooks/useAuth";

const Logout = ({ setCurrentUserState }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to logout?');
    const navigate = useNavigate();
    const showModal = () => {
        setOpen(true);
    };

    const { logoutUserFromSession } = useAuth();
    const handleOk = () => {
        setModalText('Logging you out...');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            setCurrentUserState(USER_AUTH_STATE.LOGIN);
            logoutUserFromSession();
            navigate('/login');
        }, 1500); // A artificial timer added to look like API call behavior
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal} >
                Logout
            </Button>
            <Modal
                title="Logout?"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default Logout;