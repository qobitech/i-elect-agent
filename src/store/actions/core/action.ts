import type { IActionsForRoleStates, IActionStates, IRoleByActionStates } from '../../../interface/state/IActionState';
import { actionType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Action = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Action',
			header: utils.header(),
			data,
		},
		actionType: actionType.create_Action,
		onSuccess,
		onFailure,
	});

export const get_Action = ({ onFailure, onSuccess, query, paged }: IGetQuery<IActionStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Action${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: actionType.get_Action,
		onSuccess,
		onFailure,
	});

export const get_ActionByID = ({ onFailure, onSuccess, id }: IGetQuery & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Action/${id}`,
			header: utils.header(),
		},
		actionType: actionType.get_ActionByID,
		onSuccess,
		onFailure,
	});

export const update_Action = ({ onFailure, onSuccess, data }: IGetQuery & { data: { id: number; name: string } }) =>
	utils.httpPutMethod({
		apiData: {
			url: '/api/v1/Action',
			header: utils.header(),
			data,
		},
		actionType: actionType.update_Action,
		onSuccess,
		onFailure,
	});

export const delete_Action = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & {
	data: {
		actionIds: number[];
	};
}) =>
	utils.httpDeleteMethod({
		apiData: {
			url: '/api/v1/Action',
			header: utils.header(),
			data,
		},
		actionType: actionType.delete_Action,
		onSuccess,
		onFailure,
	});

export const unassign_ActionMultipleForRoles = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		roleId: number;
		actionIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Action/UnassignMultipleActionsForRole',
			header: utils.header(),
			data,
		},
		actionType: actionType.unassign_ActionMultipleForRoles,
		onSuccess,
		onFailure,
	});

export const assignMultipleRole_Action = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		actionId: number;
		roleIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Action/assign-multiple-roles',
			header: utils.header(),
			data,
		},
		actionType: actionType.assignMultipleAction_Role,
		onFailure,
		onSuccess,
	});

export const unassignMultipleRole_Action = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		actionId: number;
		roleIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Action/unassign-multiple-roles',
			header: utils.header(),
			data,
		},
		actionType: actionType.unassignMultipleAction_Role,
		onFailure,
		onSuccess,
	});

export const get_ActionsForRole = ({ onFailure, onSuccess, query, paged }: IGetQuery<IActionsForRoleStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Action/getActionsForRole${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: actionType.get_ActionsForRole,
		onSuccess,
		onFailure,
	});

export const get_ActionsForRoleByID = ({ onFailure, onSuccess, id }: IGetQuery<IRoleByActionStates> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Action/getActionsForRole/${id}`,
			header: utils.header(),
		},
		actionType: actionType.get_ActionsForRoleByID,
		onSuccess,
		onFailure,
	});

// action role

export const create_ActionRole = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		actionId: number;
		roleId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ActionRole',
			header: utils.header(),
			data,
		},
		actionType: actionType.create_ActionRole,
		onSuccess,
		onFailure,
	});

export const get_ActionRole = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ActionRole${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: actionType.get_ActionRole,
		onSuccess,
		onFailure,
	});

export const delete_ActionRole = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & {
	data: {
		actionId: number;
		roleId: number;
	};
}) =>
	utils.httpDeleteMethod({
		apiData: {
			url: '/api/v1/ActionRole',
			header: utils.header(),
			data,
		},
		actionType: actionType.delete_ActionRole,
		onSuccess,
		onFailure,
	});
