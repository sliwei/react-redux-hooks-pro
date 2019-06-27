import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { AnchorButton, Button, Code, H5, Intent, Switch } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css'
import { Cell, Column, Table } from "@blueprintjs/table";
import '@blueprintjs/table/lib/css/table.css'


export default (props) => {

	const cellRenderer = rowIndex => {
		return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
	};

	return (
		<div>
			HOME
			<p>
				<Link to="/login">Login</Link>
			</p>

			<H5>Props</H5>
			<Switch label="Active"/>
			<Switch label="Disabled"/>
			<Switch label="Large"/>
			<Switch label="Loading"/>
			<Switch label="Minimal"/>
			<H5>Example</H5>
			<Switch label="Icons only"/>

			<AnchorButton text="Click" />

			<div>
				<Table numRows={24}>
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />
					<Column name="Dollars" cellRenderer={cellRenderer} />

				</Table>
			</div>
		</div>
	);
}
