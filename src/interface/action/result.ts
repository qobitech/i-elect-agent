import { type IUploadFileResponse } from '@interface/state/IResultState';

import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type { ICreateResult, IExtractResult, IResultDataModel, IUpdateResultData } from '../../store/actions/query/result';

export interface IResultAction {
	create_Result: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: ICreateResult;
	}) => (dispatch: any) => void;
	get_Result: ({ onFailure, onSuccess, query, paged }: IGetQuery) => (dispatch: any) => void;
	upload_Result: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IUploadFileResponse> & {
		data: FormData;
	}) => (dispatch: any) => Promise<void>;
	push_ResultData: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			upload: FormData;
			organization?: {
				id: number;
				name?: string;
			};
		};
	}) => (dispatch: any) => void;
	push_ResultDataModel: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: IResultDataModel;
	}) => (dispatch: any) => void;
	seed_Results: ({ onFailure, onSuccess }: IResponse) => (dispatch: any) => void;
	update_ResultStatus: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			id: string;
			status: string;
			comment: string;
		};
	}) => (dispatch: any) => void;
	update_ResultData: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: IUpdateResultData;
	}) => (dispatch: any) => void;
	extract_ResultFile: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IExtractResult> & {
		data: any;
	}) => (dispatch: any) => Promise<void>;
	extract_ResultUrl: ({
		url,
		onFailure,
		onSuccess,
	}: IResponse<IExtractResult> & {
		url: string;
	}) => (dispatch: any) => Promise<void>;
}
