import type { GenerateReducerTypes } from '../IReducer';
import type {
	IConstituencyByIDState,
	IConstituencyByStateIDStates,
	IConstituencyStates,
	ICreateConstituencyState,
	ILGAInConstituencyStates,
} from '../state/IConstituencyState';

export type IConsistuencyReducer = GenerateReducerTypes<'create_Constituency', ICreateConstituencyState> &
	GenerateReducerTypes<'get_Constituency', IConstituencyStates> &
	GenerateReducerTypes<'get_ConstituencyByID', IConstituencyByIDState> &
	GenerateReducerTypes<'get_ConstituencyByStateID', IConstituencyByStateIDStates> &
	GenerateReducerTypes<'get_ConstituencyName', any> &
	GenerateReducerTypes<'update_Constituency', any> &
	GenerateReducerTypes<'delete_Constituency', any> &
	GenerateReducerTypes<'create_ConstituencyLGA', any> &
	GenerateReducerTypes<'get_ConstituencyLGA', any> &
	GenerateReducerTypes<'getLGAIn_Constituency', ILGAInConstituencyStates> &
	GenerateReducerTypes<'create_ConstituencyWard', any> &
	GenerateReducerTypes<'get_ConstituencyWard', any> &
	GenerateReducerTypes<'get_ConstituencyWardByID', any> &
	GenerateReducerTypes<'update_ConstituencyWard', any> &
	GenerateReducerTypes<'getWardsIn_Constituency', any>;
