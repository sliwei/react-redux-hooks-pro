import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {OpenSta} from 'src/actions'
import {Link} from "react-router-dom";
import {Icon} from "@blueprintjs/core";

function App() {

	const openSta = useSelector((state) => state.OpenSta);
	const dispatch = useDispatch();

	const changeOpenSta = () => {
		dispatch(OpenSta(!openSta))
	};

	useEffect(() => {
		let change = w => {
			if (w < 1280) {
				dispatch(OpenSta(false));
			} else if (w >= 1280) {
				dispatch(OpenSta(true));
			}
		};
		let w = document.documentElement.clientWidth;
		change(w);
		window.onresize = e => {
			let w = document.documentElement.clientWidth;
			change(w);
		};
		return () => {
			window.onresize = null;
		};
	}, []);

	return (
		<>
			<Icon onClick={changeOpenSta} style={{margin: 13, cursor: 'pointer'}} iconSize={24} icon={openSta ? 'menu-closed' : 'menu-open'}/>
			<Link style={{float: 'right'}} to="/login">登出</Link>
		</>
	);
}

export default App;
