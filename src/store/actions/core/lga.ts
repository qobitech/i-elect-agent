import type { IAllLGAS, ILGAByIDState, ILGAByName, ILGAInStates } from '../../../interface/state/ILGAState';
import { lgaType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_LGA = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: { name: string; lgaCode: string; stateId: number };
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/LGA',
			header: utils.header(),
			data,
		},
		actionType: lgaType.create_LGA,
		onFailure,
		onSuccess,
	});

export const getAll_LGA = ({ onFailure, onSuccess, query, paged }: IGetQuery<IAllLGAS>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/LGA${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: lgaType.getAll_LGA,
		onFailure,
		onSuccess,
		auth: false,
	});

export const get_LGAById = ({ onFailure, onSuccess, id }: IResponse<ILGAByIDState> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/LGA/${id}`,
			header: utils.header(),
		},
		actionType: lgaType.get_LGAById,
		onFailure,
		onSuccess,
	});

export const get_LGAByName = ({
	onFailure,
	onSuccess,
	name,
}: IResponse<ILGAByName> & {
	name: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/LGA/name',
			header: utils.header(),
			data: { name },
		},
		actionType: lgaType.get_LGAByName,
		onFailure,
		onSuccess,
	});

export const get_LGAByCode = ({
	onFailure,
	onSuccess,
	code,
}: IResponse & {
	code: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/LGA/code',
			header: utils.header(),
			data: { code },
		},
		actionType: lgaType.get_LGAByCode,
		onFailure,
		onSuccess,
	});

export const get_LGAInState = ({
	onFailure,
	onSuccess,
	stateIds,
}: IResponse<ILGAInStates> & {
	stateIds: number[];
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/LGA/getLgasInState',
			header: utils.header(),
			data: { stateIds },
		},
		actionType: lgaType.get_LGAInState,
		onFailure,
		onSuccess,
	});

export const update_LGA = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		name: string;
		lgaCode: string;
		stateId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/LGA/update',
			header: utils.header(),
			data,
		},
		actionType: lgaType.update_LGA,
		onFailure,
		onSuccess,
	});

export const delete_LGA = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/LGA/delete/${id}`,
			header: utils.header(),
		},
		actionType: lgaType.delete_LGA,
		onFailure,
		onSuccess,
	});
