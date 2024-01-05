import { all, call, put, takeLatest } from 'redux-saga/effects';
import createActions from '../../helper/actions';

import { LOGIN } from './actionTypes';
import { LOGIN_ACTION_CONFIG } from './reducer';
import AuthService from './api';

function* doLogin({ payload }) {
    const { SUCCESS, FAIL } = yield call(createActions, LOGIN_ACTION_CONFIG);
    try {
        const loginResponse = yield call(AuthService.login, payload);
        yield put(SUCCESS({ data: loginResponse }));
    } catch (error) {
        yield put(FAIL(error, { globalError: true }));
    }
}

function* handleLogin() {
    yield takeLatest(LOGIN, doLogin);
}

export default function* () {
    yield all([handleLogin()]);
}
