import { all, call, put, takeLatest } from 'redux-saga/effects';
import createActions from '../../helper/actions';

import {FETCH_ALL_PRODUCTS} from './actionTypes';
import { FETCH_ALL_PRODUCTS_ACTION_CONFIG } from './reducer';
import ProductsService from './api';

function* fetchAllProducts({ payload = {} }) {
    const { SUCCESS, FAIL } = yield call(createActions, FETCH_ALL_PRODUCTS_ACTION_CONFIG);
    try {
        const productsResponse = yield call(ProductsService.fetchProducts, payload);
        yield put(SUCCESS({ products: productsResponse.data }));
    } catch (error) {
        yield put(FAIL(error, { globalError: true }));
    }
}

function* handleFetchProducts() {
    yield takeLatest(FETCH_ALL_PRODUCTS, fetchAllProducts);
}

export default function* () {
    yield all([handleFetchProducts()]);
}
