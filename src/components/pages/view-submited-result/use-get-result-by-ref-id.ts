import { useCallback } from 'react';

import type { ResultType } from '../../../constants/global';
import { useReduxContext } from '../../../context/redux';
import type { IIRevResultState } from '../../../interface/state/IRev';
import type { IUGRefId } from '../utils';

export const useGetResultsByRefID = ({
	rstype,
	onFailure,
	onSuccess,
}: {
	rstype: ResultType;
	onSuccess?: (res: IIRevResultState | undefined) => void;
	onFailure?: () => void;
}): IUGRefId => {
	const { actions, states } = useReduxContext();

	const getResults = (refId: string) => {
		const getFunc = () => {
			if (rstype === 'EC8A') {
				return actions?.get_IRevPollingUnitByRefId;
			}
			if (rstype === 'EC8B') {
				return actions?.get_IRevWardByRefId;
			}
			if (rstype === 'EC8C') {
				return actions?.get_IRevLGAByRefId;
			}
			if (rstype === 'EC8D') {
				return actions?.get_IRevStateByRefId;
			}
			return undefined;
		};
		getFunc?.()?.({
			paged: true,
			refId,
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
			response = irev?.get_IRevPollingUnitByRefId;
		}
		if (rstype === 'EC8B') {
			response = irev?.get_IRevWardByRefId;
		}
		if (rstype === 'EC8C') {
			response = irev?.get_IRevLGAByRefId;
		}
		if (rstype === 'EC8D') {
			response = irev?.get_IRevStateByRefId;
		}
		return response;
	}, [states?._irev]);

	return {
		getResults,
		response: getResponse(),
	};
};
