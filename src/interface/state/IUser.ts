export interface IUserState {
	id: number;
	userName: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	roles: {
		id: number;
		name: string;
	}[];
}

export interface IUserStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IUserState[];
}
