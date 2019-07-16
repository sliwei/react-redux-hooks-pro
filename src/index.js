if (module.hot) {
	module.hot.accept();
}
import '@babel/polyfill'
import 'normalize.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store'
import View from './router'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/table/lib/css/table.css'

ReactDOM.render(
	<Provider store={store}>
		<View/>
	</Provider>,
	document.getElementById('app'));
