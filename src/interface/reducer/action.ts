import type { GenerateReducerTypes } from '../IReducer';
import type { IActionRoles, IActionsForRoleStates, IActionStates, IRoleByActionStates } from '../state/IActionState';

export type IActionReducer = GenerateReducerTypes<'create_Action', any> &
	GenerateReducerTypes<'get_Action', IActionStates> &
	GenerateReducerTypes<'get_ActionByID', any> &
	GenerateReducerTypes<'update_Action', any> &
	GenerateReducerTypes<'delete_Action', any> &
	GenerateReducerTypes<'unassign_ActionMultipleForRoles', any> &
	GenerateReducerTypes<'get_ActionsForRole', IActionsForRoleStates> &
	GenerateReducerTypes<'get_ActionsForRoleByID', IRoleByActionStates> &
	GenerateReducerTypes<'create_ActionRole', any> &
	GenerateReducerTypes<'get_ActionRole', IActionRoles> &
	GenerateReducerTypes<'delete_ActionRole', any> &
	GenerateReducerTypes<'assignMultipleRole_Action', any> &
	GenerateReducerTypes<'unassignMultipleRole_Action', any>;
