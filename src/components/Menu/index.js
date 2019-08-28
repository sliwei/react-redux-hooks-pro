import React, {useState, useEffect} from 'react';
import Example from "./example";
import {Link} from 'react-router-dom'
import {Divider, Button, Icon, Switch} from "@blueprintjs/core";
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
	const [menuTheme, setMenuTheme] = useState(false);
	const openSta = useSelector((state) => state.OpenSta);

	const onClick = info => {
		console.log('click ', info);
	};

	const onOpenChange = keys => {
		console.log('onOpenChange', keys);

		let key = keys[keys.length - 1];
		let keyAz = key ? key.substr(0, 1) : '';

		let openKeys = [];
		keys.map(item => {
			if (item.substr(0, 1) === keyAz) {
				openKeys.push(item)
			}
		});

		setOpenKeys(openKeys);
	};

	const changeMenuTheme = e => {
		let sta = e.target.checked;
		setMenuTheme(sta);
		let menuDomList = document.querySelectorAll('.rc-menu-submenu-popup');
		if (menuDomList.length) {
			if (sta) {
				for (let i = 0; i < menuDomList.length; i++) {
					menuDomList[i].classList.add('rc-menu-submenu-popup-dark');
					menuDomList[i].classList.remove('rc-menu-submenu-popup-light');
				}
			} else {
				for (let i = 0; i < menuDomList.length; i++) {
					menuDomList[i].classList.add('rc-menu-submenu-popup-light');
					menuDomList[i].classList.remove('rc-menu-submenu-popup-dark');
				}
			}
		}
	};

	return (
		<div className={menuTheme ? css.menu_dark : css.menu_light1}>
			{
				openSta
				&&
				<>
					<Example/>
					<Divider/>
				</>
			}
			<Menu
				onClick={onClick}
				mode={openSta ? 'inline' : 'vertical'}
				onOpenChange={onOpenChange}
				openKeys={openKeys}
				openAnimation={openSta ? animation : 'zoom'}
				className={`${css.menu_com} ${!openSta && css.hide_menu}`}
				getPopupContainer={() => document.querySelector('.menu_popup')}
			>
				<SubMenu key="1" title={<span><Icon className={css.menu_icon} icon="dashboard"/>&ensp;{openSta && '仪表盘'}</span>}>
					<MenuItem key="1-1">工作台</MenuItem>
					<MenuItem key="1-2">分析页</MenuItem>
					<MenuItem key="1-3"><Link to="/echarts">图表</Link></MenuItem>
					<MenuItem key="1-4"><Link to="/list">列表</Link></MenuItem>
					<MenuItem key="1-5"><Link to="/content">关于</Link></MenuItem>
				</SubMenu>
				<SubMenu key="2" title={<span><Icon className={css.menu_icon} icon="annotation"/>&ensp;{openSta && '表单页'}</span>}>
					<MenuItem key="2-1">基础表单</MenuItem>
					<MenuItem key="2-2">分步表单</MenuItem>
					<MenuItem key="2-3">高级表单</MenuItem>
				</SubMenu>
				<SubMenu key="3" title={<span><Icon className={css.menu_icon} icon="th"/>&ensp;{openSta && '列表页'}</span>}>
					<MenuItem key="3-1">查询表格</MenuItem>
					<MenuItem key="3-2">标准列表</MenuItem>
					<MenuItem key="3-3">卡片列表</MenuItem>
					<MenuItem key="3-4">搜索列表</MenuItem>
				</SubMenu>
				<SubMenu key="4" title={<span><Icon className={css.menu_icon} icon="list-detail-view"/>&ensp;{openSta && '详情页'}</span>}>
					<MenuItem key="4-1">基础详情页</MenuItem>
					<MenuItem key="4-2">高级详情页</MenuItem>
				</SubMenu>
				<SubMenu key="5" title={<span><Icon className={css.menu_icon} icon="tick-circle"/>&ensp;{openSta && '结果页'}</span>}>
					<MenuItem key="5-1">成功</MenuItem>
					<MenuItem key="5-2">失败</MenuItem>
				</SubMenu>
				<SubMenu key="6" title={<span><Icon className={css.menu_icon} icon="error"/>&ensp;{openSta && '异常页'}</span>}>
					<MenuItem key="6-1">404</MenuItem>
					<MenuItem key="6-2">403</MenuItem>
					<MenuItem key="6-3">500</MenuItem>
				</SubMenu>
				<SubMenu key="7" title={<span><Icon className={css.menu_icon} icon="user"/>&ensp;{openSta && '个人页'}</span>}>
					<MenuItem key="7-1">个人中心</MenuItem>
					<MenuItem key="7-2">个人设置</MenuItem>
				</SubMenu>
				<SubMenu key="8" title={<span><Icon className={css.menu_icon} icon="control"/>&ensp;{openSta && '其他组件'}</span>}>
					<MenuItem key="8-1">图标</MenuItem>
					<SubMenu key="8-2" title={<span><Icon className={css.menu_icon} icon="control"/>&ensp;业务布局</span>}>
						<MenuItem key="8-2-1">树目录表格</MenuItem>
						<MenuItem key="8-2-2">内联编辑表格</MenuItem>
						<MenuItem key="8-2-3">用户列表</MenuItem>
						<MenuItem key="8-2-4">角色列表</MenuItem>
						<MenuItem key="8-2-5">角色列表2</MenuItem>
						<MenuItem key="8-2-6">权限列表</MenuItem>
					</SubMenu>
				</SubMenu>
			</Menu>
			<div className="menu_popup"></div>
			<Switch className={css.theme_sw} checked={menuTheme} onChange={changeMenuTheme} />
		</div>
	);
}
