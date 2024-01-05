import { useEffect } from "react";
import { useStore } from 'react-redux';

const checkSagaExists = (name, injectedSagas) => {
    return Object.hasOwnProperty.call(injectedSagas, name);
};

const injectSaga = (store, mySaga, ...args) => {
    const { saga, name } = mySaga;
    let sagaAlreadyExists = checkSagaExists(name, store.injectedSagas);

    if (!sagaAlreadyExists) {
        store.injectedSagas[name] = {
            saga,
            task: store.runSaga(saga, ...args),
        };
    }
}

function ejectSaga(store, name) {
    let hasSaga = checkSagaExists(name, store.injectedSagas);

    if (hasSaga) {
        const descriptor = store.injectedSagas[name];
        // descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
            store.injectedSagas[name] = 'done';
        }
    }
}

const withSaga = (saga, ...args) => Component => props => {
    const store = useStore();

    useEffect(() => {
        injectSaga(store, saga, ...args);
        return () => ejectSaga(store, saga.name);
    }, [store]);

    return <Component {...props} />;
};

export default withSaga;