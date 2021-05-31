import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import filemanagerReducer from './filemanager/filemanager-reducer';
import filesReducer from './files/files-reducer';

export const reducers = combineReducers({
  filemanager: filemanagerReducer,
  files: filesReducer
});
const middlewares = compose(applyMiddleware(thunk));

export const store = createStore(reducers, middlewares);

export default store;
