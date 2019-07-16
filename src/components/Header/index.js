import React, {useState} from 'react';
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

	return (
		<>
			<Icon onClick={changeOpenSta} style={{margin: 13, cursor: 'pointer'}} iconSize={24} icon={openSta ? 'menu-closed' : 'menu-open'}/>
			<Link style={{float: 'right'}} to="/login">登出</Link>
		</>
	);
}

export default App;
