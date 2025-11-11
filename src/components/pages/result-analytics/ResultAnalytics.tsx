import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { getUserData, type ResultType } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import { useGlobalContext } from '../../../context/global';
import { IElectionResultStatsData } from '../../../interface/state/IElectionState';
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
	const { states, actions, global, rsProps } = useGlobalContext();
	const { notificationGlobal, get_ElectionOfficial, get_ElectionByID, get_CountryStateByID, get_Party } = actions!;

	const navigate = useNavigate();

	const onError = () => {
		notificationGlobal('Something went wrong', false);
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
							// get_CountryStateByID({
							// 	id: data?.data?.constituency?.stateId + '',
							// });
							actions?.get_ElectionResultAnalyticsStats({ electionId: String(electionOfficial.electionId) });
						},
					});
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

	const electionResultStatsLoading = states?._election?.get_ElectionResultAnalyticsStatsLoading;
	const electionResultStats = states?._election?.get_ElectionResultAnalyticsStats?.data;

	const isPageLoading =
		!electionOfficialData?.assignment.resultType &&
		states?._election?.get_ElectionOfficialByIdLoading &&
		electionResultStatsLoading;

	const resultType = electionOfficialData?.assignment.resultType.toUpperCase() as ResultType;

	const statsResultType = getStatsResultType(resultType, electionResultStats!);

	if (electionOfficialData?.assignment.resultType.toLowerCase() === 'ec8a') return <>Loading...</>;

	return (
		<HvcLoad
			view
			className='f-column-43 p-4'
		>
			<ResultAnalyticsHeader electionName={electionOfficialData?.election ?? 'i'} />

			<ResultAnalyticsKPICard
				label={`${statsResultType?.sourceA.resultType} Results (Source A)`}
				expected={statsResultType?.sourceA?.stats?.totalCount}
				uploaded={statsResultType?.sourceA?.stats?.uploadedCount}
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
									data={sampleTableDataSummary}
								/>
							</div>

							<ResultTableSection
								source={source}
								resultType={resultType}
								politicalParties={politicalParties}
							/>
						</>
					)
				}
			</ResultSourceWrapperSection>
		</HvcLoad>
	);
};

export default ResultAnalytics;
