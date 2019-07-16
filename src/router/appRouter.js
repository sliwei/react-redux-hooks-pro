import React from "react";
import loadable from "@loadable/component";
import {Route, Redirect, Switch as RouterSwitch} from 'react-router-dom'
import {CSSTransition} from 'react-transition-group'
import './index.css'

const routes = [
	{path: '/', name: 'Home', Component: loadable(() => import('src/views/home'))},
	{path: '/echarts', name: 'Echarts', Component: loadable(() => import('src/views/echarts'))},
	{path: '/list', name: 'List', Component: loadable(() => import('src/views/list'))},
	{path: '/content', name: 'Content', Component: loadable(() => import('src/views/content'))},
];

export default () => {
	return <div className="container">
		{routes.map(({path, Component}) => (
			<Route key={path} exact path={path}>
				{({match}) => (
					<CSSTransition
						in={match != null}
						timeout={400}
						classNames="page"
						unmountOnExit
					>
						<div className="page">
							<Component/>
						</div>
					</CSSTransition>
				)}
			</Route>
		))}
		<Redirect to="/"/>
	</div>
}
