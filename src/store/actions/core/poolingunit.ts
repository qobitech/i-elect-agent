import type {
	IAllPollingUnits,
	IGetByPollingUnitCode,
	IPollingUnitByIDState,
	IPollingUnitInWardsStates,
} from '../../../interface/state/IPollingUnitState';
import { poolingUnitType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_PoolingUnit = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		poolingUnitCode: string;
		name: string;
		description: string;
		registeredVoters: number;
		wardId: number;
		latitude: string;
		longitude: string;
		location: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PoolingUnit',
			header: utils.header(),
			data,
		},
		actionType: poolingUnitType.create_PoolingUnit,
		onFailure,
		onSuccess,
	});

export const get_PoolingUnit = ({ onFailure, onSuccess, query, paged }: IGetQuery<IAllPollingUnits>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PoolingUnit${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: poolingUnitType.get_PoolingUnit,
		onFailure,
		onSuccess,
		auth: false,
	});

export const get_PoolingUnitByID = ({ onFailure, onSuccess, id }: IResponse<IPollingUnitByIDState> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/PoolingUnit/${id}`,
			header: utils.header(),
		},
		actionType: poolingUnitType.get_PoolingUnitByID,
		onFailure,
		onSuccess,
	});

export const get_PoolingUnitByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PoolingUnit/name',
			header: utils.header(),
			data: { name },
		},
		actionType: poolingUnitType.get_PoolingUnitByName,
		onFailure,
		onSuccess,
	});

export const get_PoolingUnitByCode = ({
	onFailure,
	onSuccess,
	poolingUnitCode,
}: IResponse<IGetByPollingUnitCode> & { poolingUnitCode: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PoolingUnit/code',
			header: utils.header(),
			data: { poolingUnitCode },
		},
		actionType: poolingUnitType.get_PoolingUnitByCode,
		onFailure,
		onSuccess,
	});

export const update_PoolingUnit = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		poolingUnitCode: string;
		name: string;
		description: string;
		wardId: number;
		latitude: string;
		longitude: string;
		location: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PoolingUnit/update',
			header: utils.header(),
			data,
		},
		actionType: poolingUnitType.update_PoolingUnit,
		onFailure,
		onSuccess,
	});

export const get_PoolingUnitPresidingOfficer = ({
	onFailure,
	onSuccess,
	poolingUnitID,
	presidingOfficerId,
}: IResponse & {
	presidingOfficerId: number;
	poolingUnitID: number;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/PoolingUnit/PresidingOfficer?presidingOfficerId=${presidingOfficerId}&poolingUnitID=${poolingUnitID}`,
			header: utils.header(),
		},
		actionType: poolingUnitType.get_PoolingUnitPresidingOfficer,
		onFailure,
		onSuccess,
	});

export const get_PoolingUnitInWard = ({
	onFailure,
	onSuccess,
	data,
}: IResponse<IPollingUnitInWardsStates> & {
	data: {
		wardIds: number[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/PoolingUnit/getPollingUnitsInWard',
			header: utils.header(),
			data,
		},
		actionType: poolingUnitType.get_PoolingUnitInWard,
		onFailure,
		onSuccess,
	});

export const delete_PoolingUnit = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/PoolingUnit/delete/${id}`,
			header: utils.header(),
		},
		actionType: poolingUnitType.delete_PoolingUnit,
		onFailure,
		onSuccess,
	});
