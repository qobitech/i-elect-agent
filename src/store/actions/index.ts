import * as actionActions from './core/action';
import * as authActions from './core/auth';
import * as candidateActions from './core/candidate';
import * as collationOfficerActions from './core/collationofficer';
import * as consistuencyActions from './core/consistuency';
import * as countryStateActions from './core/country-state';
import * as draftActions from './core/draft';
import * as electionActions from './core/election';
import * as electiveCategoryActions from './core/elective-category';
import * as geozoneActions from './core/geozone';
import * as lgaActions from './core/lga';
import * as partyActions from './core/party';
import * as poolingUnitActions from './core/poolingunit';
import * as presidingOfficerActions from './core/presiding-officer';
import * as reportActions from './core/report';
import * as roleActions from './core/role';
import * as searchActions from './core/search';
import * as userActions from './core/user';
import * as volunteerActions from './core/volunteer';
import * as wardActions from './core/ward';
import * as zoneActions from './core/zone';
import * as globalActions from './global';
import * as irevActions from './query/irev';
import * as resultActions from './query/result';

export const actions = {
	...authActions,
	...globalActions,
	...zoneActions,
	...countryStateActions,
	...lgaActions,
	...electionActions,
	...electiveCategoryActions,
	...consistuencyActions,
	...candidateActions,
	...collationOfficerActions,
	...wardActions,
	...userActions,
	...roleActions,
	...presidingOfficerActions,
	...poolingUnitActions,
	...partyActions,
	...geozoneActions,
	...resultActions,
	...irevActions,
	...searchActions,
	...actionActions,
	...reportActions,
	...draftActions,
	...volunteerActions,
};
