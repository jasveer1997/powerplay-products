import { useState } from "react";
import { compose } from 'recompose';
import container from './container';
import { USER_AUTH_STATE } from "./config/constants";
import Login from "./components/login";

const AuthComponent = props => {
    const [currentUserState, setCurrentUserState] = useState(USER_AUTH_STATE.LOGIN);
    if (currentUserState === USER_AUTH_STATE.REGISTER) {
        return <div>Not implemented</div>
    } else if (currentUserState === USER_AUTH_STATE.LOGIN) {
        return <Login {...props} />;
    } else {
        return null;
    }
};

export default compose(container)(AuthComponent);

export { useAuth } from "./hooks/useAuth";