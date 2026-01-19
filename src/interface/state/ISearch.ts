export interface ISuggestionData {
	id: number;
	name: string;
}

export interface ISearchElectionStates {
	message: 'Success';
	statusCode: 201;
	isSuccessful: true;
	electionData: ISuggestionData[];
	stateData: ISuggestionData[];
	lgaData: ISuggestionData[];
	wardData: ISuggestionData[];
	poolingUnitData: ISuggestionData[];
}
