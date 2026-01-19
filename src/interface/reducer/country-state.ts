import type { GenerateReducerTypes } from '../IReducer';
import type { ICountryStateByID, ICountryStates } from '../state/ICountryState';

export type ICountryStatesReducer = GenerateReducerTypes<'get_CountryState', ICountryStates> &
	GenerateReducerTypes<'get_CountryStateByID', ICountryStateByID> &
	GenerateReducerTypes<'create_CountryState', any> &
	GenerateReducerTypes<'getWardsIn_CountryState', any> &
	GenerateReducerTypes<'get_CountryStateByName', any> &
	GenerateReducerTypes<'update_CountryState', any> &
	GenerateReducerTypes<'delete_CountryState', any>;
