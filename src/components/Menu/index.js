import React, {useState} from 'react';
import Example from "./example";
import {Divider, Button, Icon} from "@blueprintjs/core";
import {useSelector} from "react-redux";
import Menu, {SubMenu, Item as MenuItem} from 'rc-menu';
import 'rc-menu/assets/index.css';
import animate from 'css-animation';
import css from './index.scss'

const animation = {
	enter(node, done) {
		let height;
		return animate(node, 'rc-menu-collapse', {
			start() {
				height = node.offsetHeight;
				node.style.height = 0;
			},
			active() {
				node.style.height = `${height}px`;
			},
			end() {
				node.style.height = '';
				done();
			},
		});
	},

	appear() {
		return this.enter.apply(this, arguments);
	},

	leave(node, done) {
		return animate(node, 'rc-menu-collapse', {
			start() {
				node.style.height = `${node.offsetHeight}px`;
			},
			active() {
				node.style.height = 0;
			},
			end() {
				node.style.height = '';
				done();
			},
		});
	},
};

export default () => {

	const [openKeys, setOpenKeys] = useState([]);
	const openSta = useSelector((state) => state.OpenSta);


	const onClick = info => {
		console.log('click ', info);
	};

	const onOpenChange = openKeys => {
		console.log('onOpenChange', openKeys);
		setOpenKeys([openKeys[openKeys.length - 1]]);
	};

	return (
		<div className={css.menu}>
			{/*{*/}
				{/*openSta*/}
				{/*&&*/}
				{/*<>*/}
					{/*<Example/>*/}
					{/*<Divider/>*/}
					{/*<Button onClick={changeType}>修改</Button>*/}
				{/*</>*/}
			{/*}*/}
			<Menu
				onClick={onClick}
				mode={openSta ? 'inline' : 'vertical'}
				onOpenChange={onOpenChange}
				openKeys={openKeys}
				openAnimation={openSta ? animation : 'zoom'}
				className={`${css.menu_com} ${!openSta && css.hide_menu}`}
			>
				<SubMenu key="1" title={<span><Icon className={css.menu_icon} icon="dashboard"/>&ensp;{openSta && '仪表盘'}</span>}>
					<MenuItem key="1-1">item1-1</MenuItem>
					<MenuItem key="1-2">item1-2</MenuItem>
				</SubMenu>
				<SubMenu key="2" title={<span><Icon className={css.menu_icon} icon="annotation"/>&ensp;{openSta && '表单页'}</span>}>
					<MenuItem key="2-1">item2-1</MenuItem>
					<MenuItem key="2-2">item2-2</MenuItem>
				</SubMenu>
				<SubMenu key="3" title={<span><Icon className={css.menu_icon} icon="th"/>&ensp;{openSta && '列表页'}</span>}>
					<MenuItem key="3-1">item3-1</MenuItem>
					<MenuItem key="3-2">item3-2</MenuItem>
				</SubMenu>
				<SubMenu key="4" title={<span><Icon className={css.menu_icon} icon="list-detail-view"/>&ensp;{openSta && '详情页'}</span>}>
					<MenuItem key="4-1">item4-1</MenuItem>
					<MenuItem key="4-2">item4-2</MenuItem>
				</SubMenu>
				<SubMenu key="5" title={<span><Icon className={css.menu_icon} icon="tick-circle"/>&ensp;{openSta && '结果页'}</span>}>
					<MenuItem key="5-1">item5-1</MenuItem>
					<MenuItem key="5-2">item5-2</MenuItem>
				</SubMenu>
				<SubMenu key="6" title={<span><Icon className={css.menu_icon} icon="error"/>&ensp;{openSta && '异常页'}</span>}>
					<MenuItem key="6-1">item6-1</MenuItem>
					<MenuItem key="6-2">item6-2</MenuItem>
				</SubMenu>
				<SubMenu key="7" title={<span><Icon className={css.menu_icon} icon="user"/>&ensp;{openSta && '个人页'}</span>}>
					<MenuItem key="7-1">item7-1</MenuItem>
					<MenuItem key="7-2">item7-2</MenuItem>
				</SubMenu>
				<SubMenu key="8" title={<span><Icon className={css.menu_icon} icon="control"/>&ensp;{openSta && '其他组件'}</span>}>
					<MenuItem key="8-1">item8-1</MenuItem>
					<MenuItem key="8-2">item8-2</MenuItem>
				</SubMenu>
			</Menu>
		</div>
	);
}
