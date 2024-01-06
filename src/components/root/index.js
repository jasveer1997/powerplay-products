import { useEffect } from "react";
// import './app.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../container/auth';
import Auth from '../../container/auth';
import ReduxStoreProvider from '../../helper/store';

const Wrapper = () => {
    // First check for login with login module. (We can have a utility)
    const { isUserLoggedInToBrowserSession } = useAuth();
    const isUserAllowedToEnter = isUserLoggedInToBrowserSession();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isUserAllowedToEnter) {
            navigate('/login');
        }
    }, [isUserAllowedToEnter, navigate]);

    return  <div>abc</div>
};

const SingleProduct = null;
const Cart = null;

const AppWithReduxStoreAndRoutes = () => {
    return (
        <ReduxStoreProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Wrapper />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/product/:pid" element={<SingleProduct />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
        </ReduxStoreProvider>
    );
};

export default AppWithReduxStoreAndRoutes;
