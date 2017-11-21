import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import route from './router/route'; // 所有定义好的路由
import registerServiceWorker from './registerServiceWorker';

import './style/common.css';

store.subscribe(() => { // 监听state变化
	// console.log(store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		{route}
	</Provider>,
	document.body.appendChild(document.createElement('root'))
);
registerServiceWorker();