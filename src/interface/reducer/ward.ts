import type { GenerateReducerTypes } from '../IReducer';
import type { IAllWards, IWardByCode, IWardByIDState, IWardInLGAStates } from '../state/IWardState';

export type IWardReducer = GenerateReducerTypes<'create_Ward', any> &
	GenerateReducerTypes<'get_Ward', IAllWards> &
	GenerateReducerTypes<'get_WardByID', IWardByIDState> &
	GenerateReducerTypes<'get_WardByCode', IWardByCode> &
	GenerateReducerTypes<'get_WardInLGA', IWardInLGAStates> &
	GenerateReducerTypes<'update_Ward', any> &
	GenerateReducerTypes<'delete_Ward', any>;
