import React from "react";
import loadable from '@loadable/component'
import {Route, Redirect, HashRouter, Switch} from 'react-router-dom'
import routes from './rootRouterConfig'

/**
 * 跟路由
 * @returns {*}
 */
export default () => {
	return <HashRouter>
		<Switch>
			{routes.map(({path, component}, index) => (
				<Route path={path} key={index} component={loadable(() => import(`../${component}`))}/>
			))}
			<Redirect to="/"/>
		</Switch>
	</HashRouter>
}
