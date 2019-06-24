import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useSelector, useDispatch} from 'react-redux'
import store from './store'
import {App as app} from './actions'
import {Route, Redirect, HashRouter as Router, Switch as RouterSwitch} from 'react-router-dom'
import Home from './views/home'
import Login from './views/login'

function Example() {
	// 声明一个叫 "count" 的 state 变量
	const [count, setCount] = useState(0);

	const appStore = useSelector((state) => state.App)
	const dispatch = useDispatch();
	const addItm = () => {
		let item = {
			name: 'xiao li'
		};
		dispatch(app(item))
	};

	useEffect(() => {
		async function fun() {
			await setTimeout(() => {
				console.log('200');
			}, 2000)
			await setTimeout(() => {
				console.log('500');
			}, 5000)
		}

		fun();
	}, []);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>


			<br/>

			<button onClick={addItm}>
				store + `xiao li` item
			</button>

			{appStore.app_list.map((item, key) => {
				return <p key={key}>{item.name}</p>
			})}
		</div>
	);
}

function App() {

	const dispatch = useDispatch();
	const addItm = () => {
		let item = {
			name: 'xiao li APP'
		};
		dispatch(app(item))
	};

	return (
		<div>

			<div style={{border: '1px solid #f00', margin: '20px'}}>
				<h1>Example</h1>
				<Example/>
			</div>

			<div style={{border: '1px solid #f00', margin: '20px'}}>
				<h1>App</h1>
				<button onClick={addItm}>
					add Example store + `xiao li APP` item
				</button>

				<div style={{border: '1px solid #0f0', margin: '20px'}}>
					<h1>Route View</h1>
					<RouterSwitch>
						<Route path="/" component={Home} exact/>
						<Route path="/login" component={Login} exact/>
						<Redirect to="/"/>
					</RouterSwitch>
				</div>

			</div>

		</div>
	);
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>,
	document.getElementById('app'));
