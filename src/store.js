import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { todos } from './todos/reducers';

const reducers = {
  todos
};

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// __REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// to connect the app to Redux DevTools extension on Goolge Chrome

/*
export const configureStore = () => createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/

// applying Thunk middleware on redux store

export const configureStore = () => createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
