import React from "react";
import loadable from '@loadable/component'
import {Route, Redirect, HashRouter, Switch as RouterSwitch} from 'react-router-dom'

export default () => {
	return <HashRouter>
		<RouterSwitch>
			<Route path="/login" component={loadable(() => import('src/views/login'))}/>
			<Route path="/" component={loadable(() => import('src/components/Layout'))}/>
			<Redirect to="/"/>
		</RouterSwitch>
	</HashRouter>
}
