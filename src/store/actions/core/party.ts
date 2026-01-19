import type { IPartyStates } from '../../../interface/state/IParty';
import { partyType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export interface ICreateParty {
	// id: number
	shortName: string;
	longName: string;
	description: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	email: string;
	// logo: string
	// followerCount: number
	// followingCount: number
	// likesCount: number
	founded: string;
	// isActive: boolean
	slogan: string;
}

export const create_Party = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: ICreateParty;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Party',
			header: utils.header(),
			data,
		},
		actionType: partyType.create_Party,
		onFailure,
		onSuccess,
	});

export const get_Party = ({ onFailure, onSuccess, query, paged }: IGetQuery<IPartyStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Party${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: partyType.get_Party,
		onFailure,
		onSuccess,
	});

export const get_PartyByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Party/${id}`,
			header: utils.header(),
		},
		actionType: partyType.get_PartyByID,
		onFailure,
		onSuccess,
	});

export const get_PartyByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Party/name',
			header: utils.header(),
			data: { name },
		},
		actionType: partyType.get_PartyByName,
		onFailure,
		onSuccess,
	});

export const update_Party = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		shortName: string;
		longName: string;
		description: string;
		phone: string;
		address: string;
		city: string;
		state: string;
		email: string;
		logo: string;
		followerCount: number;
		followingCount: number;
		likesCount: number;
		founded: string;
		isActive: boolean;
		slogan: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Party/update',
			header: utils.header(),
			data,
		},
		actionType: partyType.update_Party,
		onFailure,
		onSuccess,
	});

export const delete_Party = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: number;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/Party/delete/${id}`,
			header: utils.header(),
		},
		actionType: partyType.delete_Party,
		onFailure,
		onSuccess,
	});
