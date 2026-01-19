import type { IGetReportByID, IGetReportsStates } from '../../../interface/state/IReport';
import { reportType } from '../../types';
import * as utils from '../utils';
import { getQuery, type IGetQuery, type IResponse } from './election';

export const create_Report = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		title: string;
		body: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Report',
			header: utils.header(),
			data,
		},
		actionType: reportType.create_Report,
		onFailure,
		onSuccess,
	});

export const get_Report = ({ query, onFailure, onSuccess, paged }: IGetQuery<IGetReportsStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Report${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: reportType.get_Report,
		onFailure,
		onSuccess,
	});

export const get_ReportByID = ({ id, onFailure, onSuccess }: IResponse<IGetReportByID> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Report/${id}`,
			header: utils.header(),
		},
		actionType: reportType.get_ReportByID,
		onFailure,
		onSuccess,
	});

export const update_ReportByID = ({
	id,
	title,
	body,
	onFailure,
	onSuccess,
}: IResponse & { id: string; title: string; body: string }) =>
	utils.httpPutMethod({
		apiData: {
			url: `/api/v1/Report/${id}`,
			header: utils.header(),
			data: {
				title,
				body,
			},
		},
		actionType: reportType.update_ReportByID,
		onFailure,
		onSuccess,
	});

export const get_ReportMarkedAsResolved = ({
	id,
	onFailure,
	onSuccess,
}: IResponse & {
	id: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/Report/mark-as-resolved/${id}`,
			header: utils.header(),
		},
		actionType: reportType.get_ReportMarkedAsResolved,
		onFailure,
		onSuccess,
	});
