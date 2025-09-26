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
