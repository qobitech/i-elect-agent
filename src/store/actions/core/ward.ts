import type { IAllWards, IWardByCode, IWardByIDState, IWardInLGAStates } from '../../../interface/state/IWardState';
import { wardType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Ward = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
		wardCode: string;
		lgaId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Ward',
			header: utils.header(),
			data,
		},
		actionType: wardType.create_Ward,
		onFailure,
		onSuccess,
	});

export const get_Ward = ({ query, onFailure, onSuccess, paged }: IGetQuery<IAllWards>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Ward${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: wardType.get_Ward,
		onFailure,
		onSuccess,
		auth: false,
	});

export const get_WardByID = ({ id, onFailure, onSuccess }: IResponse<IWardByIDState> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Ward/${id}`,
			header: utils.header(),
		},
		actionType: wardType.get_WardByID,
		onFailure,
		onSuccess,
	});

export const get_WardByCode = ({
	wardCode,
	onFailure,
	onSuccess,
}: IResponse<IWardByCode> & {
	wardCode: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Ward/code',
			header: utils.header(),
			data: { wardCode },
		},
		actionType: wardType.get_WardByCode,
		onFailure,
		onSuccess,
	});

export const get_WardInLGA = ({
	lgaIds,
	onFailure,
	onSuccess,
}: IResponse<IWardInLGAStates> & {
	lgaIds: number[];
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Ward/getWardsInLga',
			header: utils.header(),
			data: { lgaIds },
		},
		actionType: wardType.get_WardInLGA,
		onFailure,
		onSuccess,
	});

export const update_Ward = ({
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
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Ward/update',
			header: utils.header(),
			data,
		},
		actionType: wardType.update_Ward,
		onFailure,
		onSuccess,
	});

export const delete_Ward = ({
	id,
	onFailure,
	onSuccess,
}: IResponse & {
	id: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Ward/delete/${id}`,
			header: utils.header(),
		},
		actionType: wardType.delete_Ward,
		onFailure,
		onSuccess,
	});
