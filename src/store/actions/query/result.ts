import { type IUploadFileResponse } from '@interface/state/IResultState';

import { EXTRACTAPI, QUERYAPI } from '../../../constants/global';
import { resultType } from '../../types';
import { getCommandQuery, type IGetQuery, type IResponse } from '../core/election';
import * as utils from '../utils';

export interface ICreateResult {
	id: string;
	election: string;
	poolingUnit: string;
	poolingUnitCode: string;
	location: {
		address: string;
		latitude: string;
		longitude: string;
	};
	ward: string;
	localGovernment: string;
	state: string;
	geoZone: string;
	zone: string;
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
	status: string;
	documentUrl: string;
	createAt: string;
	approvedBy: string;
	approvedAt: string;
	results: {
		partyId: number;
		partyName: string;
		votes: number;
	}[];
}

export const create_Result = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: ICreateResult;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result`,
			header: utils.header(),
			data,
		},
		actionType: resultType.create_Result,
		onFailure,
		onSuccess,
	});

export const get_Result = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result${getCommandQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: resultType.get_Result,
		onFailure,
		onSuccess,
	});

export const upload_Result = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IUploadFileResponse> & {
	data: FormData;
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: 'https://media-manager-ielect.ngrok.app/api/FileManager/upload-image',
			header: utils.headerMultipart(),
			data,
		},
		actionType: resultType.upload_Result,
		onFailure,
		onSuccess,
		auth: true,
	});

export const push_ResultData = ({
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
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: 'https://media-manager-ielect.ngrok.app/api/FileManager/upload-image',
			header: utils.header(),
			data,
		},
		actionType: resultType.push_ResultData,
		onFailure,
		onSuccess,
	});

export interface IResultDataModel {
	upload: FormData;
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

export const push_ResultDataModel = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: IResultDataModel;
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result/push-result-data-model`,
			header: utils.header(),
			data,
		},
		actionType: resultType.push_ResultDataModel,
		onFailure,
		onSuccess,
	});

export const seed_Results = ({ onFailure, onSuccess }: IResponse) =>
	utils.httpGetMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result/seed-results`,
			header: utils.header(),
		},
		actionType: resultType.seed_Results,
		onFailure,
		onSuccess,
	});

export const update_ResultStatus = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: {
		id: string;
		status: string;
		comment: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result/update-result_status`,
			header: utils.header(),
			data,
		},
		actionType: resultType.update_ResultStatus,
		onFailure,
		onSuccess,
	});

export interface IUpdateResultData {
	id: string;
	updateBy: string;
	comment: string;
	partyResults: {
		partyId: number;
		partyName: string;
		votes: number;
	}[];
}

export const update_ResultData = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: IUpdateResultData;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${QUERYAPI}/api/v1/Result/update-result_data`,
			header: utils.header(),
			data,
		},
		actionType: resultType.update_ResultData,
		onFailure,
		onSuccess,
	});

export interface IVoteTabulation {
	politicalParty: string;
	votesInFigures: number;
	votesInWords: string;
	signatory: string;
}

export interface IVoteCount {
	partyId: number;
	votes: number;
	label: string;
}

export interface IElectionResultDetails {
	numberOfVotersOnRegister: number;
	numberOfAccreditedVoters: number;
	numberOfBallotPapersIssued: number;
	numberOfUnusedBallotPapers: number;
	numberOfSpoiledBallotPapers: number;
	numberOfRejectedBallots: number;
	numberOfTotalValidVotes: number;
	totalNumberOfUsedBallotPapers: number;
}

export interface IExtractResult {
	documentTitle: string;
	electionFormType: string;
	electionFormSerialNumber: number;
	electionDetails: {
		state: string;
		localGovernmentArea: string;
		registrationArea: string;
		pollingUnit: string;
		pollingUnitCode1: number;
		pollingUnitCode2: number;
		pollingUnitCode3: number;
		pollingUnitCode4: number;
	};
	pollingUnitDetails?: IElectionResultDetails;
	wardDetails?: IElectionResultDetails;
	lgaDetails?: IElectionResultDetails;
	stateDetails?: IElectionResultDetails;
	voteTabulation: IVoteTabulation[];
	signatures: {
		presidingOfficer: string;
		presidingOfficerSignature: string;
	};
}

export const extract_ResultFile = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<IExtractResult> & {
	data: any;
}) =>
	utils.httpUploadMediaMethod({
		apiData: {
			url: '',
			customurl: `${EXTRACTAPI}/extract-election-results/file`,
			header: utils.headerMultipart(),
			data,
		},
		actionType: resultType.extract_ResultFile,
		onFailure,
		onSuccess,
	});

export const extract_ResultUrl = ({
	url,
	onFailure,
	onSuccess,
}: IResponse<IExtractResult> & {
	url: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '',
			customurl: `${EXTRACTAPI}/extract-election-results/url`,
			header: utils.header(),
			data: { url },
		},
		actionType: resultType.extract_ResultUrl,
		onFailure,
		onSuccess,
	});
