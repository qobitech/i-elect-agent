import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IAllWards, IWardByCode, IWardByIDState, IWardInLGAStates } from '../state/IWardState';

export interface IWardAction {
	create_Ward: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			name: string;
			wardCode: string;
			lgaId: number;
		};
	}) => (dispatch: any) => void;
	get_Ward: ({ query, onFailure, onSuccess, paged }: IGetQuery<IAllWards>) => (dispatch: any) => Promise<void>;
	get_WardByID: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse<IWardByIDState> & {
		id: string;
	}) => (dispatch: any) => void;
	get_WardByCode: ({
		wardCode,
		onFailure,
		onSuccess,
	}: IResponse<IWardByCode> & {
		wardCode: string;
	}) => (dispatch: any) => void;
	get_WardInLGA: ({
		lgaIds,
		onFailure,
		onSuccess,
	}: IResponse<IWardInLGAStates> & {
		lgaIds: number[];
	}) => (dispatch: any) => void;
	update_Ward: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			wardCode: string;
			lgaId: number;
		};
	}) => (dispatch: any) => void;
	delete_Ward: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
