import type { GenerateReducerTypes } from '../IReducer';
import type { IPartyState, IPartyStates } from '../state/IParty';

export type IPartyReducer = GenerateReducerTypes<'create_Party', any> &
	GenerateReducerTypes<'get_Party', IPartyStates> &
	GenerateReducerTypes<'get_PartyByID', IPartyState> &
	GenerateReducerTypes<'get_PartyByName', any> &
	GenerateReducerTypes<'update_Party', any> &
	GenerateReducerTypes<'delete_Party', any>;
