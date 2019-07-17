import React, {useEffect} from 'react'
import NProgress from 'nprogress'
import 'src/assets/css/nprogress.global.css'
import loadable from "@loadable/component";

/**
 * 路由守卫
 * @param props
 * @returns {*}
 * 参考：https://juejin.im/post/5c31aede6fb9a04a0d570107
 */
export default (props) => {

	const {component, path} = props;
	const AsyncPage = loadable(props => import(`../${props.component}`));
	console.log('router', path);

	NProgress.start();
	useEffect(() => {
		NProgress.done();
		return () => {
			NProgress.done();
		}
	});

	return (
		<AsyncPage component={component} {...props}/>
	)
}
