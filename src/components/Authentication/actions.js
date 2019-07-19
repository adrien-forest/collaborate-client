import {
    SIGN_IN,
    SIGNED_IN_SUCCESS,
    SIGNED_IN_FAILURE,
    SIGN_OUT,
    SIGN_UP,
    SIGNED_UP_SUCCESS,
    SIGNED_UP_FAILURE
} from './constants';
import api from 'utils/api';

export {
    restoreSignIn,
    signIn,
    signOut,
    signUp
};
  
function restoreSignIn() {
    const userData = api.getStoredUser();
    if (userData) {
        return {
            type: SIGNED_IN_SUCCESS,
            userData
        };
    }
    return {type: 'restore'};
}

function signIn(username, password) {
    return dispatch => {
        dispatch({ type: SIGN_IN, payload: username });
        api.signIn(username, password)
            .then(userData => dispatch({ type: SIGNED_IN_SUCCESS, userData }))
            .catch(err => dispatch({ type: SIGNED_IN_FAILURE, err }));
    }
}

function signOut() {
    api.signOut();
    return {
        type: SIGN_OUT
    };
}

function signUp(userInfo) {
    return dispatch => {
        dispatch({ type: SIGN_UP, userInfo });
        api.signUp(userInfo)
            .then(userData => dispatch({ type: SIGNED_UP_SUCCESS, userData}))
            .catch(err => dispatch({ type: SIGNED_UP_FAILURE, err }));
    }
}
  