import type { IResult } from './IRev';

export interface IResultState {
	id: string;
	election: string;
	poolingUnit: string;
	location: null;
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
	results: IResult[] | null;
	resultUpdateLogs: null;
}
export interface IResultStates {
	data: IResultState[];
	currentPage: number;
	lastPage: number;
	total: number;
	pageSize: number;
}

export interface IUploadFileResponse {
	message: string;
	data: {
		publicId: string;
		uri: string;
		location: null;
		organisation: null;
		contentType: string;
		createdAt: string;
	};
}
