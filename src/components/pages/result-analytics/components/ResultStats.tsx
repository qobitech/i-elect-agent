import { type ResultType } from '../../../../constants/global';
import { useGlobalContext } from '../../../../context/global';
import ResultAnalyticsKPICard from '../components/KPICard';
import { getResultAnalyticsElectoralDivisionStats } from '../ResultAnalytics.Helpers';

const ResultStats = ({ resultType }: { resultType: ResultType }) => {
	const { states } = useGlobalContext();

	// const stats = states?.resultanalytics_?.resultanalytics_getStats?.data;

	// const electoralDivisionStats = getResultAnalyticsElectoralDivisionStats(stats, resultType);

	return (
		<ResultAnalyticsKPICard
			label={`${resultType} Results`}
			expected={0}
			uploaded={0}
		/>
	);
};

export default ResultStats;
