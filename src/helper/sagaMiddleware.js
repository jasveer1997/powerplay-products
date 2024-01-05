import createSagaMiddleware from 'redux-saga';

export default createSagaMiddleware({
    onError(error) {
        if (error) {
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }
    },
});