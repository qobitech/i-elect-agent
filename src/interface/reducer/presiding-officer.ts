import type { GenerateReducerTypes } from '../IReducer';
import type { IPresidingOfficerStates } from '../state/IpresidingOfficer';

export type IPresidingOfficerReducer = GenerateReducerTypes<'create_PresidingOfficer', any> &
	GenerateReducerTypes<'get_PresidingOfficer', IPresidingOfficerStates> &
	GenerateReducerTypes<'get_PresidingOfficerPollingUnit', any> &
	GenerateReducerTypes<'get_PresidingOfficerByID', any> &
	GenerateReducerTypes<'update_PresidingOfficer', any> &
	GenerateReducerTypes<'delete_PresidingOfficer', any>;
