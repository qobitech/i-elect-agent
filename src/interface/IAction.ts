import type { IActionStates } from './action/actions';
import type { IAuthAction } from './action/auth';
import type { ICandidateAction } from './action/candidate';
import type { ICollationOfficerAction } from './action/collation-officer';
import type { IConsistuencyAction } from './action/consistuency';
import type { ICountryStateAction } from './action/country-state';
import type { IDraftAction } from './action/draft';
import type { IElectionAction } from './action/election';
import type { IElectiveCategoryAction } from './action/elective-category';
import type { IGeoZoneAction } from './action/geozone';
import type { IIRevAction } from './action/irev';
import type { ILGAAction } from './action/lga';
import type { IPartyAction } from './action/party';
import type { IPoolingUnitAction } from './action/pooling-unit';
import type { IPresidingOfficerAction } from './action/presiding-officer';
import type { IReportAction } from './action/report';
import type { IResultAction } from './action/result';
import type { IRoleAction } from './action/role';
import type { ISearchAction } from './action/search';
import type { IUserAction } from './action/user';
import type { IVolunteerAction } from './action/volunteer';
import type { IWardAction } from './action/ward';
import type { IZoneAction } from './action/zone';

interface IGlobalAction {
	notificationGlobal: (notice: string, status: boolean) => (dispatch: any) => void;
	clearAction: (type: string) => (dispatch: any) => void;
	sessionTimeoutGlobal: (status: boolean) => (dispatch: any) => void;
}

export interface IActions
	extends IAuthAction,
		IZoneAction,
		ICountryStateAction,
		ILGAAction,
		IGlobalAction,
		IElectionAction,
		IElectiveCategoryAction,
		IConsistuencyAction,
		ICandidateAction,
		ICollationOfficerAction,
		IWardAction,
		IUserAction,
		IRoleAction,
		IPresidingOfficerAction,
		IPoolingUnitAction,
		IPartyAction,
		IGeoZoneAction,
		IResultAction,
		IIRevAction,
		ISearchAction,
		IReportAction,
		IDraftAction,
		IVolunteerAction,
		IActionStates {}
