import type { GenerateReducerTypes } from '../IReducer';
import { type IVolunteerResponse } from '../state/IVolunteer';

export type IVolunteerReducer = GenerateReducerTypes<'create_Volunteer', any> &
	GenerateReducerTypes<'verify_Volunteer_Onboarding', IVolunteerResponse> &
	GenerateReducerTypes<'onboard_Volunteer', any>;
