import { type IVolunteerResponse } from '@interface/state/IVolunteer';

import { volunteerType } from '../../types';
import * as utils from '../utils';
import type { IResponse } from './election';

export interface ICreateVolunteer {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	stateId: number;
	nin: string;
	lgaId: number;
	lgaName?: string;
	wardId: number;
	wardName?: string;
	pollingUnitId: number;
}

export const create_Volunteer = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: ICreateVolunteer;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Volunteer',
			header: utils.header(),
			data,
		},
		actionType: volunteerType.create_Volunteer,
		onFailure,
		onSuccess,
		auth: true,
	});

export const verify_Volunteer_Onboarding = ({
	token,
	onFailure,
	onSuccess,
}: IResponse<IVolunteerResponse> & {
	token: string;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: `/api/v1/Volunteer/verify-token/${token}`,
			header: utils.header(),
		},
		actionType: volunteerType.verify_Volunteer_Onboarding,
		onFailure,
		onSuccess,
		auth: true,
	});

export const onboard_Volunteer = ({
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
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Auth/agent-onboarding',
			header: utils.header(),
			data,
		},
		actionType: volunteerType.onboard_Volunteer,
		onFailure,
		onSuccess,
		auth: true,
	});
