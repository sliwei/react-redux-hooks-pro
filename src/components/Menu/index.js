import React from 'react';
import Example from "./example";
import {Divider, Menu, MenuItem} from "@blueprintjs/core";
import {useSelector} from "react-redux";

export default () => {

	const openSta = useSelector((state) => state.OpenSta);

	return (
		<>
			{openSta &&
			<>
				<Example/>
				<Divider/>
			</>}
			<Menu>
				<MenuItem icon="home" href="#/"/>
				<MenuItem icon="timeline-area-chart" href="#/echarts"/>
				<MenuItem icon="join-table" href="#/list"/>
				<MenuItem icon="control" href="#/content"/>
			</Menu>
		</>
	);
}
