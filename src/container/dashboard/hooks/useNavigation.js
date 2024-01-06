import {useCallback} from "react";

export const useNavigation = ({ navigate }) => {

    const navToProductDetail = useCallback((id) => () => {
        navigate(`product/${id}`)
    }, [navigate]);

    return { navToProductDetail };
};
