import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { AnchorButton, Button, Code, H5, Intent, InputGroup, NumericInput, Dialog, Switch, Classes, Tooltip } from "@blueprintjs/core";
import { Cell, Column, Table } from "@blueprintjs/table";

export default (props) => {

	const appStore = useSelector((state) => state.App);

	const [sta, setSta] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	const changeSta = () => setSta(~~!sta);

	const cellRenderer = rowIndex => {
		return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
	};

	const [val, setVal] = useState('');

	const changeVal = e => {
		console.log(e.target.value);
	};

	const showVal = () => console.log(val);

	const handleClose = () => setIsOpen(!isOpen);

	return (
		<div>
			HOME
			<p>

			</p>

			{appStore.app_list.map((item, key) => {
				return <p key={key}>{item.name}</p>
			})}

			<H5>Props</H5>
			<Switch label="Active"/>
			<Switch label="Disabled"/>
			<Switch label="Large"/>
			<Switch label="Loading"/>
			<Switch label="Minimal"/>
			<H5>Example 11</H5>
			<Switch label="Icons only"/>

			<AnchorButton icon="small-tick" text="确定" intent="primary" onClick={changeSta}/>
			<Button icon="refresh" onClick={handleClose}/>
			{/*<input type="text" className={Classes.INPUT} onChange={changeVal} value={val}/>*/}
			{/*<button className={Classes.BUTTON} onClick={showVal}>值</button>*/}

			<InputGroup value={val} style={{width: 200}}/>
			<button className={Classes.BUTTON} onClick={showVal}>值</button>



			<br/>
			<div className="bp3-card bp3-skeleton">
				<h5 className="bp3-heading"><a className=".modifier" href="#" tabIndex="-1">Card heading</a></h5>
				<p className=".modifier">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tortor felis.
					Fusce dapibus metus in dapibus mollis. Quisque eget ex diam.
				</p>
				<button type="button" className="bp3-button bp3-icon-add .modifier" tabIndex="-1">Submit</button>
			</div>

			<NumericInput/>

			<br/>


			<div className={sta ? '' : 'bp3-skeleton'}>
				<Table numRows={24}>
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
				</Table>
			</div>

			<Dialog
				icon="info-sign"
				onClose={handleClose}
				title="Palantir Foundry"
				isOpen={isOpen}
			>
				<div className={Classes.DIALOG_BODY}>
					<p>
						<strong>
							blueprintjs 的使用
						</strong>
					</p>
					<p>1.xxx</p>
					<p>1.xxx</p>
					<p>1.xxx</p>

					<a className={Classes.MENU_ITEM}>custom menu item</a>
					<a className={Classes.MENU_ITEM}>custom menu item</a>
					<a className={Classes.MENU_ITEM}>custom menu item</a>
					<a className={Classes.VERTICAL}>custom menu item</a>
				</div>

				<div className={Classes.DIALOG_FOOTER}>
					<div className={Classes.DIALOG_FOOTER_ACTIONS}>
						<Tooltip content="这是一个文字提示框">
							<Button onClick={handleClose} intent={Intent.DANGER}>关闭</Button>
						</Tooltip>
						<AnchorButton
							intent={Intent.PRIMARY}
							href="https://www.palantir.com/palantir-foundry/"
							target="_blank"
						>
							这是一个链接
						</AnchorButton>
					</div>
				</div>
			</Dialog>
		</div>
	);
}
