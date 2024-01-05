import { getLoadingActions } from './actions'

const getAsyncReducer = (actionType, { initialState = {}, merge: defaultMerge = true }) => {
    initialState = {
        isLoading: false,
        loaded: false,
        hasError: false,
        ...initialState,
    };
    const { LOADING, SUCCESS, FAIL } = getLoadingActions(actionType);

    return (state = initialState, action) => {
        let {data, error, ...rest} = action.payload || {};
        let {payload: userData = {}, loadingData, merge = defaultMerge} = action.meta || {};

        switch (action.type) {
            case LOADING: {
                return {
                    ...state,
                    isLoading: true,
                    loaded: false,
                    hasError: false,
                    loadingData: loadingData,
                    error: undefined,
                };
            }
            case SUCCESS: {
                // merge handling can be added here in case our products API is paginated, to merge next page data in redux store
                return {
                    ...state,
                    ...data,
                    isLoading: false,
                    loaded: action.type === SUCCESS, // Todo: Check
                    loadingData: undefined,
                    hasError: false,
                    error: undefined,
                    ...rest,
                };
            }
            case FAIL: {
                return {
                    ...state,
                    isLoading: false,
                    loaded: true,
                    data: state.data,
                    loadingData: undefined,
                    hasError: true,
                    error: {
                        ...error,
                        payload: userData,
                    },
                    ...rest,
                };
            }
            default:
                return state;
        }
    };
};

const createReducers = (actionTypes, { initialState = {} } = {}) => {
    const { name } = actionTypes; // async API reducer
    return getAsyncReducer(name, { initialState })
};

export default createReducers;