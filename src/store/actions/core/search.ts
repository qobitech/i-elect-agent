import type { ISearchElectionStates } from '../../../interface/state/ISearch';
import { searchType } from '../../types';
import * as utils from '../utils';
import type { IResponse } from './election';

export const get_SearchElection = ({
	onFailure,
	onSuccess,
	data,
}: IResponse<ISearchElectionStates> & {
	data: {
		keywords: string[];
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Search',
			header: utils.header(),
			data,
		},
		actionType: searchType.get_SearchElection,
		onFailure,
		onSuccess,
	});
