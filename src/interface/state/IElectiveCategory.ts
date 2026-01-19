export interface IElectiveCategoryState {
	id: number;
	name: string;
}
export interface IElectiveCategoryStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IElectiveCategoryState[];
}

export interface IElectiveCategoryByIDStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: {
		id: number;
		name: string;
	};
}
