import type { GenerateReducerTypes } from '../IReducer';
import type { IGeoZoneState, IGeoZoneStates } from '../state/IGeoZoneState';

export type IGeoZoneReducer = GenerateReducerTypes<'create_GeographicalZone', any> &
	GenerateReducerTypes<'get_GeographicalZone', IGeoZoneStates> &
	GenerateReducerTypes<'get_GeographicalZoneByID', IGeoZoneState> &
	GenerateReducerTypes<'get_GeographicalZoneByName', any> &
	GenerateReducerTypes<'update_GeographicalZone', any> &
	GenerateReducerTypes<'delete_GeographicalZone', any>;
