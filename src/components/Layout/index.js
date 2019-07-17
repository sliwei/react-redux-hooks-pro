import React from 'react';
import Menu from '../Menu'
import Header from '../Header'
import AppRouter from 'src/router/appRouter'
import Footer from '../Footer'
import css from './index.scss'
import {useSelector} from "react-redux";

export default () => {

	const openSta = useSelector((state) => state.OpenSta);

	return (
		<>
			<div className={openSta ? css.menu : css.min_menu}>
				<Menu/>
			</div>
			<div className={openSta ? css.content : css.min_content}>
				<div className={css.head}>
					<Header/>
				</div>
				<div className={css.body}>
					<AppRouter/>
				</div>
				<div className={css.footer}>
					<Footer/>
				</div>
			</div>
		</>
	);
}
