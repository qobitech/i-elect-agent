import type { IResponse } from '../../store/actions/core/election';
import type { ISearchElectionStates } from '../state/ISearch';

export interface ISearchAction {
	get_SearchElection: ({
		onFailure,
		onSuccess,
		data,
	}: IResponse<ISearchElectionStates> & {
		data: {
			keywords: string[];
		};
	}) => (dispatch: any) => void;
}
