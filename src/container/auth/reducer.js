import { combineReducers } from 'redux';
import createReducers from '../../helper/createReducer';

import { LOGIN } from './actionTypes';

export const LOGIN_ACTION_CONFIG = {
    name: LOGIN,
    options: {
        async: true,
    },
};

export default combineReducers({
    login: createReducers(LOGIN_ACTION_CONFIG, { initialState: {} }),
});
