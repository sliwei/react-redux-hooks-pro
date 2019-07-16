import Layout from "../components/Layout";
import Login from "../views/login";
import React from "react";
import {Route, Redirect, HashRouter, Switch as RouterSwitch} from 'react-router-dom'

export default () => {
	return <HashRouter>
		<RouterSwitch>
			<Route path="/login" component={Login}/>
			<Route path="/" component={Layout}/>
			<Redirect to="/"/>
		</RouterSwitch>
	</HashRouter>
}
