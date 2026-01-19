import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface IZoneAction {
	create_Zone: ({
		name,
		onFailure,
		onSuccess,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	get_Zone: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_ZoneById: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_ZoneByName: ({
		name,
		onFailure,
		onSuccess,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Zone: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			id: number;
			name: string;
		};
	}) => (dispatch: any) => void;
	delete_Zone: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
