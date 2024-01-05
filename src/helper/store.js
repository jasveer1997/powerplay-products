import React, {useMemo} from 'react';
import { combineReducers, legacy_createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import sagaMiddleware from "./sagaMiddleware";

const dummyReducer = combineReducers({
    pageInfo: () => 'pageInfo dummy reducer'
});

function createStore(initialState = {}) {
    const store = createReduxStore(initialState, compose(...[applyMiddleware(...[sagaMiddleware])]));

    const extensions = {
        injectedReducers: {},
        injectedSagas: {},
        runSaga: sagaMiddleware.run
    };

    return Object.keys(extensions).reduce((extendedStore, extension) => {
        extendedStore[extension] = extensions[extension];
        return extendedStore;
    }, store);
}

const ReduxStoreProvider = ({ initialState = dummyReducer, children }) => {
    const myStore = useMemo(() => createStore(initialState), []);
    return <ReduxProvider store={myStore}>{children}</ReduxProvider>;
}

export default ReduxStoreProvider;
