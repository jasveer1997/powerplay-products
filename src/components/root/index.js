import {useEffect, useState} from "react";
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReduxStoreProvider from '../../helper/store';
import Auth, { useAuth } from '../../container/auth';
import Dashboard from "../../container/dashboard";
import {USER_AUTH_STATE} from "../../container/auth/config/constants";

const Wrapper = props => {
    // First check for login with login module. (We can have a utility)
    const { isUserLoggedInToBrowserSession } = useAuth();
    const isUserAllowedToEnter = isUserLoggedInToBrowserSession();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserAllowedToEnter) {
            navigate('/login');
        }
    }, [isUserAllowedToEnter, navigate]);

    return <Dashboard {...props} />;
};

const SingleProduct = null;
const Cart = null;

const AppWithReduxStoreAndRoutes = () => {
    const [currentUserState, setCurrentUserState] = useState(USER_AUTH_STATE.LOGIN);
    return (
        <ReduxStoreProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Auth currentUserState={currentUserState} setCurrentUserState={setCurrentUserState} />} />
                <Route path="/products/*" element={<Wrapper setCurrentUserState={setCurrentUserState} />} />
                <Route path="*" element={<Wrapper setCurrentUserState={setCurrentUserState} />} />
            </Routes>
        </Router>
        </ReduxStoreProvider>
    );
};

export default AppWithReduxStoreAndRoutes;
