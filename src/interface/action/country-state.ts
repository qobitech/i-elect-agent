import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { ICountryStateByID, ICountryStates } from '../state/ICountryState';

export interface ICountryStateAction {
	create_CountryState: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			name: string;
			stateCode: string;
			geographicalZoneId: number;
		};
	}) => (dispatch: any) => void;
	get_CountryState: ({ onFailure, onSuccess, query, paged }: IGetQuery<ICountryStates>) => (dispatch: any) => Promise<void>;
	getWardsIn_CountryState: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			stateIds: number[];
		};
	}) => (dispatch: any) => void;
	get_CountryStateByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<ICountryStateByID> & {
		id: string;
	}) => (dispatch: any) => void;
	get_CountryStateByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_CountryState: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			stateCode: string;
			geographicalZoneId: number;
		};
	}) => (dispatch: any) => void;
	delete_CountryState: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
