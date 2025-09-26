import type { GenerateReducerTypes } from '../IReducer';
import type { IAllLGAS, ILGAByIDState, ILGAByName, ILGAInStates, ILGAStates } from '../state/ILGAState';

export type ILGAReducer = GenerateReducerTypes<'getAll_LGA', ILGAStates> &
	GenerateReducerTypes<'get_LGAById', ILGAByIDState> &
	GenerateReducerTypes<'create_LGA', any> &
	GenerateReducerTypes<'update_LGA', any> &
	GenerateReducerTypes<'delete_LGA', any> &
	GenerateReducerTypes<'get_LGAByName', ILGAByName> &
	GenerateReducerTypes<'getAll_LGA', IAllLGAS> &
	GenerateReducerTypes<'get_LGAByCode', any> &
	GenerateReducerTypes<'get_LGAInState', ILGAInStates>;
