import { zoneType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Zone = ({ name, onFailure, onSuccess }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Zone',
			header: utils.header(),
			data: { name },
		},
		actionType: zoneType.create_Zone,
		onFailure,
		onSuccess,
	});

export const get_Zone = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Zone${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: zoneType.get_Zone,
		onSuccess,
		onFailure,
	});

export const get_ZoneById = ({ id, onFailure, onSuccess }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Zone/${id}`,
			header: utils.header(),
		},
		actionType: zoneType.get_ZoneById,
		onFailure,
		onSuccess,
	});

export const get_ZoneByName = ({ name, onFailure, onSuccess }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Zone/name',
			header: utils.header(),
			data: { name },
		},
		actionType: zoneType.get_ZoneByName,
		onFailure,
		onSuccess,
	});

export const update_Zone = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		id: number;
		name: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Zone/update',
			header: utils.header(),
			data,
		},
		actionType: zoneType.update_Zone,
		onFailure,
		onSuccess,
	});

export const delete_Zone = ({ id, onFailure, onSuccess }: IResponse & { id: string }) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/Zone/delete${id}`,
			header: utils.header(),
		},
		actionType: zoneType.delete_Zone,
		onFailure,
		onSuccess,
	});
