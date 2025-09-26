import { userType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const get_User = ({ query, onFailure, onSuccess, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/User${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: userType.get_User,
		onFailure,
		onSuccess,
	});

export const get_UserByEmail = ({ data, onFailure, onSuccess }: IResponse & { data: { email: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/User/GetUserByEmail',
			header: utils.header(),
			data,
		},
		actionType: userType.get_UserByEmail,
		onFailure,
		onSuccess,
	});

export const get_UserByPhoneNumber = ({ data, onFailure, onSuccess }: IResponse & { data: { phoneNumber: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/User/GetUserByPhoneNumber',
			header: utils.header(),
			data,
		},
		actionType: userType.get_UserByPhoneNumber,
		onFailure,
		onSuccess,
	});

export const get_UserRoles = ({ email, onFailure, onSuccess }: IResponse & { email: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/User/GetUserRoles?email=${email}`,
			header: utils.header(),
		},
		actionType: userType.get_UserRoles,
		onFailure,
		onSuccess,
	});

export const delete_User = ({ email, onFailure, onSuccess }: IResponse & { email: string }) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/User/Delete?email=${email}`,
			header: utils.header(),
		},
		actionType: userType.delete_User,
		onFailure,
		onSuccess,
	});

export const add_UserToRole = ({ data, onFailure, onSuccess }: IResponse & { data: { roleName: string[]; userId: string } }) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/User/AddUserToRole/${data.userId}`,
			header: utils.header(),
			data: { roleName: data.roleName },
		},
		actionType: userType.add_UserToRole,
		onFailure,
		onSuccess,
	});

export const remove_UserFromRole = ({
	userId,
	data,
	onFailure,
	onSuccess,
}: IResponse & { userId: string; data: { roleName: string[] } }) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/User/RemoveUserFromRole/${userId}`,
			header: utils.header(),
			data,
		},
		actionType: userType.remove_UserFromRole,
		onFailure,
		onSuccess,
	});
