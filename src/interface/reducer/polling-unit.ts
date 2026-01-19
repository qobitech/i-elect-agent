import type { GenerateReducerTypes } from '../IReducer';
import type {
	IAllPollingUnit,
	IAllPollingUnits,
	IGetByPollingUnitCode,
	IPollingUnitInWardsStates,
} from '../state/IPollingUnitState';

export type IPoolingUnitReducer = GenerateReducerTypes<'create_PoolingUnit', any> &
	GenerateReducerTypes<'get_PoolingUnit', IAllPollingUnits> &
	GenerateReducerTypes<'get_PoolingUnitByID', IAllPollingUnit> &
	GenerateReducerTypes<'get_PoolingUnitByName', any> &
	GenerateReducerTypes<'get_PoolingUnitByCode', IGetByPollingUnitCode> &
	GenerateReducerTypes<'update_PoolingUnit', any> &
	GenerateReducerTypes<'get_PoolingUnitPresidingOfficer', any> &
	GenerateReducerTypes<'get_PoolingUnitInWard', IPollingUnitInWardsStates> &
	GenerateReducerTypes<'delete_PoolingUnit', any>;
