export interface IWardState {
	id: number;
	name: string;
	wardCode: string;
	lgaId: boolean;
	lga: {
		id: number;
		name: string;
		lgaCode: string;
		stateId: number;
		state: null;
		wards: [];
		constituencyLgas: null;
	} | null;
	constituencyWards: null;
}

export interface IWardStates {
	isSuccessful: boolean;
	message: string;
	pageSize: number;
	statusCode: number;
	totalCount: number;
	totalPages: number;
	currentPage: number;
	data: IWardState[];
}

export interface IWardInLGAState {
	id: number;
	name: string;
	wardCode: string;
	lgaId: number;
}
export interface IWardInLGAStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IWardInLGAState[];
}

export interface IWardByIDState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IWardState;
}

export interface IWardByCode {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: [
		{
			id: number;
			name: string;
			wardCode: string;
			lgaId: number;
			description: string;
			constituencyCount: number;
			pollingUnitCount: number;
			lga: {
				id: number;
				name: string;
				lgaCode: string;
				stateId: number;
				state: null;
				description: string;
				wardCount: number;
				constituencyCount: number;
				pollingUnitCount: number;
				wards: [];
				constituencyLgas: null;
				lgaResults: null;
				lgaResultSummaries: null;
			};
			constituencyWards: null;
			wardResults: null;
			wardResultSummaries: null;
		},
	];
}

export interface IAllWard {
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
}

export interface IAllWards {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IAllWard[];
}
