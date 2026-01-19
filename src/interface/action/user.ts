import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface IUserAction {
	get_User: ({ query, onFailure, onSuccess }: IGetQuery) => (dispatch: any) => void;
	get_UserByEmail: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			email: string;
		};
	}) => (dispatch: any) => void;
	get_UserByPhoneNumber: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			phoneNumber: string;
		};
	}) => (dispatch: any) => void;
	get_UserRoles: ({
		email,
		onFailure,
		onSuccess,
	}: IResponse & {
		email: string;
	}) => (dispatch: any) => void;
	delete_User: ({
		email,
		onFailure,
		onSuccess,
	}: IResponse & {
		email: string;
	}) => (dispatch: any) => void;
	add_UserToRole: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			roleName: string[];
			userId: string;
		};
	}) => (dispatch: any) => void;
	remove_UserFromRole: ({
		userId,
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		userId: string;
		data: {
			roleName: string[];
		};
	}) => (dispatch: any) => void;
}
