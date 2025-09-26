import './style.scss';

import React from 'react';

import LoginOTPPage from './login-otp';
import LoginPassPage from './login-pass';

const LoginPage = () => {
	const isOTP = true;
	return <div>{isOTP ? <LoginOTPPage /> : <LoginPassPage />}</div>;
};

export default LoginPage;
