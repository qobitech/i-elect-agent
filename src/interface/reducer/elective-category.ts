import type { GenerateReducerTypes } from '../IReducer';
import type { IElectiveCategoryByIDStates, IElectiveCategoryStates } from '../state/IElectiveCategory';

export type IElectiveCategoryReducer = GenerateReducerTypes<'create_ElectiveCategory', any> &
	GenerateReducerTypes<'get_ElectiveCategory', IElectiveCategoryStates> &
	GenerateReducerTypes<'get_ElectiveCategoryByID', IElectiveCategoryByIDStates> &
	GenerateReducerTypes<'get_ElectiveCategoryName', any> &
	GenerateReducerTypes<'update_ElectiveCategory', any> &
	GenerateReducerTypes<'delete_ElectiveCategory', any>;
