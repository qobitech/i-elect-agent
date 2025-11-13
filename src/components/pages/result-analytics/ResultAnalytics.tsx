import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserData, type ResultType } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import { useGlobalContext } from '../../../context/global';
import { useResultAnalytics } from '../../../hooks/useResultAnalytics';
import { type IElectionOfficialByQuery } from '../../../interface/state/IElectionState';
import { HvcLoad, useCallAPI } from '../../utils/hooks';
import { PulseSVG } from '../../utils/svgs';
import ResultAnalyticsHeader from './components/Header';
import ResultAnalyticsKPICard from './components/KPICard';
import ResultAnalyticsSummary from './components/ResultSummary';
import { getStatsResultType, sampleTableDataSummary } from './ResultAnalytics.Helpers';
import ResultSourceWrapperSection from './ResultSourceWrapperSection';
import ResultTableSection from './ResultTableSection';

export interface IDashboard {
	props?: any;
}

const ResultAnalytics = () => {
	const { states, actions } = useGlobalContext();
	const { notificationGlobal, get_ElectionOfficial, get_ElectionByID, get_CountryStateByID, get_Party } = actions!;

	const navigate = useNavigate();

	const onError = () => {
		notificationGlobal('Something went wrong', false);
	};

	const getTableStats = (electionOfficialData: IElectionOfficialByQuery) => {
		actions?.get_IRevResultAnalyticsStats({
			data: {
				electionId: electionOfficialData?.electionId,
				resultTypeA: getAPIResultType[electionOfficialData?.assignment.resultType.toUpperCase() as ResultType]?.resultA || '',
				resultTypeB: getAPIResultType[electionOfficialData?.assignment.resultType.toUpperCase() as ResultType]?.resultB || '',
				entityCode: electionOfficialData?.assignment.code,
			},
		});
	};

	const getElectionOfficialData = () => {
		get_ElectionOfficial({
			query: [
				{
					key: 'UserId',
					value: getUserData().user?.UserId,
				},
			],
			onFailure: () => {
				onError();
			},
			onSuccess: (res) => {
				const electionOfficial = res.data.find((i) => i.userId === Number(getUserData().user?.UserId));

				if (electionOfficial) {
					get_ElectionByID({
						id: String(electionOfficial.electionId),
						onSuccess: () => {
							actions?.get_ElectionResultAnalyticsStats({ electionId: String(electionOfficial.electionId) });
						},
					});

					getTableStats(electionOfficial);
				}
			},
		});
	};

	const getPoliticalParties = () => {
		get_Party({});
	};

	const electionOfficialData = states?._election?.get_ElectionOfficial?.data.find(
		(i) => i.userId === Number(getUserData().user?.UserId)
	);

	const politicalParties = states?._party?.get_Party?.data;

	useEffect(() => {
		if (electionOfficialData?.assignment.resultType.toLowerCase() === 'ec8a') {
			actions?.notificationGlobal('You are not permitted to view this page', false);
			const timeout = setTimeout(() => {
				navigate(pageurl.OVERVIEW);
			}, 500);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [electionOfficialData]);

	useCallAPI(getElectionOfficialData, !electionOfficialData);
	useCallAPI(getPoliticalParties, !politicalParties);

	const getAPIResultType: Partial<Record<ResultType, { resultA: ResultType; resultB: ResultType }>> = {
		EC8B: { resultA: 'EC8B', resultB: 'EC8A' },
		EC8C: { resultA: 'EC8C', resultB: 'EC8B' },
		EC8D: { resultA: 'EC8D', resultB: 'EC8C' },
	};

	const electionResultStatsLoading = states?._election?.get_ElectionResultAnalyticsStatsLoading;
	const electionResultStats = states?._election?.get_ElectionResultAnalyticsStats?.data;

	const isPageLoading =
		!electionOfficialData?.assignment.resultType &&
		states?._election?.get_ElectionOfficialByIdLoading &&
		electionResultStatsLoading;

	const resultType = electionOfficialData?.assignment.resultType.toUpperCase() as ResultType;

	const { refresh, data, load } = useResultAnalytics(actions, states, electionOfficialData, true);

	const statsResultType = getStatsResultType(resultType, electionResultStats!);

	const analyticsData = states?._irev?.get_IRevResultAnalyticsStats;

	if (electionOfficialData?.assignment.resultType.toLowerCase() === 'ec8a') return <>Loading...</>;

	return (
		<HvcLoad
			view
			className='f-column-43 p-4'
		>
			<ResultAnalyticsHeader electionName={electionOfficialData?.election ?? 'i'} />

			<ResultAnalyticsKPICard
				label={`${statsResultType?.sourceA.resultType} Results (Source A)`}
				expected={data?.statistics?.total}
				uploaded={data?.statistics?.uploadedCount}
			/>

			<ResultSourceWrapperSection resultType={resultType}>
				{(source) =>
					isPageLoading ? (
						<PulseSVG />
					) : (
						<>
							<div className='grid-wrapper-100 gap-33'>
								<ResultAnalyticsSummary
									source={source}
									data={analyticsData?.voteSummary}
								/>
							</div>

							<ResultTableSection
								source={source}
								resultType={resultType}
								politicalParties={politicalParties}
								analyticsData={analyticsData?.data}
							/>
						</>
					)
				}
			</ResultSourceWrapperSection>
		</HvcLoad>
	);
};

export default ResultAnalytics;
