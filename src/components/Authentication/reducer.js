import {
    SIGN_IN,
    SIGNED_IN_SUCCESS,
    SIGNED_IN_FAILURE,
    SIGN_OUT,
    SIGNED_OUT,
    SIGNED_UP_SUCCESS,
    SIGNED_UP_FAILURE
} from './constants';

const initialState = {
  user: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN: return {
            signinIn: true
        };
        case SIGNED_IN_SUCCESS:
        case SIGNED_UP_SUCCESS: return {
            token: action.userData.token,
            user: {...action.userData.user}
        };
        case SIGNED_IN_FAILURE:
        case SIGNED_UP_FAILURE: return {
            err: action.err
        };
        case SIGN_OUT:
        case SIGNED_OUT: return {};
        default:
        return state;
    }
}

export default reducer;
