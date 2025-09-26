import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import * as yup from 'yup';

import { encodeData } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import { useGlobalContext } from '../../../context/global';
import type { IActions } from '../../../interface/IAction';
import type { ILogin, IUserState } from '../../../interface/state/IAuthState';
import { TypeButton } from '../../utils/button';
import FormBuilder, { type IFormComponent } from '../../utils/form-builder';
import { useFormHook, useQueryValuesHook } from '../../utils/hooks';
import { useCountDown } from '../../utils/timer';

const formComponents: IFormComponent[] = [
	{
		component: 'otp',
		id: 'code',
		label: 'OTP',
	},
];

interface IFH {
	code: string;
}

const schema = {
	code: yup.string().required('Code is required'),
};

const VerifyOTP = () => {
	const { states, actions } = useGlobalContext();

	const { otpLogin_Auth, notificationGlobal } = actions!;
	// const { notificationGlobal } = props as unknown as IActions
	const navigate = useNavigate();

	const { v } = useQueryValuesHook();

	if (!v) {
		navigate(pageurl.LOGIN);
	}

	const [hookForm] = useFormHook<IFH>(schema);
	const countdown = useCountDown(600);
	const isExpired = countdown === '00:00:00';

	const onSuccess = (data: ILogin) => {
		if (data?.token) {
			const user: IUserState = jwtDecode(data.token);
			if (user.role.includes('Result Uploader')) {
				notificationGlobal('OTP Verification Successful', true);
				encodeData(data?.token, data?.refreshToken);
				setTimeout(() => {
					window.open(pageurl.OVERVIEW, '_self');
				}, 1000);
			} else {
				notificationGlobal('You do not have access to the agent app.', false);
				navigate(pageurl.LOGIN);
			}
		}
	};

	const onFailure = (data: any) => {
		notificationGlobal('Something went wrong', false);
	};

	const onVerifyOTP = ({ code }: IFH) => {
		otpLogin_Auth({ data: { email: v || '', otp: code }, onSuccess, onFailure });
	};

	useEffect(() => {
		const code = hookForm.watch('code');
		if (code?.length === 4) {
			onVerifyOTP({ code });
		}
	}, [hookForm.watch('code')]);

	const notPhoneNumber = () => {
		navigate(pageurl.LOGIN);
	};
	const onResendOTP = () => {
		onVerifyOTP(hookForm.watch());
	};

	return (
		<div className='container'>
			<div className='card-form public'>
				<form
					onSubmit={hookForm.handleSubmit(onVerifyOTP)}
					className='page-form-container'
				>
					<div className='f-column-28 text-center pb-5'>
						<h4>Verify OTP</h4>
						<div className='f-column-20 align-items-center justify-content-center text-center'>
							<p className='text-small m-0'>Verify the OTP sent to {v}</p>
							<p
								className='m-0 text-little cursor-pointer text-decoration-underline'
								onClick={notPhoneNumber}
							>
								<b>Not my email?</b>
							</p>
						</div>
						{isExpired ? (
							<p
								className='m-0 text-tiny color-label text-decoration-underline cursor-pointer'
								onClick={onResendOTP}
							>
								Resend OTP
							</p>
						) : (
							<p className='m-0 text-tiny color-label'>
								Resend OTP in: <span className='color-danger'>{countdown}</span>
							</p>
						)}
					</div>
					<div className='f-column-33'>
						<FormBuilder
							formComponent={formComponents}
							hookForm={hookForm}
						/>
						<TypeButton
							title='Verify OTP'
							type='submit'
							className='w-100'
							load={states?._auth?.otpLogin_AuthLoading}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VerifyOTP;
