import ResultAnalyticsKPICard from './KPICard';
import ResultAnalyticsKPICardProgress from './KPICard.Progress';

interface Props {
	totalRecords: number;
	uploadedResults: number;
	pendingResults: number;
}

const ResultAnalyticsKPI = ({ totalRecords, uploadedResults, pendingResults }: Props) => (
	<div className='grid-wrapper-100 gap-21'>
		<ResultAnalyticsKPICard
			label='LGA'
			expected={totalRecords}
			uploaded={totalRecords}
		/>

		<ResultAnalyticsKPICard
			label='Ward'
			expected={totalRecords}
			uploaded={totalRecords}
		/>

		<ResultAnalyticsKPICard
			label='Polling Unit'
			expected={totalRecords}
			uploaded={totalRecords}
		/>
	</div>
);

export default ResultAnalyticsKPI;
