import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IActionsForRoleStates, IActionStates as IAS, IRoleByActionStates } from '../state/IActionState';

export interface IActionStates {
	create_Action: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			name: string;
		};
	}) => (dispatch: any) => void;
	get_Action: ({ onFailure, onSuccess, query, paged }: IGetQuery<IAS>) => (dispatch: any) => void;
	get_ActionByID: ({
		onFailure,
		onSuccess,
		id,
	}: IGetQuery & {
		id: string;
	}) => (dispatch: any) => void;
	update_Action: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: {
			id: number;
			name: string;
		};
	}) => (dispatch: any) => void;
	delete_Action: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: {
			actionIds: number[];
		};
	}) => (dispatch: any) => void;
	unassign_ActionMultipleForRoles: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			roleId: number;
			actionIds: number[];
		};
	}) => (dispatch: any) => void;
	get_ActionsForRole: ({ onFailure, onSuccess, query, paged }: IGetQuery<IActionsForRoleStates>) => (dispatch: any) => void;
	get_ActionsForRoleByID: ({
		onFailure,
		onSuccess,
		id,
	}: IGetQuery<IRoleByActionStates> & {
		id: string;
	}) => (dispatch: any) => void;
	create_ActionRole: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			actionId: number;
			roleId: number;
		};
	}) => (dispatch: any) => void;
	get_ActionRole: ({ onFailure, onSuccess, query, paged }: IGetQuery) => (dispatch: any) => void;
	delete_ActionRole: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: {
			actionId: number;
			roleId: number;
		};
	}) => (dispatch: any) => void;
	assignMultipleRole_Action: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			actionId: number;
			roleIds: number[];
		};
	}) => (dispatch: any) => Promise<void>;
	unassignMultipleRole_Action: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			actionId: number;
			roleIds: number[];
		};
	}) => (dispatch: any) => Promise<void>;
}
