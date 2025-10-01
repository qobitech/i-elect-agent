import { type IVolunteerResponse } from '@interface/state/IVolunteer';

import type { IResponse } from '../../store/actions/core/election';
import type { ICreateVolunteer } from '../../store/actions/core/volunteer';

export interface IVolunteerAction {
	create_Volunteer: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: ICreateVolunteer;
	}) => (dispatch: any) => void;
	verify_Volunteer_Onboarding: ({
		token,
		onFailure,
		onSuccess,
	}: IResponse<IVolunteerResponse> & {
		token: string;
	}) => (dispatch: any) => Promise<void>;
	onboard_Volunteer: ({
		data,
		onFailure,
		onSuccess,
	}: IResponse & {
		data: {
			volunteerId: number;
			accountName: string;
			accountNumber: string;
			bankName: string;
		};
	}) => (dispatch: any) => Promise<void>;
}
