import { type ResultType } from '../../constants/global';

export interface IElectionState {
	id: number;
	name: string;
	electionCycleId: number;
	constituencyId: number;
}

export interface IElectionStates {
	data: IElectionState[];
	isSuccessful: true;
	message: string;
	pageSize: number;
	statusCode: number;
	totalCount: number;
	totalPages: number;
	currentPage: number;
}

export interface ICreateElectionState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
		electionCycleId: number;
		constituencyId: number;
		electionCycle: null;
		constituency: null;
		candidates: null;
		presidingOfficers: null;
	};
}

export interface IElectionCycleState {
	id: number;
	electionTypeId: number;
	name: string;
	year: string;
	startDate: string;
	endDate: string;
	electionType: null;
}

export interface IElectionCycleStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IElectionCycleState[];
}

export interface ICreateElectionCycleState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
		schedule: string;
	};
}

// election type
export interface IGetElectionTypeStates {
	id: number;
	name: string;
}

export interface IElectionDivision {
	id: number;
	name: string;
	code: string;
}
// export interface IGetElectionOfficial {
// 	message: string;
// 	isSuccessful: boolean;
// 	statusCode: number;
// 	data: {
// 		id: string;
// 		user: {
// 			id: number;
// 			name: string;
// 		};
// 		election: {
// 			id: number;
// 			name: string;
// 			isSpecialElection: boolean;
// 		};
// 		pollingUnits: IElectionDivision[];
// 		wards: IElectionDivision[];
// 		localGovernments: IElectionDivision[];
// 		states: IElectionDivision[];
// 	};
// }

export interface IGetElectionOfficialData {
	id: string;
	userId: number;
	electionId: number;
	election: string;
	name: string;
	assignment: {
		id: number;
		code: string;
		name: string;
		resultType: ResultType;
		isCompleted: boolean;
	};
}
export interface IGetElectionOfficial {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IGetElectionOfficialData[];
}

export interface IGetElectionByID {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
		electionCycleId: number;
		constituencyId: number;
		isSpecialElection: boolean;
		description: string;
		electionCycle: {
			id: number;
			electionTypeId: number;
			name: string;
			year: string;
			startDate: string;
			endDate: string;
			electionType: null;
		};
		constituency: {
			id: number;
			name: string;
			code: null;
			alias: null;
			stateId: number;
			electiveCategoryId: number;
			isCouncilorship: boolean;
			lgaCount: number;
			wardCount: number;
			pollingUnitCount: number;
			state: null;
			electiveCategory: null;
			constituencyLgas: null;
			constituencyWards: null;
		};
		candidates: [];
		presidingOfficers: [];
	};
}

export interface IElectionOfficialByQuery {
	id: string;
	referenceId?: string;
	userId: number;
	electionId: number;
	election: string;
	name: string;
	assignment: {
		code: string;
		name: string;
		resultType: Lowercase<ResultType>;
		isCompleted: boolean;
		id: string;
	};
}
export interface IElectionOfficialsByQuery {
	message: 'success';
	isSuccessful: true;
	statusCode: 200;
	data: IElectionOfficialByQuery[];
}

export interface IUpdateElectionOfficialReqData {
	id: string;
	referenceId: string;
	userId: number;
	electionId: number;
	election: string;
	name: string;
	assignment: {
		id: number;
		code: string;
		name: string;
		resultType: string;
		isCompleted: boolean;
	};
}

export interface IGetResultAnalyticsStatsElectoralDivision {
	totalCount: number;
	uploadedCount: number;
}

export interface IGetResultAnalyticsStatsResponse {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		lga: IGetResultAnalyticsStatsElectoralDivision;
		ward: IGetResultAnalyticsStatsElectoralDivision;
		pollingUnit: IGetResultAnalyticsStatsElectoralDivision;
		state: IGetResultAnalyticsStatsElectoralDivision;
	};
}

export interface IResultAnalyticsDataResponse {
	isSuccessful: boolean;
	message: string;
	pageSize: number;
	statusCode: number;
	totalCount: number;
	totalPages: number;
	currentPage: number;
	data: IResultAnalyticsData[];
	statistics: { total: number; uploadedCount: number };
}
export interface IResultAnalyticsData {
	id: number;
	partyId: number;
	electionId: number;
	stateId: number;
	lgaId: number;
	wardId: number;
	resultId: string;
	pollingUnitId: number;
	resultType: Lowercase<ResultType>;
	code: string;
	isUploaded: boolean;
	isAssigned: boolean;
	hasApplicant: boolean;
	applicantCount: number;
}

export interface ICreateElectionResultAnalytics {
	resultId: string;
	electionId: number;
	resultType: Lowercase<ResultType>;
	entityId: number;
}

export interface IReportResultRequest {
	electionId: number;
	partyId: number;
	comment: string;
	resultType: string;
	code: string;
	resultId: string;
	createdAt?: string;
	updatedAt?: string;
	userId: number;
	flag: string;
}

export type statsResultType = 'lga' | 'ward' | 'pollingUnit' | 'state';

export interface IElectionResultStatsDataValue {
	totalCount: number;
	uploadedCount: number;
}

export type IElectionResultStatsData = Record<statsResultType, IElectionResultStatsDataValue>;

export interface IElectionResultStatsResponse {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IElectionResultStatsData;
}
