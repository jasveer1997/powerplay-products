import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import withReducer from '../../helper/reducer';
import withSaga from '../../helper/saga';
import createActions from '../../helper/actions';

import { LOGIN } from './actionTypes';
import reducer from './reducer';
import saga from './saga';

const mapStateToProps = ({ login = {}}) => {
    console.log("login data in store: ", login);
    return login;
}

const mapDispatchToProps = dispatch => ({
    doLogin: option => dispatch(createActions(LOGIN)(option)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducerHelper = withReducer({ name: "login", reducer });

const withSagaHelper = withSaga({ name: "login", saga });

export default compose(setDisplayName('Login'), withReducerHelper, withSagaHelper, withConnect);
