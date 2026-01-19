import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface ICollationOfficerAction {
	create_CollationOfficer: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			userId: number;
			wardId: number;
		};
	}) => (dispatch: any) => void;
	get_CollationOfficer: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_CollationOfficerByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	update_CollationOfficer: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			userId: number;
			wardId: number;
		};
	}) => (dispatch: any) => void;
	delete_CollationOfficer: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: number;
	}) => (dispatch: any) => void;
}
