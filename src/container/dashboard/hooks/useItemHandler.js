import {useCallback} from "react";

export const useItemHandler = ({ setItemCount }) => {

    // no limit on addition for now.
    const incrementItem = useCallback((index) => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [index]: (prevCount[index] || 0) + 1,
        }));
    }, [setItemCount]);

    const decrementItem = useCallback((index) => {
        setItemCount((prevCount) => ({
            ...prevCount,
            [index]: (prevCount[index] || 0) - 1,
        }));
    }, [setItemCount]);

    const curriedDecrementItem = (id) => ()  => decrementItem(id);

    const curriedIncrementItem = (id) => ()  => incrementItem(id);

    return { curriedIncrementItem, curriedDecrementItem };
};
