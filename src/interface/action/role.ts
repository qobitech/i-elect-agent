import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IRolesStates } from '../state/IRole';

export interface IRoleAction {
	get_Role: ({ onFailure, onSuccess, query }: IGetQuery<IRolesStates>) => (dispatch: any) => void;
	create_Role: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			roleName: string;
		};
	}) => (dispatch: any) => void;
	delete_Role: ({
		onFailure,
		onSuccess,
		roleName,
	}: IResponse & {
		roleName: string;
	}) => (dispatch: any) => void;
	getUserIn_Role: ({
		onFailure,
		onSuccess,
		role,
	}: IResponse & {
		role: string;
	}) => (dispatch: any) => void;
	get_RoleByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Role: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			roleName: string;
		};
	}) => (dispatch: any) => void;
	assignMultipleAction_Role: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			roleId: number;
			actionIds: number[];
		};
	}) => (dispatch: any) => Promise<void>;
	unassignMultipleAction_Role: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			roleId: number;
			actionIds: number[];
		};
	}) => (dispatch: any) => Promise<void>;
}
