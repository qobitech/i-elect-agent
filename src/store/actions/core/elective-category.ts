import type { IElectiveCategoryByIDStates } from '../../../interface/state/IElectiveCategory';
import { electiveCategoryType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_ElectiveCategory = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		name: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectiveCategory',
			header: utils.header(),
			data,
		},
		actionType: electiveCategoryType.create_ElectiveCategory,
		onSuccess,
		onFailure,
	});

export const get_ElectiveCategory = ({ onFailure, onSuccess, query, paged }: IResponse & IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectiveCategory${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electiveCategoryType.get_ElectiveCategory,
		onSuccess,
		onFailure,
	});

export const get_ElectiveCategoryByID = ({
	onFailure,
	onSuccess,
	id,
}: IResponse<IElectiveCategoryByIDStates> & { id?: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectiveCategory/${id || ''}`,
			header: utils.header(),
		},
		actionType: electiveCategoryType.get_ElectiveCategoryByID,
		onSuccess,
		onFailure,
	});

export const get_ElectiveCategoryName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectiveCategory/name',
			header: utils.header(),
			data: { name },
		},
		actionType: electiveCategoryType.get_ElectiveCategoryName,
		onSuccess,
		onFailure,
	});

export const update_ElectiveCategory = ({ onFailure, onSuccess, name, id }: IResponse & { id: string; name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectiveCategory/update',
			header: utils.header(),
			data: { id, name },
		},
		actionType: electiveCategoryType.update_ElectiveCategory,
		onSuccess,
		onFailure,
	});

export const delete_ElectiveCategory = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/ElectiveCategory/delete/${id}`,
			header: utils.header(),
		},
		actionType: electiveCategoryType.delete_ElectiveCategory,
		onSuccess,
		onFailure,
	});
