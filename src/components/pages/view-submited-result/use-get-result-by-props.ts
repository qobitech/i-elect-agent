import { useCallback } from 'react';

import type { ResultType } from '../../../constants/global';
import { useReduxContext } from '../../../context/redux';
import type { IIRevResultStates } from '../../../interface/state/IRev';
import type { IRrevDataReq } from '../../../store/actions/query/irev';
import type { IUGR } from '../utils';

export const useGetResultsByProps = ({
	rstype,
	onFailure,
	onSuccess,
}: {
	rstype: ResultType;
	onSuccess?: (res: IIRevResultStates | undefined) => void;
	onFailure?: () => void;
}): IUGR => {
	const { actions, states } = useReduxContext();

	const getResults = (data?: IRrevDataReq) => {
		const req = data!;
		const getFunc = () => {
			if (rstype === 'EC8A') {
				req.localGovernments = [];
				req.wards = [];
				req.states = [];
				return actions?.get_IRevPollingUnitDataModelByID;
			}
			if (rstype === 'EC8B') {
				req.localGovernments = [];
				req.pollingUnits = [];
				req.states = [];
				return actions?.get_IRevWardDataModelByID;
			}
			if (rstype === 'EC8C') {
				req.pollingUnits = [];
				req.wards = [];
				req.states = [];
				return actions?.get_IRevLGADataModelByID;
			}
			if (rstype === 'EC8D') {
				req.pollingUnits = [];
				req.wards = [];
				req.localGovernments = [];
				return actions?.get_IRevStateDataModelByID;
			}
			return undefined;
		};
		getFunc?.()?.({
			paged: true,
			data: req,
			onSuccess: (res) => {
				onSuccess?.(res);
			},
			onFailure,
		});
	};

	const getResponse = useCallback(() => {
		let response: IIRevResultStates = {} as IIRevResultStates;
		const irev = states?._irev;
		if (rstype === 'EC8A') {
			response = irev?.get_IRevPollingUnitDataModelByID;
		}
		if (rstype === 'EC8B') {
			response = irev?.get_IRevWardDataModelByID;
		}
		if (rstype === 'EC8C') {
			response = irev?.get_IRevLGADataModelByID;
		}
		if (rstype === 'EC8D') {
			response = irev?.get_IRevStateDataModelByID;
		}
		return response;
	}, [states?._irev]);

	return {
		getResults,
		response: getResponse(),
	};
};
