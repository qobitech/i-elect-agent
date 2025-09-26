import type {
	ICreateElection,
	ICreateElectionCycle,
	ICreateElectionOfficial,
	IGetQuery,
	IResponse,
} from '../../store/actions/core/election';
import type {
	ICreateElectionCycleState,
	ICreateElectionState,
	IElectionStates,
	IGetElectionByID,
	IGetElectionOfficial,
} from '../state/IElectionState';

export interface IElectionAction {
	create_Election: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<ICreateElectionState> & {
		data: ICreateElection;
	}) => (dispatch: any) => void;
	get_ElectionByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<IGetElectionByID> & {
		id: string;
	}) => (dispatch: any) => void;
	get_Elections: ({ onFailure, onSuccess, query }: IGetQuery<IElectionStates>) => (dispatch: any) => void;
	getCustom_ElectionData: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_ElectionName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	get_ElectionByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_Election: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			electionCycleId: number;
			constituencyId: number;
		};
	}) => (dispatch: any) => void;
	delete_Election: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	create_ElectionCycle: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<ICreateElectionCycleState> & {
		data: ICreateElectionCycle;
	}) => (dispatch: any) => void;
	get_ElectionCycle: ({ onFailure, onSuccess, query }: IGetQuery) => (dispatch: any) => void;
	get_ElectionCycleByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	get_ElectionCycleName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_ElectionCycle: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse & {
		data: {
			id: number;
			name: string;
			schedule: string;
		};
	}) => (dispatch: any) => void;
	delete_ElectionCycle: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
	// election type
	create_ElectionType: (
		p: IResponse<ICreateElectionState> & {
			data: {
				name: string;
			};
		}
	) => (dispatch: any) => void;
	get_ElectionType: (d: IGetQuery) => (dispatch: any) => void;
	get_ElectionTypeByID: (
		d: IResponse & {
			id: string;
		}
	) => (dispatch: any) => void;
	update_ElectionTypeByID: (
		d: IResponse & {
			id: string;
			name: string;
		}
	) => (dispatch: any) => void;
	delete_ElectionTypeByID: (
		d: IResponse & {
			id: string;
		}
	) => (dispatch: any) => void;
	create_ElectionOfficial: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: ICreateElectionOfficial;
	}) => (dispatch: any) => Promise<void>;
	get_ElectionOfficial: ({ onFailure, onSuccess }: IResponse<IGetElectionOfficial>) => (dispatch: any) => Promise<void>;
}
