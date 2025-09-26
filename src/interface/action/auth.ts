import type { IRegister, IUpdateUser } from '../../store/actions/core/auth';
import type { IResponse } from '../../store/actions/core/election';
import type { IActivityDataState, ILogin } from '../state/IAuthState';

export interface IAuthAction {
	login_Auth: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse<ILogin> & {
		data: {
			username: string;
			password: string;
		};
	}) => (dispatch: any) => void;
	userFacingLogin_Auth: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			email: string;
		};
	}) => (dispatch: any) => void;
	otpLogin_Auth: ({
		data,
		onSuccess,
		onFailure,
	}: IResponse<ILogin> & {
		data: {
			email: string;
			otp: string;
		};
	}) => (dispatch: any) => void;
	register_Auth: ({
		data,
		onSuccess,
		onFailure,
	}: IResponse & {
		data: IRegister;
	}) => (dispatch: any) => void;
	update_Auth: ({
		data,
		userId,
		onSuccess,
		onFailure,
	}: IResponse & {
		data: IUpdateUser;
		userId: string;
	}) => (dispatch: any) => void;
	changePassword_Auth: ({
		data,
		onSuccess,
		onFailure,
	}: IResponse & {
		data: {
			currentPassword: string;
			newPassword: string;
		};
	}) => (dispatch: any) => void;
	activityData_Auth: (t: IResponse<IActivityDataState>) => (dispatch: any) => void;
	logout_Auth: ({ onSuccess, onFailure }: IResponse) => (dispatch: any) => void;
}
