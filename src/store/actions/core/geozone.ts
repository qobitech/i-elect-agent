import { geozoneType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_GeographicalZone = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
		code: string;
		zoneId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/GeographicalZone',
			header: utils.header(),
			data,
		},
		actionType: geozoneType.create_GeographicalZone,
		onSuccess,
		onFailure,
	});

export const get_GeographicalZone = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/GeographicalZone${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: geozoneType.get_GeographicalZone,
		onSuccess,
		onFailure,
	});

export const get_GeographicalZoneByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/GeographicalZone/${id}`,
			header: utils.header(),
		},
		actionType: geozoneType.get_GeographicalZoneByID,
		onSuccess,
		onFailure,
	});

export const get_GeographicalZoneByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/GeographicalZone/name?name=${name}`,
			header: utils.header(),
		},
		actionType: geozoneType.get_GeographicalZoneByName,
		onSuccess,
		onFailure,
	});

export const update_GeographicalZone = ({
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
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/GeographicalZone/update',
			header: utils.header(),
			data,
		},
		actionType: geozoneType.update_GeographicalZone,
		onSuccess,
		onFailure,
	});

export const delete_GeographicalZone = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: number;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/GeographicalZone/delete/${id}`,
			header: utils.header(),
		},
		actionType: geozoneType.delete_GeographicalZone,
		onSuccess,
		onFailure,
	});
