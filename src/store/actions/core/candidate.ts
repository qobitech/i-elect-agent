import { candidateType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Candidate = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		electionId: number;
		firstName: string;
		middleName: string;
		lastName: string;
		alias: string;
		partyId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Candidate',
			customurl: '',
			header: utils.header(),
			data,
		},
		actionType: candidateType.create_Candidate,
		onSuccess,
		onFailure,
	});

export const get_Candidate = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Candidate${getQuery(paged, ...(query || []))}`,
			customurl: '',
			header: utils.header(),
		},
		actionType: candidateType.get_Candidate,
		onSuccess,
		onFailure,
	});

export const get_CandidateByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Candidate/${id}`,
			header: utils.header(),
		},
		actionType: candidateType.get_CandidateByID,
		onSuccess,
		onFailure,
	});

export const get_CandidateByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/Candidate/name?name=${name}`,
			header: utils.header(),
		},
		actionType: candidateType.get_CandidateByName,
		onSuccess,
		onFailure,
	});

export const update_Candidate = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		electionId: number;
		firstName: string;
		middleName: string;
		lastName: string;
		alias: string;
		partyId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Candidate/update',
			header: utils.header(),
			data,
		},
		actionType: candidateType.update_Candidate,
		onSuccess,
		onFailure,
	});

export const delete_Candidate = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Candidate/delete/${id}`,
			header: utils.header(),
		},
		actionType: candidateType.delete_Candidate,
		onSuccess,
		onFailure,
	});
