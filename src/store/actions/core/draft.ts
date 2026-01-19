import { getUserData } from '../../../constants/global';
import { draftType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Draft = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		id: string;
		referenceId: string;
		token: string;
		userId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Draft',
			header: utils.header(),
			data,
		},
		actionType: draftType.create_Draft,
		onSuccess,
		onFailure,
	});

export interface IDraftDataResponse {
	id: string;
	referenceId: string;
	token: string;
	userId: number;
}
export interface IDraftData {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IDraftDataResponse[];
}

export const get_Draft = ({ onFailure, onSuccess, query, paged }: IGetQuery<IDraftData>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Draft${getQuery(paged, ...(query || []))}`,
			header: {
				...utils.header(),
				userId: getUserData()?.user?.UserId || '',
			},
		},
		actionType: draftType.get_Draft,
		onSuccess,
		onFailure,
	});

export const get_DraftByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Draft/${id}`,
			header: utils.header(),
		},
		actionType: draftType.get_DraftByID,
		onSuccess,
		onFailure,
	});

export const delete_Draft = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/Draft/${id}`,
			header: utils.header(),
		},
		actionType: draftType.delete_Draft,
		onSuccess,
		onFailure,
	});
