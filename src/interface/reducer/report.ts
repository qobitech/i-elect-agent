import type { GenerateReducerTypes } from '../IReducer';
import type { IGetReportByID, IGetReportsStates } from '../state/IReport';

export type IReportReducer = GenerateReducerTypes<'create_Report', any> &
	GenerateReducerTypes<'get_Report', IGetReportsStates> &
	GenerateReducerTypes<'get_ReportByID', IGetReportByID> &
	GenerateReducerTypes<'update_ReportByID', IGetReportByID> &
	GenerateReducerTypes<'get_ReportMarkedAsResolved', any>;
