import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IElectiveCategoryByIDStates } from '../state/IElectiveCategory';

export interface IElectiveCategoryAction {
	create_ElectiveCategory: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			name: string;
		};
	}) => (dispatch: any) => void;
	get_ElectiveCategory: ({ onFailure, onSuccess, query }: IResponse & IGetQuery) => (dispatch: any) => void;
	get_ElectiveCategoryByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse<IElectiveCategoryByIDStates> & {
		id?: string;
	}) => (dispatch: any) => void;
	get_ElectiveCategoryName: ({
		onFailure,
		onSuccess,
		name,
	}: IResponse & {
		name: string;
	}) => (dispatch: any) => void;
	update_ElectiveCategory: ({
		onFailure,
		onSuccess,
		name,
		id,
	}: IResponse & {
		id: string;
		name: string;
	}) => (dispatch: any) => void;
	delete_ElectiveCategory: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => void;
}
