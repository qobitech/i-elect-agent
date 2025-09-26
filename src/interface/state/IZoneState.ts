export interface IZone {
	id: number;
	name: string;
	geographicalZones: null;
}

export interface IZones {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IZone[];
	currentPage: number;
	total: number;
}
