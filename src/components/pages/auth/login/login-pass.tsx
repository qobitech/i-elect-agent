import './style.scss';

import type React from 'react';
import * as yup from 'yup';

import logo from '../../../../assets/images/logo.svg';
import { encodeData } from '../../../../constants/global';
import { pageurl } from '../../../../constants/pageurl';
import { useGlobalContext } from '../../../../context/global';
import type { IActions } from '../../../../interface/IAction';
import type { IStates } from '../../../../interface/IReducer';
import type { ILogin } from '../../../../interface/state/IAuthState';
import { TypeButton } from '../../../utils/button';
import FormBuilder, { type IFormComponent } from '../../../utils/form-builder';
import { Hvc, useFormHook } from '../../../utils/hooks';

export interface IFormLogin {
	username: string;
	password: string;
}

const schema = {
	username: yup.string().required('Email is required'),
	password: yup.string().required('Password is required'),
};
interface ILoginPageChild {
	states?: IStates;
}

const fc: IFormComponent[] = [
	{
		id: 'username',
		component: 'input',
		label: 'Email',
		placeHolder: 'Enter your email address',
	},
	{
		id: 'password',
		component: 'input',
		type: 'password',
		label: 'Password',
		placeHolder: 'Enter your password',
	},
];

const LoginPassPage: React.FC<ILoginPageChild> = () => {
	const { states, actions } = useGlobalContext();
	const { notificationGlobal, login_Auth } = actions as unknown as IActions;

	const [hookForm] = useFormHook<IFormLogin>(schema);

	const onSuccess = (data: ILogin) => {
		if (data?.token) {
			encodeData(data?.token, data?.refreshToken);
			setTimeout(() => {
				window.open(pageurl.OVERVIEW, '_self');
			}, 1000);
		}
	};

	const onFailure = () => {
		notificationGlobal('User login successful', false);
	};

	const onLogin = (data: IFormLogin) => {
		login_Auth({
			data: { username: data.username, password: data.password },
			onSuccess,
			onFailure,
		});
	};

	const error = states?._auth.login_AuthError;
	const load = states?._auth.userFacingLogin_AuthLoading;

	return (
		<div className='page-container'>
			<div className='image-section-container'>
				<div className='image-section' />
			</div>
			<div className='section-container'>
				<form
					onSubmit={hookForm.handleSubmit(onLogin)}
					className='login-form f-column-33'
				>
					<h3>Election Result Management System (Result Upload App)</h3>
					<Hvc
						view={!!error}
						removeDOM
					>
						<div className='status-section'>
							<p className='status-error-text'>{error}</p>
						</div>
					</Hvc>
					<FormBuilder
						formComponent={fc}
						hookForm={hookForm}
					/>
					<TypeButton
						title='Login'
						type='submit'
						load={load}
						className='w-100'
					/>
					<img
						className='logo-section'
						src={logo}
					/>
				</form>
			</div>
		</div>
	);
};

export default LoginPassPage;
