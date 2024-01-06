import { useState } from "react";
import { compose } from 'recompose';
import container from './container';
import { USER_AUTH_STATE } from "./config/constants";
import Login from "./components/login";
import Logout from "./components/logout";

const AuthComponent = props => {
    const { currentUserState, setCurrentUserState } = props;
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