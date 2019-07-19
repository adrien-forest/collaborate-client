import { combineReducers } from 'redux';

import authReducer from 'components/Authentication/reducer';
import modalReducer from 'components/Modal/reducer';
import appReducer from 'components/App/reducer';

export default function createReducer() {
    return combineReducers({
        auth: authReducer,
        modal: modalReducer,
        app: appReducer
  });
}
