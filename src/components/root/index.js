import {useEffect, useState} from "react";
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReduxStoreProvider from '../../helper/store';
import Auth, { useAuth } from '../../container/auth';
import Dashboard from "../../container/dashboard";
import {USER_AUTH_STATE} from "../../container/auth/config/constants";
import {ROUTES} from "../../config/routes";

const Wrapper = props => {
    const navigate = useNavigate();

    // First check for login with login module.
    const { isUserLoggedInToBrowserSession } = useAuth();
    const isUserAllowedToEnter = isUserLoggedInToBrowserSession();

    useEffect(() => {
        if (!isUserAllowedToEnter) {
            navigate(ROUTES.LOGIN);
        }
    }, [isUserAllowedToEnter, navigate]);

    return <Dashboard {...props} />;
};

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
