import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface IPresidingOfficerAction {
	create_PresidingOfficer: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			userId: number;
			poolingUnitId: number;
			electionId: number;
		};
	}) => (dispatch: any) => void;
	get_PresidingOfficer: ({ onFailure, onSuccess, query, paged }: IGetQuery) => (dispatch: any) => void;
	get_PresidingOfficerPollingUnit: ({
		onFailure,
		onSuccess,
		userId,
	}: IResponse & {
		userId: string;
	}) => (dispatch: any) => void;
	get_PresidingOfficerByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	update_PresidingOfficer: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			userId: number;
			poolingUnitId: number;
			electionId: number;
		};
	}) => (dispatch: any) => void;
	delete_PresidingOfficer: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
