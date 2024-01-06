import {useCallback, useState} from "react";

export const useDescription = () => {

    const [expandedDescription, setExpandedDescription] = useState({});

    const toggleDescription = useCallback((index) => {
        setExpandedDescription((prevExpanded) => ({
            ...prevExpanded,
            [index]: !prevExpanded[index],
        }));
    }, [setExpandedDescription]);

    const curriedToggleDesc = (id) => ()  => toggleDescription(id);

    return { expandedDescription, curriedToggleDesc };
};
