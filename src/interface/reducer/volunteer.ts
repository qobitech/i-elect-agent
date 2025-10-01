import { type IVolunteerResponse } from '@interface/state/IVolunteer';

import type { GenerateReducerTypes } from '../IReducer';

export type IVolunteerReducer = GenerateReducerTypes<'create_Volunteer', any> &
	GenerateReducerTypes<'verify_Volunteer_Onboarding', IVolunteerResponse> &
	GenerateReducerTypes<'onboard_Volunteer', any>;
