import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import {combineReducers} from 'redux';
import history from './history';
import { routerReducer, routerMiddleware } from 'react-router-redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = persistReducer(persistConfig,
                               combineReducers({...reducers, routerReducer}));

const middlewares = [thunkMiddleware,routerMiddleware(history)]

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger());
}

export const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
