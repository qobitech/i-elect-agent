export interface IGetReportsState {
	id: string;
	isResolved: boolean;
	createdAt: string;
	updatedAt: string;
	userId: number;
	phoneNumber: string;
	email: string;
	report: {
		title: string;
		body: string;
	};
}
export interface IGetReportsStates {
	currentPage: number;
	pageSize: number;
	totalCount: number;
	totalPages: number;
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IGetReportsState[];
}

export interface IGetReportByID {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: {
		id: string;
		isResolved: boolean;
		createdAt: string;
		updatedAt: string;
		userId: number;
		phoneNumber: string;
		email: string;
		report: {
			title: string;
			body: string;
		};
	};
}
