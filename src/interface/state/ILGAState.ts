export interface ILGAState {
	id: number;
	name: string;
	lgaCode: string;
	stateId: number;
	state: null;
	wards: null;
	constituencyLgas: null;
}
export interface ILGAStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: ILGAState[];
}

export interface ILGAInState {
	id: number;
	name: string;
	lgaCode: string;
	stateId: number;
}
export interface ILGAInStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: ILGAInState[];
}

interface IWard {
	id: number;
	name: string;
	wardCode: string;
	lgaId: number;
	constituencyWards: null;
}

export interface ILGAByIDState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
		lgaCode: string;
		stateId: number;
		state: {
			id: number;
			name: string;
			stateCode: string;
			geographicalZoneId: number;
			geographicalZone: null;
			localGovernments: [];
		};
		wards: IWard[];
		constituencyLgas: null;
	};
}

interface IWard {
	id: number;
	name: string;
	wardCode: string;
	lgaId: number;
	description: string;
	constituencyCount: number;
	pollingUnitCount: number;
	constituencyWards: null;
	wardResults: null;
	wardResultSummaries: null;
}

export interface ILGAByName {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: [
		{
			id: number;
			name: string;
			lgaCode: string;
			stateId: number;
			state: {
				id: number;
				name: string;
				stateCode: string;
				geographicalZoneId: number;
				wardCount: number;
				constituencyCount: number;
				pollingUnitCount: number;
				lgaCount: number;
				geographicalZone: null;
				localGovernments: [];
				stateResults: null;
				stateResultSummaries: null;
			};
			description: string;
			wardCount: number;
			constituencyCount: number;
			pollingUnitCount: number;
			wards: IWard[];
			constituencyLgas: null;
			lgaResults: null;
			lgaResultSummaries: null;
		},
	];
}

export interface IAllLGA {
	id: number;
	name: string;
	lgaCode: string;
	stateId: number;
	state: null;
	description: string;
	wardCount: number;
	constituencyCount: number;
	pollingUnitCount: number;
	wards: null;
	constituencyLgas: null;
	lgaResults: null;
	lgaResultSummaries: null;
}
export interface IAllLGAS {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IAllLGA[];
}
