import { compose } from 'recompose';
import container from './container';
import { USER_AUTH_STATE } from "./config/constants";
import Login from "./components/login";
import Logout from "./components/logout";
import { useAuth } from "./hooks/useAuth";
import {ROUTES} from "../../config/routes";
import {useNavigate} from "react-router-dom";

const AuthComponent = props => {
    const { currentUserState, setCurrentUserState } = props;
    const { isUserLoggedInToBrowserSession } = useAuth();
    const navigate = useNavigate();
    if (isUserLoggedInToBrowserSession()) {
        navigate(ROUTES.PRODUCTS);
    }
    if (currentUserState === USER_AUTH_STATE.REGISTER) {
        return <div>Not implemented</div>
    } else if (currentUserState === USER_AUTH_STATE.LOGIN) {
        return <Login {...props} setCurrentUserState={setCurrentUserState} />;
    } {
        return null;
    }
};

export default compose(container)(AuthComponent);

export { Logout };

export { useAuth } from "./hooks/useAuth";