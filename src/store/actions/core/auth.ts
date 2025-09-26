import { onLogout } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import type { IActivityDataState, ILogin } from '../../../interface/state/IAuthState';
import { authType } from '../../types';
import * as utils from '../utils';
import type { IResponse } from './election';

export const login_Auth = ({
	onFailure,
	onSuccess,
	data,
}: IResponse<ILogin> & { data: { username: string; password: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/login',
			header: utils.header(),
			data,
		},
		actionType: authType.login_Auth,
		onSuccess: (res: ILogin) => {
			onSuccess?.(res);
			localStorage.setItem('userData', JSON.stringify(res));
			setTimeout(() => {
				window.open(pageurl.OVERVIEW, '_self');
			}, 1000);
		},
		onFailure,
		auth: true,
	});

export const userFacingLogin_Auth = ({ data, onFailure, onSuccess }: IResponse & { data: { email: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/adminlogin',
			header: utils.header(),
			data,
		},
		actionType: authType.userFacingLogin_Auth,
		onSuccess: () => {
			onSuccess?.(undefined);
		},
		onFailure,
		auth: true,
	});

export const otpLogin_Auth = ({ data, onSuccess, onFailure }: IResponse<ILogin> & { data: { email: string; otp: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/loginwithotp',
			header: utils.header(),
			data,
		},
		actionType: authType.otpLogin_Auth,
		onSuccess: (res: ILogin) => {
			onSuccess?.(res);
		},
		onFailure,
		auth: true,
	});

export interface IRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	role: string[];
}

export const register_Auth = ({ data, onSuccess, onFailure }: IResponse & { data: IRegister }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/register',
			header: utils.header(),
			data,
		},
		actionType: authType.register_Auth,
		onSuccess,
		onFailure,
		auth: true,
	});

export interface IUpdateUser {
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
}

export const update_Auth = ({
	data,
	userId,
	onSuccess,
	onFailure,
}: IResponse & {
	data: IUpdateUser;
	userId: string;
}) =>
	utils.httpPutMethod({
		apiData: {
			url: `/api/v1/User/update/${userId}`,
			header: utils.header(),
			data,
		},
		actionType: authType.update_Auth,
		onSuccess,
		onFailure,
		auth: true,
	});

export const changePassword_Auth = ({
	data,
	onSuccess,
	onFailure,
}: IResponse & {
	data: {
		currentPassword: string;
		newPassword: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/changepassword',
			header: utils.header(),
			data,
		},
		actionType: authType.changePassword_Auth,
		onSuccess,
		onFailure,
		auth: true,
	});

export const logout_Auth = ({ onSuccess, onFailure }: IResponse) =>
	utils.httpGetMethod({
		apiData: {
			url: '/api/v1/Auth/logout',
			header: utils.header(),
		},
		actionType: authType.logout_Auth,
		onSuccess: () => {
			onLogout();
			window.open(pageurl.LOGIN, '_self');
		},
		onFailure: () => {
			onLogout();
			window.open(pageurl.LOGIN, '_self');
		},
		auth: true,
	});

export const activityData_Auth = ({ onSuccess, onFailure }: IResponse<IActivityDataState>) =>
	utils.httpGetMethod({
		apiData: {
			url: '/api/v1/Auth/activitydata',
			header: utils.header(),
		},
		actionType: authType.activityData_Auth,
		onSuccess,
		onFailure,
		auth: true,
	});
