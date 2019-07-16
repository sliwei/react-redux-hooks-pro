import Home from "../views/home";
import Echarts from "../views/echarts";
import React from "react";
import {Route, Redirect, Switch as RouterSwitch} from 'react-router-dom'

export default () => {
	return <RouterSwitch>

		<Route exact path="/" component={Home}/>
		<Route path="/echarts" component={Echarts}/>
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}

		<Redirect to="/"/>
	</RouterSwitch>
}
