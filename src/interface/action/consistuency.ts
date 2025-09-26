import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IConstituencyByIDState, IConstituencyStates } from '../state/IConstituencyState';

export interface IConsistuencyAction {
	create_Constituency: ({
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
	}) => (dispatch: any) => void;
	get_Constituency: ({ onFailure, onSuccess, query }: IGetQuery<IConstituencyStates>) => (dispatch: any) => void;
	get_ConstituencyByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<IConstituencyByIDState> & {
		id: string;
	}) => (dispatch: any) => void;
	get_ConstituencyName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Constituency: ({
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
	}) => (dispatch: any) => void;
	delete_Constituency: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	create_ConstituencyLGA: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			constituencyId: number;
			lgaId: number;
		};
	}) => (dispatch: any) => void;
	get_ConstituencyLGA: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	getLGAIn_Constituency: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	create_ConstituencyWard: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			constituencyId: number;
			wardId: number;
		};
	}) => (dispatch: any) => void;
	get_ConstituencyWard: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_ConstituencyWardByID: (t: IGetQuery) => (dispatch: any) => void;
	update_ConstituencyWard: ({
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
	}) => (dispatch: any) => void;
	getWardsIn_Constituency: ({
		onFailure,
		onSuccess,
		Constituencyid,
	}: IResponse & {
		Constituencyid: number;
	}) => (dispatch: any) => void;
	get_ConstituencyByStateID: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery<IConstituencyStates> & {
		data: {
			stateId: number;
			name: string;
		};
	}) => (dispatch: any) => void;
}
