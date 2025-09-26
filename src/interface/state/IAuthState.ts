export interface IOTP {
	message: string;
	isSuccessful: boolean;
}
export interface IUserState {
	UserId: string;
	FullName: string;
	UserName: string;
	Email: string;
	PhoneNumber: string;
	PollingUnitName: string;
	PollingUnitId: string;
	Election: string;
	Ward: string;
	LGA: string;
	State: string;
	Zone: string;
	GeoZone: string;
	role: string[];
	nbf: number;
	exp: number;
	iat: number;
}

export interface ILogin {
	user: IUserState | undefined;
	token: any;
	refreshToken: any;
}

export interface IActivityDataState {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: {
		loggedInUsersCount: number;
		activeUsersCount: number;
	};
}
