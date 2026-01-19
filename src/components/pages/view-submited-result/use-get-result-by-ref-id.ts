import { useCallback } from 'react';

import type { ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IIRevResultState } from '../../../interface/state/IRev';
import { type IUGRefId } from './helpers';

export const useGetResultsByRefID = ({
	rstype,
	onFailure,
	onSuccess,
}: {
	rstype: ResultType;
	onSuccess?: (res: IIRevResultState | undefined) => void;
	onFailure?: () => void;
}): IUGRefId => {
	const { actions, states } = useGlobalContext();

	const getResults = (referenceId: string) => {
		const getFunc = () => {
			if (rstype === 'EC8A') {
				return actions?.get_IrevPollingUnitResultByRefId;
			}
			if (rstype === 'EC8B') {
				return actions?.get_IrevWardResultByRefId;
			}
			if (rstype === 'EC8C') {
				return actions?.get_IrevLgaResultByRefId;
			}
			if (rstype === 'EC8D') {
				return actions?.get_IrevStateResultByRefId;
			}
			return undefined;
		};
		getFunc?.()?.({
			// paged: true,
			referenceId,
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
			response = irev?.get_IrevPollingUnitResultByRefId!;
		}
		if (rstype === 'EC8B') {
			response = irev?.get_IrevWardResultByRefId!;
		}
		if (rstype === 'EC8C') {
			response = irev?.get_IrevLgaResultByRefId!;
		}
		if (rstype === 'EC8D') {
			response = irev?.get_IrevStateResultByRefId!;
		}
		return response;
	}, [states?._irev]);

	return {
		getResults,
		response: getResponse(),
	};
};
