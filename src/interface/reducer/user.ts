import type { GenerateReducerTypes } from '../IReducer';
import type { IUserStates } from '../state/IUser';

export type IUserReducer = GenerateReducerTypes<'get_User', IUserStates> &
	GenerateReducerTypes<'get_UserByEmail', any> &
	GenerateReducerTypes<'get_UserByPhoneNumber', any> &
	GenerateReducerTypes<'get_UserRoles', any> &
	GenerateReducerTypes<'delete_User', any> &
	GenerateReducerTypes<'add_UserToRole', any> &
	GenerateReducerTypes<'remove_UserFromRole', any>;
