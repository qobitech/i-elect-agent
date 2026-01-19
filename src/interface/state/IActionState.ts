export interface IActionState {
	id: number;
	name: string;
	actionRoles: null;
}

export interface IActionStates {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IActionState[];
}

export interface IActionRole {
	actionId: number;
	appRoleId: number;
	action: null;
	appRole: null;
}

export interface IActionRoles {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IActionRole[];
}

export interface IRoleByActionState {
	id: number;
	name: string;
}
export interface IRoleByActionStates {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: IRoleByActionState[];
}

export interface IActionsForRoleStates {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: string[];
}
