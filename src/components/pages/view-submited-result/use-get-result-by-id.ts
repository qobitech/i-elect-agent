import { useCallback } from 'react';

import type { ResultType } from '../../../constants/global';
import { useReduxContext } from '../../../context/redux';
import type { IIRevResultState } from '../../../interface/state/IRev';
import type { IUGRefId } from '../utils';

export const useGetResultsByID = ({
	rstype,
	onFailure,
	onSuccess,
}: {
	rstype: ResultType;
	onSuccess?: (res: IIRevResultState | undefined) => void;
	onFailure?: () => void;
}): IUGRefId => {
	const { actions, states } = useReduxContext();

	const getResults = (id: string) => {
		const getFunc = () => {
			if (rstype === 'EC8A') {
				return actions?.get_IRevPollingUnitById;
			}
			if (rstype === 'EC8B') {
				return actions?.get_IRevWardById;
			}
			if (rstype === 'EC8C') {
				return actions?.get_IRevLGAById;
			}
			if (rstype === 'EC8D') {
				return actions?.get_IRevStateById;
			}
			return undefined;
		};
		getFunc?.()?.({
			paged: true,
			id,
			onSuccess: (res) => {
				onSuccess?.(res);
			},
			onFailure,
		});
	};

	const getResponse = useCallback(() => {
		let response: IIRevResultState = {} as IIRevResultState;
		const irev = states?._irev;
		if (rstype === 'EC8A') {
			response = irev?.get_IRevPollingUnitById;
		}
		if (rstype === 'EC8B') {
			response = irev?.get_IRevWardById;
		}
		if (rstype === 'EC8C') {
			response = irev?.get_IRevLGAById;
		}
		if (rstype === 'EC8D') {
			response = irev?.get_IRevStateById;
		}
		return response;
	}, [states?._irev]);

	return {
		getResults,
		response: getResponse(),
	};
};
