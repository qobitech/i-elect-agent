import type { IExtractResult } from '../../store/actions/query/result';
import type { GenerateReducerTypes } from '../IReducer';
import type { IResultStates } from '../state/IResultState';

export type IResultReducer = GenerateReducerTypes<'create_Result', any> &
	GenerateReducerTypes<'get_Result', IResultStates> &
	GenerateReducerTypes<'upload_Result', any> &
	GenerateReducerTypes<'push_ResultData', any> &
	GenerateReducerTypes<'push_ResultDataModel', any> &
	GenerateReducerTypes<'seed_Results', any> &
	GenerateReducerTypes<'update_ResultStatus', any> &
	GenerateReducerTypes<'extract_ResultFile', IExtractResult> &
	GenerateReducerTypes<'extract_ResultUrl', IExtractResult> &
	GenerateReducerTypes<'update_ResultData', any>;
