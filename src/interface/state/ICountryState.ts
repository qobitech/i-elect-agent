export interface ICountryState {
	id: number;
	name: string;
	stateCode: string;
	geographicalZoneId: number;
	wardCount: number;
	constituencyCount: number;
	pollingUnitCount: number;
	lgaCount: number;
	geographicalZone: {
		id: number;
		name: string;
		code: string;
		zoneId: number;
		zone: null;
	};
	localGovernments: null;
	stateResults: null;
	stateResultSummaries: null;
}

export interface ICountryStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: ICountryState[];
}

export interface ICountryStateByID {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
		stateCode: string;
		geographicalZoneId: number;
		wardCount: number;
		constituencyCount: number;
		pollingUnitCount: number;
		lgaCount: number;
		geographicalZone: {
			id: number;
			name: string;
			code: string;
			zoneId: number;
			zone: null;
		};
		localGovernments: null;
		stateResults: null;
		stateResultSummaries: null;
	};
}
