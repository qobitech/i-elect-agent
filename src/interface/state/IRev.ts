export interface IUploadIrevState {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: string[];
}

export interface IResult {
	partyId: number;
	partyName: string;
	votes: number;
}

export interface IIrevNote {
	message: string;
	createdBy: {
		id: number;
		name: string;
	};
	createdAt: string;
}

export interface IElectoralDivisionCode {
	code: string;
	name: string;
}

// export interface IIRevResultState {
// 	id: string;
// 	election: {
// 		id: number;
// 		name: string;
// 		electionCycleId: number;
// 		constituencyId: number;
// 		isSpecialElection: boolean;
// 		electionCycle: {
// 			id: number;
// 			electionTypeId: number;
// 			name: string;
// 			year: string;
// 			startDate: string;
// 			endDate: string;
// 		};
// 		constituency: {
// 			id: number;
// 			name: string;
// 			code: string;
// 			alias: string;
// 			stateId: number;
// 			electiveCategoryId: number;
// 			isCouncilorship: boolean;
// 			lgaCount: number;
// 			wardCount: number;
// 			pollingUnitCount: number;
// 		};
// 	};
// 	ward: IElectoralDivisionCode;
// 	localGovernment: IElectoralDivisionCode;
// 	state: IElectoralDivisionCode;
// 	pollingUnit: IElectoralDivisionCode;
// 	geoZone: {
// 		code: string;
// 		name: string;
// 	};
// 	zone: {
// 		code: string;
// 		name: string;
// 	};
// 	presidingOfficer: {
// 		id: string;
// 		name: string;
// 	};
// 	votersOnRegister: number;
// 	accreditedVoters: number;
// 	ballotPapersIssuedToPoolingUnit: number;
// 	unusedBallotPapers: number;
// 	rejectedBallot: number;
// 	totalValidVotes: number;
// 	totalUsedBallotPapers: number;
// 	status: null;
// 	documentUrls: string[];
// 	createdAt: string;
// 	updatedAt: string;
// 	createdBy: {
// 		id: number;
// 		name: string;
// 	};
// 	updatedBy: null;
// 	approvedBy: null;
// 	approvedAt: string;
// 	results: IResult[];
// 	flags: [];
// 	deleteIsRequested: boolean;
// 	isDeleted: boolean;
// 	deleteRequestedBy: null;
// 	deleteRequestedAt: string;
// 	deleteApprovedBy: null;
// 	deleteApprovedAt: string;
// 	hasFlags: boolean;
// 	hasNotes: boolean;
// 	notes: null;
// }

export interface IIRevResultStates {
	data: IIRevResultState[];
	currentPage: number;
	lastPage: number;
	total: number;
	pageSize: number;
}

export interface IIrevElectionSubmissionResponse {
	referenceId: string;
	id: string | undefined;
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: null;
}

export interface IIrevAnalyticsStatsRequestArg {
	electionId: number;
	resultTypeA: string;
	resultTypeB: string;
	entityCode: string;
}

export interface IIrevAnalyticsResponseDataSourceVouteCount {
	partyName: string;
	voteCount: number;
}
export interface IIrevAnalyticsResponseDataSource {
	resultId: string;
	voteCount: IIrevAnalyticsResponseDataSourceVouteCount[];
}
export interface IIrevAnalyticsResponseData {
	entityName: string | null;
	code: string | null;
	sourceA: IIrevAnalyticsResponseDataSource | null;
	sourceB: IIrevAnalyticsResponseDataSource | null;
}
export interface IIrevAnalyticsResponseVoteSummarySource {
	registeredVoters: number;
	accreditedVoters: number;
	validVotes: number;
	rejectedVotes: number;
	totalVotes: number;
}
export interface IIrevAnalyticsResponseVoteSummary {
	sourceA: IIrevAnalyticsResponseVoteSummarySource | null;
	sourceB: IIrevAnalyticsResponseVoteSummarySource | null;
}
export interface IIrevAnalyticsResponse {
	data: IIrevAnalyticsResponseData[];
	voteSummary: IIrevAnalyticsResponseVoteSummary;
}

export interface IIRevResultState {
	id: string;
	election: {
		id: number;
		name: string;
		electionCycleId: number;
		constituencyId: number;
		isSpecialElection: boolean;
		electionCycle: {
			id: number;
			electionTypeId: number;
			name: string;
			year: string;
			startDate: string;
			endDate: string;
		};
		constituency: {
			id: number;
			name: string;
			code: string;
			alias: string;
			stateId: number;
			electiveCategoryId: number;
			isCouncilorship: boolean;
			lgaCount: number;
			wardCount: number;
			pollingUnitCount: number;
		};
	};
	ward: IElectoralDivisionCode;
	localGovernment: IElectoralDivisionCode;
	state: IElectoralDivisionCode;
	pollingUnit: IElectoralDivisionCode;
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
	referenceId: string;
	votersOnRegister: number;
	accreditedVoters: number;
	ballotPapersIssuedToPoolingUnit: number;
	unusedBallotPapers: number;
	rejectedBallot: number;
	totalValidVotes: number;
	totalUsedBallotPapers: number;
	status: string | null;
	documentUrls: string[];
	createdAt: string;
	updatedAt: string;
	createdBy: {
		id: number;
		name: string;
	};
	updatedBy: {
		id: number;
		name: string;
	} | null;
	approvedBy: {
		id: string;
		name: string;
	} | null;
	approvedAt: string;
	results: IResult[] | null;
	flags: string[];
	deleteIsRequested: boolean;
	isDeleted: boolean;
	deleteRequestedBy: null;
	deleteRequestedAt: string;
	deleteApprovedBy: null;
	deleteApprovedAt: string;
	hasFlags: boolean;
	hasNotes: boolean;
	notes: IUserNotes[] | null;
}

export interface IUserNotes {
	message: string;
	createdBy: {
		id: number;
		name: string;
	};
	createdAt: string;
}
