import type { GenerateReducerTypes } from '../IReducer';

export type IVolunteerReducer = GenerateReducerTypes<'create_Volunteer', any> &
	GenerateReducerTypes<'verify_Volunteer_Onboarding', any> &
	GenerateReducerTypes<'onboard_Volunteer', any>;
