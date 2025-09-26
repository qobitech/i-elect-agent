import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type {
	IAllPollingUnits,
	IGetByPollingUnitCode,
	IPollingUnitByIDState,
	IPollingUnitInWardsStates,
} from '../state/IPollingUnitState';

export interface IPoolingUnitAction {
	create_PoolingUnit: ({
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
	}) => (dispatch: any) => void;
	get_PoolingUnit: ({ onFailure, onSuccess, query }: IGetQuery<IAllPollingUnits>) => (dispatch: any) => void;
	get_PoolingUnitByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<IPollingUnitByIDState> & {
		id: string;
	}) => (dispatch: any) => void;
	get_PoolingUnitByName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	get_PoolingUnitByCode: ({
		onFailure,
		onSuccess,
		poolingUnitCode,
	}: IResponse<IGetByPollingUnitCode> & {
		poolingUnitCode: string;
	}) => (dispatch: any) => void;
	update_PoolingUnit: ({
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
	}) => (dispatch: any) => void;
	get_PoolingUnitPresidingOfficer: ({
		onFailure,
		onSuccess,
		poolingUnitID,
		presidingOfficerId,
	}: IResponse & {
		presidingOfficerId: number;
		poolingUnitID: number;
	}) => (dispatch: any) => void;
	get_PoolingUnitInWard: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse<IPollingUnitInWardsStates> & {
		data: {
			wardIds: number[];
		};
	}) => (dispatch: any) => void;
	delete_PoolingUnit: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
