const createSuccessAction = (actionName) => {
    return (data, meta = {}) => {
        const { SUCCESS } = getLoadingActions(actionName);
        return {
            type: SUCCESS,
            payload: {
                ...data,
            },
            meta,
        };
    };
};

const createFailAction = (actionType) => {
    return (error = {}, meta = {}) => {
        const { FAIL } = getLoadingActions(actionType);
        return {
            type: FAIL,
            payload: error.error ? error : { error },
            meta,
        };
    };
};

const generateAction = (actionName, options = {}) => {
    const defaultAction = (payload, meta) => {
        return {
            type: actionName,
            payload: payload,
            meta: meta,
        };
    };
    if (options.async) {
        const successAction = createSuccessAction(actionName);
        const failAction = createFailAction(actionName);
        return {
            LOADING: defaultAction,
            SUCCESS: successAction,
            FAIL: failAction,
        };
    }
    return defaultAction;
};

const createActions = (actionType) => {
    if (typeof actionType === 'object') {
        const { name, options: { async = false } = {} } = actionType;
        return generateAction(name, { async });
    } else if (typeof actionType === 'string') {
        return generateAction(actionType);
    }
};

export const getLoadingActions = actionName => {
    return {
        SUCCESS: `${actionName}$_SUCCESS`,
        FAIL: `${actionName}_FAIL`,
        LOADING: actionName,
    };
};

export default createActions;