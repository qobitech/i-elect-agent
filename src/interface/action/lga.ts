import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IAllLGAS, ILGAByIDState, ILGAByName, ILGAInStates } from '../state/ILGAState';

export interface ILGAAction {
	create_LGA: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			name: string;
			lgaCode: string;
			stateId: number;
		};
	}) => (dispatch: any) => void;
	getAll_LGA: ({ onFailure, onSuccess, query, paged }: IGetQuery<IAllLGAS>) => (dispatch: any) => Promise<void>;
	get_LGAById: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<ILGAByIDState> & {
		id: string;
	}) => (dispatch: any) => void;
	get_LGAByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse<ILGAByName> & {
		name: string;
	}) => (dispatch: any) => void;
	get_LGAInState: ({
		onFailure,
		onSuccess,
		stateIds,
	}: IResponse<ILGAInStates> & {
		stateIds: number[];
	}) => (dispatch: any) => void;
	update_LGA: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			lgaCode: string;
			stateId: number;
		};
	}) => (dispatch: any) => void;
	delete_LGA: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_LGAByCode: ({
		onFailure,
		onSuccess,
		code,
	}: IResponse & {
		code: string;
	}) => (dispatch: any) => Promise<void>;
}
