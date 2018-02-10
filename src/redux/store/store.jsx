import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as loginReducer from '../reducer/loginReducer';
import * as layoutReducer from '../reducer/layoutReducer';
import * as indexReducer from '../reducer/indexReducer';

import thunk from 'redux-thunk'; // 中间件，有了这个就可以支持异步action

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

var store = createStore(
	combineReducers(Object.assign(loginReducer,layoutReducer,indexReducer)),
	applyMiddleware(thunk)
);

export default store;