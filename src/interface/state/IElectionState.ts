import { type ResultType } from '@constants/global';

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
export interface IGetElectionOfficial {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: {
		id: string;
		user: {
			id: number;
			name: string;
		};
		election: {
			id: number;
			name: string;
			isSpecialElection: boolean;
		};
		pollingUnits: IElectionDivision[];
		wards: IElectionDivision[];
		localGovernments: IElectionDivision[];
		states: IElectionDivision[];
	};
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
