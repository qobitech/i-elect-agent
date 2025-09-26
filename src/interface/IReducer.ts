import type { IActionReducer } from './reducer/action';
import type { IAuthReducer } from './reducer/auth';
import type { ICandidateReducer } from './reducer/candidate';
import type { ICollationOfficerReducer } from './reducer/collation-officer';
import type { IConsistuencyReducer } from './reducer/constituency';
import type { ICountryStatesReducer } from './reducer/country-state';
import type { IDraftReducer } from './reducer/draft';
import type { IElectionReducer } from './reducer/election';
import type { IElectiveCategoryReducer } from './reducer/elective-category';
import type { IGeoZoneReducer } from './reducer/geo-zone';
import type { IGlobalReducer } from './reducer/global';
import type { IIrevReducer } from './reducer/itev';
import type { ILGAReducer } from './reducer/lga';
import type { IPartyReducer } from './reducer/party';
import type { IPoolingUnitReducer } from './reducer/polling-unit';
import type { IPresidingOfficerReducer } from './reducer/presiding-officer';
import type { IReportReducer } from './reducer/report';
import type { IResultReducer } from './reducer/result';
import type { IRoleReducer } from './reducer/role';
import type { ISearchReducer } from './reducer/search';
import type { IUserReducer } from './reducer/user';
import type { IVolunteerReducer } from './reducer/volunteer';
import type { IWardReducer } from './reducer/ward';
import type { IZonesReducer } from './reducer/zone';

export type GenerateReducerTypes<T extends string, M> = Record<`${T}`, M> &
	Record<`${T}Loading`, boolean> &
	Record<`${T}Error`, any>;

export interface IStates {
	_auth: IAuthReducer;
	_action: IActionReducer;
	_candidate: ICandidateReducer;
	_collationOfficer: ICollationOfficerReducer;
	_constituency: IConsistuencyReducer;
	_countryState: ICountryStatesReducer;
	_draft: IDraftReducer;
	_election: IElectionReducer;
	_electiveCategory: IElectiveCategoryReducer;
	_geographicalzone: IGeoZoneReducer;
	_irev: IIrevReducer;
	_lga: ILGAReducer;
	_party: IPartyReducer;
	_presidingOfficer: IPresidingOfficerReducer;
	_poolingUnit: IPoolingUnitReducer;
	_report: IReportReducer;
	_result: IResultReducer;
	_role: IRoleReducer;
	_search: ISearchReducer;
	_user: IUserReducer;
	_volunteer: IVolunteerReducer;
	_ward: IWardReducer;
	_zone: IZonesReducer;
	global: IGlobalReducer;
}
