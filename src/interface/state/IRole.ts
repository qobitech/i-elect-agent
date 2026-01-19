export interface IRolesState {
	id: number;
	name: string;
}
export interface IRolesStates {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IRolesState[];
}
