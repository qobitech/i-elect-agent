export interface IConstituencyLGA {
	constituencyId: number;
	lgaId: number;
	lga: null;
}

export interface IElectiveCategory {
	id: number;
	name: string;
}

export interface IState {
	id: number;
	name: string;
	stateCode: string;
	geographicalZoneId: number;
	geographicalZone: null;
	localGovernments: null;
}

export interface IConstituencyState {
	id: number;
	name: string;
	code: string;
	alias: string;
	stateId: number;
	electiveCategoryId: number;
	isCouncilorship: boolean;
	state: IState | null;
	electiveCategory: IElectiveCategory | null;
	constituencyLgas: IConstituencyLGA[] | null;
	constituencyWards: null;
}

export interface IConstituencyByIDState {
	isSuccessful: boolean;
	message: string;
	statusCode: number;
	data: IConstituencyState | null;
}

export interface IConstituencyStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IConstituencyState[];
}
export interface IConstituencyByStateIDState {
	id: number;
	name: string;
	state: {
		id: number;
		name: string;
	};
	electiveCategory: {
		id: number;
		name: string;
		alias: string;
	};
}
export interface IConstituencyByStateIDStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IConstituencyByStateIDState[];
}

export interface ILGAInConstituencyState {
	id: number;
	name: string;
	lgaCode: string;
	stateId: number;
}
export interface ILGAInConstituencyStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: 1476;
		name: 'GOVERNOR EDO STATE';
		lgas: ILGAInConstituencyState[];
	};
}

export interface ICreateConstituencyState {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IConstituencyState;
}
