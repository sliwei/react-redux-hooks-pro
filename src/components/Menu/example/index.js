import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {App as app} from 'src/actions'

function Example() {

	// state
	const [count, setCount] = useState(0);
	const [list, setList] = useState([]);

	// redux
	const dispatch = useDispatch();
	const addItm = () => dispatch(app({name: 'xiao li'}));

	// 异步数据
	const fetchData = async () => {
		await setTimeout(() => {
			setList([1,2,3])
		}, 2000);
		await setTimeout(() => {
			setList([1,2,3,4,5])
		}, 5000);
	};

	// 生命周期
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div style={{padding: 10}}>
			<div>
				<p>You clicked {count} times</p>
				<button onClick={() => setCount(count + 1)}>Click me</button>
			</div>

			<div>
				<p>{JSON.stringify(list, undefined, 2)}</p>
			</div>

			<div>
				<button onClick={addItm}>store + `xiao li` item</button>
			</div>
		</div>
	);
}

export default Example;
