import { combineReducers } from 'redux';

import type { IStates } from '../../interface/IReducer';
import type { IActionReducer } from '../../interface/reducer/action';
import type { IAuthReducer } from '../../interface/reducer/auth';
import type { ICandidateReducer } from '../../interface/reducer/candidate';
import type { ICollationOfficerReducer } from '../../interface/reducer/collation-officer';
import type { IConsistuencyReducer } from '../../interface/reducer/constituency';
import type { ICountryStatesReducer } from '../../interface/reducer/country-state';
import type { IDraftReducer } from '../../interface/reducer/draft';
import type { IElectionReducer } from '../../interface/reducer/election';
import type { IElectiveCategoryReducer } from '../../interface/reducer/elective-category';
import type { IGeoZoneReducer } from '../../interface/reducer/geo-zone';
import type { IGlobalReducer } from '../../interface/reducer/global';
import type { IIrevReducer } from '../../interface/reducer/itev';
import type { ILGAReducer } from '../../interface/reducer/lga';
import type { IPartyReducer } from '../../interface/reducer/party';
import type { IPoolingUnitReducer } from '../../interface/reducer/polling-unit';
import type { IPresidingOfficerReducer } from '../../interface/reducer/presiding-officer';
import type { IReportReducer } from '../../interface/reducer/report';
import type { IResultReducer } from '../../interface/reducer/result';
import type { IRoleReducer } from '../../interface/reducer/role';
import type { ISearchReducer } from '../../interface/reducer/search';
import type { IUserReducer } from '../../interface/reducer/user';
import type { IVolunteerReducer } from '../../interface/reducer/volunteer';
import type { IWardReducer } from '../../interface/reducer/ward';
import type { IZonesReducer } from '../../interface/reducer/zone';

interface IAction {
	type: string;
	payload: any;
}

const reducer =
	<T>(states: keyof IStates) =>
	(state = {} as T, action: IAction) => {
		// console.log(action, state, 'juju')
		if (action.type.toLowerCase().includes((states as string).toLowerCase())) return { ...state, [action.type]: action.payload };
		return { ...state };
	};

const rootreducer = combineReducers<IStates>({
	_action: reducer<IActionReducer>('_action'),
	_auth: reducer<IAuthReducer>('_auth'),
	_candidate: reducer<ICandidateReducer>('_candidate'),
	_collationOfficer: reducer<ICollationOfficerReducer>('_collationOfficer'),
	_constituency: reducer<IConsistuencyReducer>('_constituency'),
	_countryState: reducer<ICountryStatesReducer>('_countryState'),
	_draft: reducer<IDraftReducer>('_draft'),
	_election: reducer<IElectionReducer>('_election'),
	_electiveCategory: reducer<IElectiveCategoryReducer>('_electiveCategory'),
	_geographicalzone: reducer<IGeoZoneReducer>('_geographicalzone'),
	_irev: reducer<IIrevReducer>('_irev'),
	_lga: reducer<ILGAReducer>('_lga'),
	_party: reducer<IPartyReducer>('_party'),
	_poolingUnit: reducer<IPoolingUnitReducer>('_poolingUnit'),
	_presidingOfficer: reducer<IPresidingOfficerReducer>('_presidingOfficer'),
	_result: reducer<IResultReducer>('_result'),
	_report: reducer<IReportReducer>('_report'),
	_role: reducer<IRoleReducer>('_role'),
	_search: reducer<ISearchReducer>('_search'),
	_user: reducer<IUserReducer>('_user'),
	_volunteer: reducer<IVolunteerReducer>('_volunteer'),
	_ward: reducer<IWardReducer>('_ward'),
	_zone: reducer<IZonesReducer>('_zone'),
	global: reducer<IGlobalReducer>('global'),
});

export default rootreducer;
