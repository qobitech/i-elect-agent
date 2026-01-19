import type { IDraftData } from '../../store/actions/core/draft';
import type { IGetQuery, IResponse } from '../../store/actions/core/election';

export interface IDraftAction {
	create_Draft: ({
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
	}) => (dispatch: any) => Promise<void>;
	get_DraftByID: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => Promise<void>;
	delete_Draft: ({
		onFailure,
		onSuccess,
		id,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => Promise<void>;
	get_Draft: ({ onFailure, onSuccess, query, paged }: IGetQuery<IDraftData>) => (dispatch: any) => Promise<void>;
}
