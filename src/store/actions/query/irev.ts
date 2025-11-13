import { COMMANDAPI, QUERYAPI } from '../../../constants/global';
import type {
	IIrevAnalyticsResponse,
	IIrevAnalyticsStatsRequestArg,
	IIrevElectionSubmissionResponse,
	IIRevResultStates,
	IUploadIrevState,
} from '../../../interface/state/IRev';
import { irevType } from '../../types';
import { getQuery, type IGetQuery, type IResponse } from '../core/election';
import * as utils from '../utils';

export interface IIrevDataModel {
	Upload: string;
	Data: {
		Id: string;
		Election: string;
		PoolingUnit: string;
		PoolingUnitCode: string;
		Location: {
			Address: string;
			Latitude: string;
			Longitude: string;
		};
		Ward: string;
		LocalGovernment: string;
		State: string;
		GeoZone: string;
		Zone: string;
		PresidingOfficer: {
			Id: string;
			Name: string;
		};
		VotersOnRegister: number;
		AccreditedVoters: number;
		BallotPapersIssuedToPoolingUnit: number;
		UnusedBallotPapers: number;
		RejectedBallot: number;
		TotalValidVotes: number;
		TotalUsedBallotPapers: number;
		Status: string;
		DocumentUrl: string;
		CreateAt: string;
		ApprovedBy: string;
		ApprovedAt: string;
		Results: [];
	};
}

export const push_IRevDataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: any;
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/IrevResult/push-result-data-model`,
			header: utils.headerMultipart(),
			data,
		},
		actionType: irevType.push_IRevDataModel,
		onFailure,
		onSuccess,
	});

export const upload_IRevResult = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IUploadIrevState> & {
	data: any;
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/Upload/result`,
			header: utils.headerMultipart(),
			data,
		},
		actionType: irevType.upload_IRevResult,
		onFailure,
		onSuccess,
	});

export interface IWardResultMap {
	pollingUnitId: number;
	pollingUnitName: string;
	pollingUnitCode: string;
	partyId: number;
	votes: number;
}

// ward
export interface ICreateWardResult {
	documentUrls: string[];
	election: {
		id: number;
		name: string;
	};
	resultSource: number;
	ward: {
		code: string;
		name: string;
	};
	localGovernment: {
		code: string;
		name: string;
	};
	state: {
		code: string;
		name: string;
	};
	geoZone: {
		code: string;
		name: string;
	};
	zone: {
		code: string;
		name: string;
	};
	presidingOfficer: {
		id: string;
		name: string;
	};
	votersOnRegister: number;
	accreditedVoters: number;
	ballotPapersIssuedToPoolingUnit: number;
	unusedBallotPapers: number;
	rejectedBallot: number;
	totalValidVotes: number;
	totalUsedBallotPapers: number;
	results: {
		partyId: number;
		partyName: string;
		votes: number;
	}[];
	createdBy: {
		id: number;
		name: string;
	};
	flags: string[];
	resultMap: IWardResultMap[];
}

export const push_IRevWardDataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IIrevElectionSubmissionResponse> & {
	data: ICreateWardResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/i-elect/WardResult/create-ward-result`,
			header: utils.header(),
			data,
		},
		actionType: irevType.push_IRevWardDataModel,
		onFailure,
		onSuccess,
	});

export interface IRrevDataReq {
	pageNumber?: number;
	pageSize?: number;
	sortBy?: string;
	elections?: string[];
	states?: string[];
	geoZones?: string[];
	pollingUnits?: string[];
	zones?: string[];
	localGovernments?: string[];
	wards?: string[];
	orderBy?: string;
	isDateFilterOn?: string;
	isBoolFilterOn?: string;
	minCreatedDate?: string;
	maxCreatedDate?: string;
	minUpdatedDate?: string;
	maxUpdatedDate?: string;
	minDeletedDate?: string;
	maxDeletedDate?: string;
}

export const get_IRevPollingUnitDataModel = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery<IIRevResultStates> & { data?: IRrevDataReq }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/PollingUnitResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevPollingUnitDataModel,
		onSuccess,
		onFailure,
	});

export const get_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery<IIRevResultStates> & { data?: IRrevDataReq }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/WardResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export interface IDeleteWardResult {
	id: string;
	deleteRequestedBy: {
		id: number;
		name: string;
	};
}

export const delete_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IDeleteWardResult }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/WardResult/delete-ward-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.delete_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export interface IApproveWardResult {
	id: string;
	approvedBy: {
		id: number;
		name: string;
	};
	isApproved: boolean;
}

export const approve_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IApproveWardResult }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/WardResult/approve-delete-ward-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.approve_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export interface IAddNoteWardResult {
	id: string;
	notes: {
		message: string;
		createdBy: {
			id: number;
			name: string;
		};
		// createdAt: string
	}[];
	appUser: {
		id: number;
		name: string;
	};
}

export const addNotes_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNoteWardResult }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/WardResult/add-notes`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addNotes_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export interface IAddFlagWardResult {
	id: string;
	flags: string[];
	appUser: {
		id: number;
		name: string;
	};
}
// state

export const get_IRevStateDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data?: IRrevDataReq }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/StateResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevStateDataModel,
		onSuccess,
		onFailure,
	});

export interface IStateResultMap {
	lgaId: number;
	partyId: number;
	votes: number;
}

export interface ICreateStateResult {
	documentUrls: string[];
	election: {
		id: number;
		name: string;
	};
	resultSource: number;
	localGovernment: {
		code: string;
		name: string;
	};
	state: {
		code: string;
		name: string;
	};
	geoZone: {
		code: string;
		name: string;
	};
	zone: {
		code: string;
		name: string;
	};
	presidingOfficer: {
		id: string;
		name: string;
	};
	votersOnRegister: number;
	accreditedVoters: number;
	ballotPapersIssuedToPoolingUnit: number;
	unusedBallotPapers: number;
	rejectedBallot: number;
	totalValidVotes: number;
	totalUsedBallotPapers: number;
	results: {
		partyId: number;
		partyName: string;
		votes: number;
	}[];
	createdBy: {
		id: number;
		name: string;
	};
	flags: string[];
	resultMap: IStateResultMap[];
}

export const push_IRevStateDataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IIrevElectionSubmissionResponse> & {
	data: ICreateStateResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/StateResult/create-state-result`,
			header: utils.header(),
			data,
		},
		actionType: irevType.push_IRevStateDataModel,
		onFailure,
		onSuccess,
	});

// lga

export interface IResult {
	partyId: number;
	partyName: string;
	votes: number;
}

export interface ILGAResultMap {
	wardId: number;
	partyId: number;
	votes: number;
}

export interface ICreateLGAResult {
	documentUrls: string[];
	election: {
		id: number;
		name: string;
	};
	localGovernment: {
		code: string;
		name: string;
	};
	state: {
		code: string;
		name: string;
	};
	geoZone: {
		code: string;
		name: string;
	};
	zone: {
		code: string;
		name: string;
	};
	presidingOfficer: {
		id: string;
		name: string;
	};
	resultSource: number;
	votersOnRegister: number;
	accreditedVoters: number;
	ballotPapersIssuedToPoolingUnit: number;
	unusedBallotPapers: number;
	rejectedBallot: number;
	totalValidVotes: number;
	totalUsedBallotPapers: number;
	results: IResult[];
	createdBy: {
		id: number;
		name: string;
	};
	resultMap: ILGAResultMap[];
}

export const push_IRevLGADataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IIrevElectionSubmissionResponse> & {
	data: ICreateLGAResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/LocalGovernmentResult/create-local_government-result`,
			header: utils.header(),
			data,
		},
		actionType: irevType.push_IRevLGADataModel,
		onFailure,
		onSuccess,
	});

export const get_IRevLGADataModel = ({ onFailure, onSuccess, data }: IGetQuery<IIRevResultStates> & { data?: IRrevDataReq }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/LocalGovernmentResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevLGADataModel,
		onSuccess,
		onFailure,
	});

// polling unit

export interface ICreatePUResult {
	documentUrls: string[];
	election: {
		id: number;
		name: string;
	};
	poolingUnitCode: string;
	poolingUnitName: string;
	poolingUnitId: number;
	presidingOfficer: {
		id: string;
		name: string;
	};
	resultSource: number;
	votersOnRegister: number;
	accreditedVoters: number;
	ballotPapersIssuedToPoolingUnit: number;
	unusedBallotPapers: number;
	rejectedBallot: number;
	totalValidVotes: number;
	totalUsedBallotPapers: number;
	results: {
		partyId: number;
		partyName: string;
		votes: number;
	}[];
	createdBy: {
		id: number;
		name: string;
	};
	flags: string[];
	// ward: {
	//   code: string
	//   name: string
	// }
	// localGovernment: {
	//   code: string
	//   name: string
	// }
	// state: {
	//   code: string
	//   name: string
	// }
	// geoZone: {
	//   code: string
	//   name: string
	// }
	// zone: {
	//   code: string
	//   name: string
	// }
}

export const push_IRevPollingUnitDataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IIrevElectionSubmissionResponse> & {
	data: ICreatePUResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/create-polling-unit-result`,
			header: utils.header(),
			data,
		},
		actionType: irevType.push_IRevPollingUnitDataModel,
		onFailure,
		onSuccess,
	});

export interface ICreatePUExcelResult {
	election: {
		id: number;
		name: string;
	};
	poolingUnitCode: string;
	documentUrl: string;
}

export const push_IRevPollingUnitDataExcelResult = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: ICreatePUExcelResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/create-polling-unit-result-from-excel`,
			header: utils.header(),
			data,
		},
		actionType: irevType.push_IRevPollingUnitDataExcelResult,
		onFailure,
		onSuccess,
	});

export interface IAddNotes {
	id: string;
	notes: [
		{
			message: string;
			createdBy: {
				id: number;
				name: string;
			};
			createdAt: string;
		},
	];
	appUser: {
		id: number;
		name: string;
	};
}

export interface IFlag {
	id: string;
	flags: string[];
	appUser: {
		id: number;
		name: string;
	};
}

export interface IDeleteRequest {
	id: string;
	deleteRequestedBy: {
		id: number;
		name: string;
	};
}

export interface IApproveDeleteRequest {
	id: string;
	approvedBy: {
		id: number;
		name: string;
	};
	isApproved: boolean;
}

export const addNote_IRevPollingUnitDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/add-notes`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addNote_IRevPollingUnitDataModel,
		onSuccess,
		onFailure,
	});

export const addFlag_IRevPollingUnitDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IFlag }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/add-flags`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addFlag_IRevPollingUnitDataModel,
		onSuccess,
		onFailure,
	});

export const deleteRequest_IRevPollingUnitDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/delete-pollingUnit-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.deleteRequest_IRevPollingUnitDataModel,
		onSuccess,
		onFailure,
	});

export const approveDeleteRequest_IRevPollingUnitDataModel = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & { data: IApproveDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/approve-delete-pollingUnit-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.approveDeleteRequest_IRevPollingUnitDataModel,
		onSuccess,
		onFailure,
	});

export const addNote_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/WardResult/add-notes`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addNote_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export const addFlag_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IFlag }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/WardResult/add-flags`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addFlag_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export const deleteRequest_IRevWardDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/delete-ward-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.deleteRequest_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export const approveDeleteRequest_IRevWardDataModel = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & { data: IApproveDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/PollingUnitResult/approve-delete-ward-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.approveDeleteRequest_IRevWardDataModel,
		onSuccess,
		onFailure,
	});

export const addNote_IRevLGADataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/add-notes`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addNote_IRevLGADataModel,
		onSuccess,
		onFailure,
	});

export const addFlag_IRevLGADataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IFlag }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/add-flags`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addFlag_IRevLGADataModel,
		onSuccess,
		onFailure,
	});

export const deleteRequest_IRevLGADataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/delete-local_government-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.deleteRequest_IRevLGADataModel,
		onSuccess,
		onFailure,
	});

export const approveDeleteRequest_IRevLGADataModel = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & { data: IApproveDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/approve-delete-local_government-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.approveDeleteRequest_IRevLGADataModel,
		onSuccess,
		onFailure,
	});

export const addNote_IRevStateDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/StateResult/add-notes`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addNote_IRevStateDataModel,
		onSuccess,
		onFailure,
	});

export const addFlag_IRevStateDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IFlag }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/StateResult/add-flags`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.addFlag_IRevStateDataModel,
		onSuccess,
		onFailure,
	});

export const deleteRequest_IRevStateDataModel = ({ onFailure, onSuccess, data }: IGetQuery & { data: IDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/delete-local_government-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.deleteRequest_IRevStateDataModel,
		onSuccess,
		onFailure,
	});

export const approveDeleteRequest_IRevStateDataModel = ({
	onFailure,
	onSuccess,
	data,
}: IGetQuery & { data: IApproveDeleteRequest }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${COMMANDAPI}/api/v1/i-elect/LocalGovernmentResult/approve-delete-local_government-result-request`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.approveDeleteRequest_IRevStateDataModel,
		onSuccess,
		onFailure,
	});

// result download request
export const get_IRevStateElectionDownloadRequest = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/StateResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevStateElectionDownloadRequest,
		onSuccess,
		onFailure,
	});

export const get_IRevLGAElectionDownloadRequest = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/LocalGovernmentResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevLGAElectionDownloadRequest,
		onSuccess,
		onFailure,
	});

export const get_IRevWardElectionDownloadRequest = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/WardResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevWardElectionDownloadRequest,
		onSuccess,
		onFailure,
	});

export const get_IRevPollingUnitElectionDownloadRequest = ({ onFailure, onSuccess, data }: IGetQuery & { data: IAddNotes }) =>
	utils.httpPostMethod({
		apiData: {
			customurl: `${QUERYAPI}/api/v1/i-elect/PollingUnitResult/get-all-multi-paged`,
			url: '',
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevPollingUnitElectionDownloadRequest,
		onSuccess,
		onFailure,
	});

export const get_IRevResultAnalyticsStats = ({
	onFailure,
	onSuccess,
	data,
}: IResponse<IIrevAnalyticsResponse> & { data: IIrevAnalyticsStatsRequestArg }) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/i-elect/Result/resultAnalytics`,
			header: utils.header(),
			data,
		},
		actionType: irevType.get_IRevResultAnalyticsStats,
		onSuccess,
		onFailure,
	});
