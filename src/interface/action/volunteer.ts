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
}
