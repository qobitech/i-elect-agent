import type { GenerateReducerTypes } from '../IReducer';
import type { IRolesStates } from '../state/IRole';

export type IRoleReducer = GenerateReducerTypes<'get_Role', IRolesStates> &
	GenerateReducerTypes<'create_Role', any> &
	GenerateReducerTypes<'delete_Role', any> &
	GenerateReducerTypes<'getUserIn_Role', any> &
	GenerateReducerTypes<'get_RoleByName', any> &
	GenerateReducerTypes<'update_Role', any> &
	GenerateReducerTypes<'assignMultipleAction_Role', any> &
	GenerateReducerTypes<'unassignMultipleAction_Role', any>;
