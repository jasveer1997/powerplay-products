import { useCallback } from "react";
import { get, set, remove } from "../../../utils/localStorage";
import {isNull} from "../../../utils";

export const useAuth = () => {

    // A utility hook to quickly verify local storage presence for any user (to get details)
    const isUserLoggedInToBrowserSession = useCallback(() => {
        const localSession = get("powerplay_user");
        return !isNull(localSession);
    }, [get]);

    const logoutUserFromSession = useCallback(() => {
        remove("powerplay_user");
    }, []);

    const loginUserToBrowserSession = useCallback((username, token) => {
        set("powerplay_user", { username, token });
    }, [set]);

    return { isUserLoggedInToBrowserSession, logoutUserFromSession, loginUserToBrowserSession };
};
