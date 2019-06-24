import React from 'react'

export default (props) => {

	const ret = () => props.history.push('/');

	return <div>
		<input type="text"/>
		login
		<input type="button" value="ret" onClick={ret}/>
	</div>
}
