import type { IGetQuery, IResponse } from '../../store/actions/core/election';
import type {
	IAddNotes,
	IAddNoteWardResult,
	IApproveDeleteRequest,
	IApproveWardResult,
	ICreateLGAResult,
	ICreatePUExcelResult,
	ICreatePUResult,
	ICreateStateResult,
	ICreateWardResult,
	IDeleteRequest,
	IDeleteWardResult,
	IFlag,
	IRrevDataReq,
} from '../../store/actions/query/irev';
import type {
	IIrevAnalyticsResponse,
	IIrevAnalyticsStatsRequestArg,
	IIrevElectionSubmissionResponse,
	IIRevResultState,
	IIRevResultStates,
	IUploadIrevState,
} from '../state/IRev';

export interface IIRevAction {
	push_IRevDataModel: (
		t: IResponse & {
			data: any;
		}
	) => (dispatch: any) => void;
	push_IRevWardDataModel: (
		t: IResponse<IIrevElectionSubmissionResponse> & {
			data: ICreateWardResult;
		}
	) => (dispatch: any) => void;
	get_IRevWardDataModel: (
		t: IGetQuery<IIRevResultStates> & {
			data?: IRrevDataReq;
		}
	) => (dispatch: any) => void;
	get_IRevStateDataModel: (
		t: IGetQuery & {
			data?: IRrevDataReq;
		}
	) => (dispatch: any) => void;
	get_IRevLGADataModel: (
		t: IGetQuery<IIRevResultStates> & {
			data?: IRrevDataReq;
		}
	) => (dispatch: any) => void;
	upload_IRevResult: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IUploadIrevState> & {
		data: any;
	}) => (dispatch: any) => void;
	push_IRevLGADataModel: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IIrevElectionSubmissionResponse> & {
		data: ICreateLGAResult;
	}) => (dispatch: any) => void;
	push_IRevStateDataModel: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IIrevElectionSubmissionResponse> & {
		data: ICreateStateResult;
	}) => (dispatch: any) => void;
	push_IRevPollingUnitDataModel: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse<IIrevElectionSubmissionResponse> & {
		data: ICreatePUResult;
	}) => (dispatch: any) => void;
	delete_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IDeleteWardResult;
	}) => (dispatch: any) => void;
	approve_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IApproveWardResult;
	}) => (dispatch: any) => void;
	addNotes_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IAddNoteWardResult;
	}) => (dispatch: any) => void;
	push_IRevPollingUnitDataExcelResult: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: ICreatePUExcelResult;
	}) => (dispatch: any) => Promise<void>;
	addNote_IRevPollingUnitDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IAddNotes;
	}) => (dispatch: any) => Promise<void>;
	addFlag_IRevPollingUnitDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IFlag;
	}) => (dispatch: any) => Promise<void>;
	addNote_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IAddNotes;
	}) => (dispatch: any) => Promise<void>;
	addFlag_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IFlag;
	}) => (dispatch: any) => Promise<void>;
	addNote_IRevLGADataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IAddNotes;
	}) => (dispatch: any) => Promise<void>;
	addFlag_IRevLGADataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IFlag;
	}) => (dispatch: any) => Promise<void>;
	addNote_IRevStateDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IAddNotes;
	}) => (dispatch: any) => Promise<void>;
	addFlag_IRevStateDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IFlag;
	}) => (dispatch: any) => Promise<void>;
	deleteRequest_IRevPollingUnitDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	approveDeleteRequest_IRevPollingUnitDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IApproveDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	deleteRequest_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	approveDeleteRequest_IRevWardDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IApproveDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	deleteRequest_IRevLGADataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	approveDeleteRequest_IRevLGADataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IApproveDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	deleteRequest_IRevStateDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	approveDeleteRequest_IRevStateDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery & {
		data: IApproveDeleteRequest;
	}) => (dispatch: any) => Promise<void>;
	get_IRevPollingUnitDataModel: ({
		onFailure,
		onSuccess,
		data,
	}: IGetQuery<IIRevResultStates> & {
		data?: IRrevDataReq;
	}) => (dispatch: any) => Promise<void>;
	get_IRevResultAnalyticsStats: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse<IIrevAnalyticsResponse> & {
		data: IIrevAnalyticsStatsRequestArg;
	}) => (dispatch: any) => Promise<void>;
	get_PollingUnitResultByRefId: ({
		onFailure,
		onSuccess,
		referenceId,
	}: IResponse<IIRevResultState> & {
		referenceId: string;
	}) => (dispatch: any) => Promise<void>;
	get_WardResultByRefId: ({
		onFailure,
		onSuccess,
		referenceId,
	}: IResponse<IIRevResultState> & {
		referenceId: string;
	}) => (dispatch: any) => Promise<void>;
	get_LgaResultByRefId: ({
		onFailure,
		onSuccess,
		referenceId,
	}: IResponse<IIRevResultState> & {
		referenceId: string;
	}) => (dispatch: any) => Promise<void>;
	get_StateResultByRefId: ({
		onFailure,
		onSuccess,
		referenceId,
	}: IResponse<IIRevResultState> & {
		referenceId: string;
	}) => (dispatch: any) => Promise<void>;
}
