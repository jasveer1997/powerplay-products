import React, { useEffect, useCallback } from 'react';
import { useStore } from 'react-redux';
import { combineReducers } from 'redux';

const injectReducer = (store, { name, reducer }) => {
    if (Object.hasOwnProperty.call(store.injectedReducers, name)) return;
    store.injectedReducers[name] = reducer;
    store.replaceReducer(combineReducers({ ...store.globalReducers, ...store.injectedReducers }));
};

const ejectReducer = (store, { name }) => {
    if (Object.hasOwnProperty.call(store.injectedReducers, name)) {
        delete store.injectedReducers[name];
        store.replaceReducer(combineReducers({ ...store.injectedReducers }));
    }
};

const handleMultipleReducers = (store, reducers, callback) => {
    for (let reducer of reducers) {
        callback(store, reducer);
    }
};

const injectMultipleReducer = (store, reducers) =>
    handleMultipleReducers(store, reducers, injectReducer);

const ejectMultipleReducer = (store, reducers) =>
    handleMultipleReducers(store, reducers, ejectReducer);

const withReducer = (reducers) => (Component) => (props) => {
    const store = useStore();

    useEffect(() => {
        Array.isArray(reducers) // for when dashboard container will have single product / cart checkouts as well
            ? injectMultipleReducer(store, reducers)
            : injectReducer(store, reducers);

        return () => {
            Array.isArray(reducers)
                ? ejectMultipleReducer(store, reducers)
                : ejectReducer(store, reducers);
        };
    }, [store]);
    return <Component {...props} />;
};

export default withReducer;
