import type { GenerateReducerTypes } from '../IReducer';
import type { IActivityDataState, ILogin } from '../state/IAuthState';

export type IAuthReducer = GenerateReducerTypes<'login_Auth', ILogin> &
	GenerateReducerTypes<'userFacingLogin_Auth', any> &
	GenerateReducerTypes<'otpLogin_Auth', Record<string, never>> &
	GenerateReducerTypes<'register_Auth', Record<string, never>> &
	GenerateReducerTypes<'update_Auth', Record<string, never>> &
	GenerateReducerTypes<'activityData_Auth', IActivityDataState> &
	GenerateReducerTypes<'changePassword_Auth', Record<string, never>> &
	GenerateReducerTypes<'logout_Auth', any>;
