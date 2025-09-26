import { COREAPI } from '../../../constants/global';
import type { IConstituencyByIDState, IConstituencyStates } from '../../../interface/state/IConstituencyState';
import { constituencyType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Constituency = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
		code: string;
		alias: string;
		stateId: number;
		electiveCategoryId: number;
		isCouncilorship: boolean;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COREAPI}/api/v1/Constituency`,
			header: utils.header(),
			data,
		},
		actionType: constituencyType.create_Constituency,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyByStateID = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery<IConstituencyStates> & {
	data: {
		stateId: number;
		name: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Constituency/get-constituency-by-stateid',
			header: utils.header(),
			data,
		},
		actionType: constituencyType.get_ConstituencyByStateID,
		onSuccess,
		onFailure,
	});

export const get_Constituency = ({ onFailure, onSuccess, query, paged }: IGetQuery<IConstituencyStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Constituency${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: constituencyType.get_Constituency,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyByID = ({ onFailure, onSuccess, id }: IResponse<IConstituencyByIDState> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Constituency/${id}`,
			header: utils.header(),
		},
		actionType: constituencyType.get_ConstituencyByID,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Constituency/name',
			header: utils.header(),
			data: { name },
		},
		actionType: constituencyType.get_ConstituencyName,
		onSuccess,
		onFailure,
	});

export const update_Constituency = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		name: string;
		code: string;
		alias: string;
		stateId: number;
		electiveCategoryId: number;
		isCouncilorship: boolean;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Constituency/update',
			header: utils.header(),
			data,
		},
		actionType: constituencyType.update_Constituency,
		onSuccess,
		onFailure,
	});

export const delete_Constituency = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/Constituency/delete${id}`,
			header: utils.header(),
		},
		actionType: constituencyType.delete_Constituency,
		onSuccess,
		onFailure,
	});

// Constituency lga

export const create_ConstituencyLGA = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		constituencyId: number;
		lgaId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ConstituencyLga',
			header: utils.header(),
			data,
		},
		actionType: constituencyType.create_ConstituencyLGA,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyLGA = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ConstituencyLga${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: constituencyType.get_ConstituencyLGA,
		onSuccess,
		onFailure,
	});

export const getLGAIn_Constituency = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ConstituencyLga/getLgasInConstituency${getQuery(false, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: constituencyType.getLGAIn_Constituency,
		onSuccess,
		onFailure,
	});

// constituency ward

export const create_ConstituencyWard = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		constituencyId: number;
		wardId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ConstituencyWard',
			header: utils.header(),
			data,
		},
		actionType: constituencyType.create_ConstituencyWard,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyWard = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ConstituencyWard${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: constituencyType.get_ConstituencyWard,
		onSuccess,
		onFailure,
	});

export const get_ConstituencyWardByID = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/ConstituencyWard/GetConstituencyWardById${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: constituencyType.get_ConstituencyWardByID,
		onSuccess,
		onFailure,
	});

export const update_ConstituencyWard = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		constituencyId: number;
		wardId: number;
		newConstituencyId: number;
		newWardId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ConstituencyWard/update',
			header: utils.header(),
			data,
		},
		actionType: constituencyType.update_ConstituencyWard,
		onSuccess,
		onFailure,
	});

export const getWardsIn_Constituency = ({
	onFailure,
	onSuccess,
	Constituencyid,
}: IResponse & {
	Constituencyid: number;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ConstituencyWard/getWardsInConstituency?Constituencyid=${Constituencyid}`,
			header: utils.header(),
		},
		actionType: constituencyType.getWardsIn_Constituency,
		onSuccess,
		onFailure,
	});
