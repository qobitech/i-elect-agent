import './style.scss';

import type React from 'react';
import * as yup from 'yup';

import logo from '../../../../assets/images/logo.png';
import { pageurl } from '../../../../constants/pageurl';
import { useGlobalContext } from '../../../../context/global';
import type { IActions } from '../../../../interface/IAction';
import type { IStates } from '../../../../interface/IReducer';
import { TypeButton } from '../../../utils/button';
import FormBuilder, { type IFormComponent } from '../../../utils/form-builder';
import { Hvc, useFormHook } from '../../../utils/hooks';

export interface ILogin {
	username: string;
}

const schema = {
	username: yup.string().required('Email is required'),
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
];

const LoginOTPPage: React.FC<ILoginPageChild> = () => {
	const { states, actions } = useGlobalContext();
	const { userFacingLogin_Auth, notificationGlobal } = actions as unknown as IActions;

	const [hookForm] = useFormHook<ILogin>(schema);

	const onSuccess = () => {
		notificationGlobal('User login successful', true);
		setTimeout(() => {
			window.open(`${pageurl.VERIFYOTP}?v=${hookForm.watch('username')}`, '_self');
		}, 500);
	};

	const onLogin = (data: ILogin) => {
		userFacingLogin_Auth({
			data: {
				email: data.username,
			},
			onSuccess,
		});
	};

	const error = states?._auth.login_AuthError;
	const load = states?._auth.userFacingLogin_AuthLoading;

	return (
		<div className='page-container'>
			{/* <div className="image-section-container">
        <div className="image-section" />
      </div> */}
			<div className='section-container text-center'>
				<form
					onSubmit={hookForm.handleSubmit(onLogin)}
					className='login-form f-column-33 w-100'
				>
					<img
						className='logo-section'
						src={logo}
					/>
					<h3>AGENT APP</h3>
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

					<div className='text-center'>
						<a
							href='/request-access'
							className='font-13'
						>
							Request Access
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginOTPPage;
