import { useEffect, useState } from 'react';

import { getUserData, type ResultType } from '../constants/global';
import { type IActions } from '../interface/IAction';
import { type IStates } from '../interface/IReducer';
import { type IElectionOfficialByQuery } from '../interface/state/IElectionState';

export const useResultAnalytics = (
	actions: IActions | undefined,
	states: IStates | undefined,
	electionOfficialData: IElectionOfficialByQuery | undefined,
	isUploaded: boolean
) => {
	const resultType: Partial<Record<ResultType, ResultType>> = {
		EC8B: 'EC8A',
		EC8C: 'EC8B',
		EC8D: 'EC8C',
	};

	const getResults = (pageNumber?: number) => {
		actions?.get_ElectionResultAnalytics({
			query: [
				{
					key: 'PageNumber',
					value: isNaN(pageNumber || 0) ? 1 : pageNumber,
				},
				{
					key: 'PageSize',
					value: 20,
				},
				{
					key: 'ElectionId',
					value: electionOfficialData?.electionId,
				},
				{
					key: 'PartyId',
					value: getUserData().user?.PartyId,
				},
				{
					key: 'IsUploaded',
					value: isUploaded,
				},
				{
					key: 'ResultType',
					value: resultType[electionOfficialData?.assignment?.resultType?.toUpperCase() as ResultType],
				},
				// {
				// 	key: 'StateId',
				// 	value: getElectoralDivisionId('EC8D'),
				// },
				// {
				// 	key: 'LgaId',
				// 	value: getElectoralDivisionId('EC8C'),
				// },
				// {
				// 	key: 'WardId',
				// 	value: getElectoralDivisionId('EC8B'),
				// },
				// {
				// 	key: 'PollingUnitId',
				// 	value: getElectoralDivisionId('EC8A'),
				// },
				// {
				// 	key: 'IsAssigned',
				// 	value: '',
				// },
				// {
				// 	key: 'HasApplicant',
				// 	value: '',
				// },
				// {
				// 	key: 'Code',
				// 	value: electionOfficialData?.assignment?.code,
				// },
			],
		});
	};

	useEffect(() => {
		if (electionOfficialData?.electionId) {
			getResults();
		}
	}, [electionOfficialData?.electionId]);

	const data = states?._election?.get_ElectionResultAnalytics;

	return {
		refresh: getResults,
		data,
		load: states?._election?.get_ElectionResultAnalyticsLoading,
		resultType: resultType[electionOfficialData?.assignment?.resultType?.toUpperCase() as ResultType],
	};
};
