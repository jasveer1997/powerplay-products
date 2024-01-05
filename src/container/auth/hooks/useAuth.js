import { useCallback } from "react";
import { get } from "../../../utils/localStorage";
import {isNull} from "../../../utils";

export const useAuth = () => {

    // A utility hook to quickly verify local storage presence for any user (to get details)
    const isUserLoggedInToBrowserSession = useCallback(() => {
        const localSession = get("powerplay_user");
        return !isNull(localSession);
    }, [get]);

    const logoutUserFromSession = useCallback(() => {}, []);

    const loginUserToBrowserSession = useCallback(() => {}, []);

    return { isUserLoggedInToBrowserSession, logoutUserFromSession, loginUserToBrowserSession };
};
