import { combineReducers } from 'redux';
import createReducers from '../../helper/createReducer';

import {FETCH_ALL_PRODUCTS} from './actionTypes';

export const FETCH_ALL_PRODUCTS_ACTION_CONFIG = {
    name: FETCH_ALL_PRODUCTS,
    options: {
        async: true,
    },
};

export default combineReducers({
    products: createReducers(FETCH_ALL_PRODUCTS_ACTION_CONFIG, { initialState: {} }),
});
