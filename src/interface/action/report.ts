import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { IGetReportByID, IGetReportsStates } from '../state/IReport';

export interface IReportAction {
	create_Report: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			title: string;
			body: string;
		};
	}) => (dispatch: any) => Promise<void>;
	get_Report: ({ query, onFailure, onSuccess, paged }: IGetQuery<IGetReportsStates>) => (dispatch: any) => Promise<void>;
	get_ReportByID: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse<IGetReportByID> & {
		id: string;
	}) => (dispatch: any) => Promise<void>;
	get_ReportMarkedAsResolved: ({
		id,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
	}) => (dispatch: any) => Promise<void>;
	update_ReportByID: ({
		id,
		title,
		body,
		onFailure,
		onSuccess,
	}: IResponse & {
		id: string;
		title: string;
		body: string;
	}) => (dispatch: any) => Promise<void>;
}
