import React, {useState} from 'react'
import {Form, Field} from 'react-final-form'
import {H5, Button, Intent, InputGroup, FormGroup, Dialog, Classes, Toaster} from "@blueprintjs/core";
import awaitTo from 'async-await-error-handling';
const toaster = Toaster.create();

export default (props) => {

	const [agreementSta, setAgreementSta] = useState(false);
	const [loading, setLoading] = useState(false);

	const login = () => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(30);
			}, 1000);
		})
	};

	// 登录
	const onSubmit = async (dat) => {
		setLoading(true);
		const [err, data] = await awaitTo(login());
		setLoading(false);
		if (err) {
			toaster.show({message: 'message', intent: Intent.DANGER, icon: 'error'});
			return false;
		}
		console.log(data);
		props.history.push('/');
	};

	// 校验
	const validate = values => {
		const errors = {};
		if (!values.user) {
			errors.user = '请输入账号';
		}
		if (!values.password) {
			errors.password = '请输入密码';
		}
		if (!values.agreement) {
			errors.agreement = '请阅读用户使用条款并同意';
		}
		return errors;
	};

	// 状态色彩
	const retIntent = meta => meta.valid ? Intent.SUCCESS : meta.visited && meta.touched ? Intent.DANGER : Intent.NONE;

	return <div style={{width: 300, margin: '200px auto 0'}}>

		<H5>登入系统</H5>
		<Form
			onSubmit={onSubmit}
			validate={validate}
			render={({handleSubmit, pristine, invalid}) => (
				<form onSubmit={handleSubmit}>

					<Field name="user">
						{({input, meta}) => (
							<FormGroup
								intent={retIntent(meta)}
								helperText={meta.touched && meta.error && meta.error}
								label="账号"
								labelFor="text-user"
								labelInfo="(必填)">
								<InputGroup intent={retIntent(meta)} id="text-user" {...input} placeholder="请输入账号" autocomplete="off"/>
							</FormGroup>
						)}
					</Field>

					<Field name="password">
						{({input, meta}) => (
							<FormGroup
								intent={retIntent(meta)}
								helperText={meta.touched && meta.error && meta.error}
								label="密码"
								labelFor="text-password"
								labelInfo="(必填)">
								<InputGroup intent={retIntent(meta)} id="text-password" {...input} placeholder="请输入密码" autocomplete="off"/>
							</FormGroup>
						)}
					</Field>

					<Field name="agreement">
						{({input, meta}) => (
							<FormGroup
								intent={retIntent(meta)}
								helperText={meta.touched && meta.error && meta.error}
								labelFor="text-agreement">
								<label className="bp3-control bp3-checkbox">
									<input {...input} id="text-agreement" type="checkbox"/>
									<span className="bp3-control-indicator"/>
									同意<a href="javascript:;" onClick={() => setAgreementSta(true)}>用户使用条款</a>
								</label>
							</FormGroup>
						)}
					</Field>

					<Button loading={loading} intent={Intent.PRIMARY} type="submit" disabled={pristine || invalid} text="登录"/>
				</form>
			)}
		/>

		<Dialog
			icon="info-sign"
			onClose={() => setAgreementSta(false)}
			title="用户使用条款"
			isOpen={agreementSta}
			style={{width: 600}}
		>
			<div className={Classes.DIALOG_BODY}>
				<p>
					<strong>
						用户使用条款
					</strong>
				</p>
				<p>1.xxx</p>
				<p>1.xxx</p>
				<p>1.xxx</p>
			</div>

			<div className={Classes.DIALOG_FOOTER}>
				<div className={Classes.DIALOG_FOOTER_ACTIONS}>
					<Button onClick={() => setAgreementSta(false)}>我知道了</Button>
				</div>
			</div>
		</Dialog>
	</div>
}
