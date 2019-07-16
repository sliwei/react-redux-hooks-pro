import React from "react";
import loadable from "@loadable/component";
import {Route, Redirect, Switch as RouterSwitch} from 'react-router-dom'

export default () => {
	return <RouterSwitch>

		<Route exact path="/" component={loadable(() => import('src/views/home'))}/>
		<Route path="/echarts" component={loadable(() => import('src/views/echarts'))}/>
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}
		{/*<Route path="/echarts" component={Echarts}/>*/}

		<Redirect to="/"/>
	</RouterSwitch>
}
