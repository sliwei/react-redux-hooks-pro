import React from "react";
import {Route} from 'react-router-dom'
import RouterGuard from './routerGuard'
import {CSSTransition} from "react-transition-group";
import 'src/assets/css/router.global.css'
import routes from './appRouterConfig'
import loadable from "@loadable/component";

/**
 * 子路由<动画>
 * @returns {*}
 */
export default () => {

	const AsyncPage = loadable(props => import(`../${props.component}`));

	return (
		<div className="router-container">
			{routes.map(({path, component}, index) => (
				<Route key={index} path={path} exact>
					{props => (
						<CSSTransition
							in={props.match != null}
							timeout={400}
							classNames="router-transition"
							unmountOnExit
						>
							<div className="router-transition">
								<AsyncPage component={component} {...props}/>
								{/*<RouterGuard component={component} path={path} {...props}/>*/}
							</div>
						</CSSTransition>
					)}
				</Route>
			))}
		</div>
	)
}
