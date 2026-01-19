import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { ICreateParty } from '../../store/actions/core/party';
import type { IPartyStates } from '../state/IParty';

export interface IPartyAction {
	create_Party: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: ICreateParty;
	}) => (dispatch: any) => void;
	get_Party: ({ onFailure, onSuccess, query }: IGetQuery<IPartyStates>) => (dispatch: any) => void;
	get_PartyByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_PartyByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Party: ({
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
	}) => (dispatch: any) => void;
	delete_Party: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: number;
	}) => (dispatch: any) => void;
}
