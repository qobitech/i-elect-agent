import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface IGeoZoneAction {
	create_GeographicalZone: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			name: string;
			code: string;
			zoneId: number;
		};
	}) => (dispatch: any) => void;
	get_GeographicalZone: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_GeographicalZoneByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_GeographicalZoneByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_GeographicalZone: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			code: string;
			zoneId: number;
		};
	}) => (dispatch: any) => void;
	delete_GeographicalZone: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: number;
	}) => (dispatch: any) => void;
}
