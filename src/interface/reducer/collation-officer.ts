import type { GenerateReducerTypes } from '../IReducer';

export type ICollationOfficerReducer = GenerateReducerTypes<'create_CollationOfficer', any> &
	GenerateReducerTypes<'get_CollationOfficer', any> &
	GenerateReducerTypes<'get_CollationOfficerByID', any> &
	GenerateReducerTypes<'update_CollationOfficer', any> &
	GenerateReducerTypes<'delete_CollationOfficer', any>;
