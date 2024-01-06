import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import withReducer from '../../helper/reducer';
import withSaga from '../../helper/saga';
import createActions from '../../helper/actions';

import { FETCH_ALL_PRODUCTS } from './actionTypes';
import reducer from './reducer';
import saga from './saga';

const mapStateToProps = (state) => {
    console.log("products data in store: ", state);
    return state.products;
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: option => dispatch(createActions(FETCH_ALL_PRODUCTS)(option)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducerHelper = withReducer({ name: "products", reducer });

const withSagaHelper = withSaga({ name: "products", saga });

export default compose(setDisplayName('Products'), withReducerHelper, withSagaHelper, withConnect);
