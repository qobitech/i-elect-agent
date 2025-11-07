export interface IPollingUnitState {
	id: number;
	poolingUnitCode: string;
	name: string;
	description: null;
	wardId: number;
	registeredVoters: number;
	latitude: null;
	longitude: null;
	location: null;
	ward: {
		id: number;
		name: string;
		wardCode: string;
		lgaId: number;
		lga: null;
		constituencyWards: null;
	};
	presidingOfficers: null;
}

export interface IPollingUnitStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IPollingUnitState[];
}

export interface IPollingUnitInWardsState {
	id: number;
	poolingUnitCode: string;
	name: string;
	description: null | string;
	registeredVoters: number;
	wardId: number;
	latitude: null;
	longitude: null;
	location: null;
	ward: null;
}
export interface IPollingUnitInWardsStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IPollingUnitInWardsState[];
}

export interface IPollingUnitByIDState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		poolingUnitCode: string;
		name: string;
		description: null;
		registeredVoters: number;
		wardId: number;
		latitude: null;
		longitude: null;
		location: null;
		ward: {
			id: number;
			name: string;
			wardCode: string;
			lgaId: number;
		};
	};
}

export interface IGetByPollingUnitCode {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		poolingUnitCode: string;
		name: string;
		description: string;
		registeredVoters: number;
		wardId: number;
		latitude: string | null;
		longitude: string | null;
		location: string | null;
		ward: {
			id: number;
			name: string;
			wardCode: string;
			lgaId: number;
		};
		state: {
			id: number;
			name: string;
		};
		lga: {
			id: number;
			name: string;
			lgaCode: string;
			stateId: number;
			description: string | null;
			wardCount: number;
			constituencyCount: number;
			pollingUnitCount: number;
		};
	};
}

export interface IAllPollingUnit {
	id: number;
	poolingUnitCode: string;
	name: string;
	description: string;
	wardId: number;
	registeredVoters: number;
	latitude: string;
	longitude: string;
	location: string;
	ward: {
		id: number;
		name: string;
		wardCode: string;
		lgaId: number;
		description: 'None';
		constituencyCount: number;
		pollingUnitCount: number;
		lga: null;
		constituencyWards: null;
		wardResults: null;
		wardResultSummaries: null;
	};
	presidingOfficers: null;
	puResults: null;
	puResultSummaries: null;
}
export interface IAllPollingUnits {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IAllPollingUnit[];
}
