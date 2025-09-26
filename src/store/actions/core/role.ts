import type { IRolesStates } from '../../../interface/state/IRole';
import { roleType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const get_Role = ({ onFailure, onSuccess, query, paged }: IGetQuery<IRolesStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Role${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: roleType.get_Role,
		onFailure,
		onSuccess,
	});

export const create_Role = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		roleName: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Role',
			header: utils.header(),
			data,
		},
		actionType: roleType.create_Role,
		onFailure,
		onSuccess,
	});

export const assignMultipleAction_Role = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		roleId: number;
		actionIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Role/assign-multiple-actions',
			header: utils.header(),
			data,
		},
		actionType: roleType.assignMultipleAction_Role,
		onFailure,
		onSuccess,
	});

export const unassignMultipleAction_Role = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		roleId: number;
		actionIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Role/unassign-multiple-actions',
			header: utils.header(),
			data,
		},
		actionType: roleType.unassignMultipleAction_Role,
		onFailure,
		onSuccess,
	});

export const delete_Role = ({
	onFailure,
	onSuccess,
	roleName,
}: IResponse & {
	roleName: string;
}) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/Role?roleName=${roleName}`,
			header: utils.header(),
		},
		actionType: roleType.delete_Role,
		onFailure,
		onSuccess,
	});

export const getUserIn_Role = ({
	onFailure,
	onSuccess,
	role,
}: IResponse & {
	role: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Role/GetUsersInRole?role=${role}`,
			header: utils.header(),
		},
		actionType: roleType.getUserIn_Role,
		onFailure,
		onSuccess,
	});

export const get_RoleByName = ({
	onFailure,
	onSuccess,
	name,
}: IResponse & {
	name: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Role/Name?Name=${name}`,
			header: utils.header(),
		},
		actionType: roleType.get_RoleByName,
		onFailure,
		onSuccess,
	});

export const update_Role = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		roleName: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Role/update',
			header: utils.header(),
			data,
		},
		actionType: roleType.update_Role,
		onFailure,
		onSuccess,
	});
