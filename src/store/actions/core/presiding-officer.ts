import { presidingOfficerType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_PresidingOfficer = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		userId: number;
		poolingUnitId: number;
		electionId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PresidingOfficer',
			header: utils.header(),
			data,
		},
		actionType: presidingOfficerType.create_PresidingOfficer,
		onFailure,
		onSuccess,
	});

export const get_PresidingOfficer = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PresidingOfficer${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: presidingOfficerType.get_PresidingOfficer,
		onFailure,
		onSuccess,
	});

export const get_PresidingOfficerPollingUnit = ({
	onFailure,
	onSuccess,
	userId,
}: IResponse & {
	userId: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PresidingOfficer/PollingUnitDetails?userId=${userId}`,
			header: utils.header(),
		},
		actionType: presidingOfficerType.get_PresidingOfficerPollingUnit,
		onFailure,
		onSuccess,
	});

export const get_PresidingOfficerByID = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PresidingOfficer/${id}`,
			header: utils.header(),
		},
		actionType: presidingOfficerType.get_PresidingOfficerByID,
		onFailure,
		onSuccess,
	});

export const update_PresidingOfficer = ({
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
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PresidingOfficer/update',
			header: utils.header(),
			data,
		},
		actionType: presidingOfficerType.update_PresidingOfficer,
		onFailure,
		onSuccess,
	});

export const delete_PresidingOfficer = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PresidingOfficer/delete/${id}`,
			header: utils.header(),
		},
		actionType: presidingOfficerType.delete_PresidingOfficer,
		onFailure,
		onSuccess,
	});
