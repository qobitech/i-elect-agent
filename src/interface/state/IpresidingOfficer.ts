export interface IPresidingOfficerState {
	userId: number;
	poolingUnitId: number;
	electionId: number;
	isCurrent: boolean;
	user: null;
	poolingUnit: null;
	election: null;
}
export interface IPresidingOfficerStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IPresidingOfficerState[];
}
