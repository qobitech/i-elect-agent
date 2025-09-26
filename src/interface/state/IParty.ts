export interface IPartyState {
	id: number;
	shortName: string;
	longName: string;
	logo: string;
}

export interface IPartyStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IPartyState[];
}
