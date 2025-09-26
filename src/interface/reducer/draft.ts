import type { IDraftData } from '../../store/actions/core/draft';
import type { GenerateReducerTypes } from '../IReducer';

export type IDraftReducer = GenerateReducerTypes<'create_Draft', any> &
	GenerateReducerTypes<'get_Draft', IDraftData> &
	GenerateReducerTypes<'get_DraftByID', any> &
	GenerateReducerTypes<'delete_Draft', any>;
