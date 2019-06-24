import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

export default () => {
	return (
		<div>
			HOME
			<p>
				<Link to="/login">Login</Link>
			</p>
		</div>
	);
}
