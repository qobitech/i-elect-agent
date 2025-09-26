import type { GenerateReducerTypes } from '../IReducer';
import type { IZone, IZones } from '../state/IZoneState';

export type IZonesReducer = GenerateReducerTypes<'get_Zone', IZones> &
	GenerateReducerTypes<'create_Zone', any> &
	GenerateReducerTypes<'get_ZoneById', IZone> &
	GenerateReducerTypes<'get_ZoneByName', any> &
	GenerateReducerTypes<'update_Zone', any> &
	GenerateReducerTypes<'delete_Zone', any>;
