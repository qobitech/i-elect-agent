import type { ICountryStateByID, ICountryStates } from '../../../interface/state/ICountryState';
import { countryStateType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_CountryState = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
		stateCode: string;
		geographicalZoneId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/State',
			header: utils.header(),
			data,
		},
		actionType: countryStateType.create_CountryState,
		onFailure,
		onSuccess,
	});

export const get_CountryState = ({ onFailure, onSuccess, query, paged }: IGetQuery<ICountryStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/State${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: countryStateType.get_CountryState,
		onFailure,
		onSuccess,
		auth: false,
	});

export const getWardsIn_CountryState = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		stateIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/State/getWardsInState',
			header: utils.header(),
			data,
		},
		actionType: countryStateType.getWardsIn_CountryState,
		onFailure,
		onSuccess,
	});

export const get_CountryStateByID = ({ onFailure, onSuccess, id }: IResponse<ICountryStateByID> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/State/${id}`,
			header: utils.header(),
		},
		actionType: countryStateType.get_CountryStateByID,
		onFailure,
		onSuccess,
	});

export const get_CountryStateByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/State/name',
			header: utils.header(),
			data: { name },
		},
		actionType: countryStateType.get_CountryStateByName,
		onFailure,
		onSuccess,
	});

export const update_CountryState = ({
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
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/State/update',
			header: utils.header(),
			data,
		},
		actionType: countryStateType.update_CountryState,
		onFailure,
		onSuccess,
	});

export const delete_CountryState = ({ id, onFailure, onSuccess }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/State/delete${id}`,
			header: utils.header(),
		},
		actionType: countryStateType.delete_CountryState,
		onFailure,
		onSuccess,
	});
