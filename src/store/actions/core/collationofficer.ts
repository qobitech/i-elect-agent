import { collationOfficerType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_CollationOfficer = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: { userId: number; wardId: number };
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/CollationOfficer',
			header: utils.header(),
			data,
		},
		actionType: collationOfficerType.create_CollationOfficer,
		onFailure,
		onSuccess,
	});

export const get_CollationOfficer = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/CollationOfficer${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: collationOfficerType.get_CollationOfficer,
		onFailure,
		onSuccess,
	});

export const get_CollationOfficerByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/CollationOfficer/${id}`,
			header: utils.header(),
		},
		actionType: collationOfficerType.get_CollationOfficerByID,
		onFailure,
		onSuccess,
	});

export const update_CollationOfficer = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		userId: number;
		wardId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/CollationOfficer/update',
			header: utils.header(),
			data,
		},
		actionType: collationOfficerType.update_CollationOfficer,
		onFailure,
		onSuccess,
	});

export const delete_CollationOfficer = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: number;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/CollationOfficer/delete/${id}`,
			header: utils.header(),
		},
		actionType: collationOfficerType.delete_CollationOfficer,
		onFailure,
		onSuccess,
	});
