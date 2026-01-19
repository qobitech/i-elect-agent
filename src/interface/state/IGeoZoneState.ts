export interface IGeoZoneState {
	id: number;
	name: string;
	code: string;
	zoneId: number;
	zone: {
		id: number;
		name: string;
		geographicalZones: [
			{
				id: number;
				name: string;
				code: string;
				zoneId: number;
			},
			{
				id: number;
				name: string;
				code: string;
				zoneId: number;
			},
		];
	};
}
export interface IGeoZoneStates {
	message: string;
	statusCode: number;
	isSuccessful: boolean;
	data: IGeoZoneState[];
}
