import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import createReducer from './createReducer';

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunkMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  : applyMiddleware(thunkMiddleware);

export default function _createStore() {
  return createStore(
    createReducer(),
    enhancers
  );
};
