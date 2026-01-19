import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface ICandidateAction {
	create_Candidate: ({
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
	}) => (dispatch: any) => void;
	get_Candidate: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_CandidateByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_CandidateByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Candidate: ({
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
	}) => (dispatch: any) => void;
	delete_Candidate: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
