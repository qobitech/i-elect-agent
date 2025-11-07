import type { GenerateReducerTypes } from '../IReducer';
import type {
	ICreateElectionCycleState,
	ICreateElectionResultAnalytics,
	IElectionCycleState,
	IElectionCycleStates,
	IElectionOfficialsByQuery,
	IElectionResultStatsResponse,
	IElectionStates,
	IGetElectionByID,
	IGetElectionOfficial,
	IGetElectionTypeStates,
	IReportResultRequest,
	IResultAnalyticsDataResponse,
} from '../state/IElectionState';

export type IElectionReducer = GenerateReducerTypes<'create_Election', any> &
	GenerateReducerTypes<'get_ElectionByID', IGetElectionByID> &
	GenerateReducerTypes<'get_Elections', IElectionStates> &
	GenerateReducerTypes<'getCustom_ElectionData', any> &
	GenerateReducerTypes<'get_ElectionName', any> &
	GenerateReducerTypes<'get_ElectionByName', any> &
	GenerateReducerTypes<'update_Election', any> &
	GenerateReducerTypes<'delete_Election', any> &
	// election cycle
	GenerateReducerTypes<'create_ElectionCycle', ICreateElectionCycleState> &
	GenerateReducerTypes<'get_ElectionCycle', IElectionCycleStates> &
	GenerateReducerTypes<'get_ElectionCycleByID', IElectionCycleState> &
	GenerateReducerTypes<'get_ElectionCycleName', any> &
	GenerateReducerTypes<'update_ElectionCycle', any> &
	GenerateReducerTypes<'delete_ElectionCycle', any> &
	// election type
	GenerateReducerTypes<'create_ElectionType', any> &
	GenerateReducerTypes<'get_ElectionType', IGetElectionTypeStates[]> &
	GenerateReducerTypes<'get_ElectionTypeByID', any> &
	GenerateReducerTypes<'update_ElectionTypeByID', any> &
	GenerateReducerTypes<'delete_ElectionTypeByID', any> &
	GenerateReducerTypes<'create_ElectionOfficial', any> &
	GenerateReducerTypes<'get_ElectionOfficial', IElectionOfficialsByQuery> &
	GenerateReducerTypes<'update_ElectionOfficialById', any> &
	GenerateReducerTypes<'get_ElectionResultAnalytics', IResultAnalyticsDataResponse> &
	GenerateReducerTypes<'create_ElectionResultAnalytics', ICreateElectionResultAnalytics> &
	GenerateReducerTypes<'create_ElectionReeport', IReportResultRequest> &
	GenerateReducerTypes<'get_ElectionResultAnalyticsStats', IElectionResultStatsResponse> &
	GenerateReducerTypes<'get_ElectionOfficialById', IGetElectionOfficial>;
