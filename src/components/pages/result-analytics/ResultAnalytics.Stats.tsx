import { useEffect } from 'react';

import { type ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import { type IElectionOfficialByQuery } from '../../../interface/state/IElectionState';
import { HvcLoad } from '../../utils/hooks';
import ResultAnalyticsKPICard from './components/KPICard';

interface IResultAnalyticsStats {
	goToElectoralDivision: (resultType: ResultType) => () => void;
	electionOfficialData?: IElectionOfficialByQuery;
}

const ResultAnalyticsStats = ({ goToElectoralDivision, electionOfficialData }: IResultAnalyticsStats) => {
	const { states, actions } = useGlobalContext();

	const refresh = () => {};

	useEffect(() => {
		refresh();
	}, []);

	const resultType = electionOfficialData?.assignment.resultType;

	return (
		<HvcLoad
			className='grid-wrapper-100 gap-21'
			view
		>
			{resultType?.toLowerCase() === 'ec8b' && (
				<ResultAnalyticsKPICard
					label='EC8A Results'
					expected={10}
					uploaded={10}
					onClick={goToElectoralDivision('EC8A')}
				/>
			)}

			{resultType?.toLowerCase() === 'ec8c' && (
				<ResultAnalyticsKPICard
					label='EC8B Results'
					expected={0}
					uploaded={0}
					onClick={goToElectoralDivision('EC8B')}
				/>
			)}

			{resultType?.toLowerCase() === 'ec8d' && (
				<ResultAnalyticsKPICard
					label='EC8C Results'
					expected={0}
					uploaded={0}
					onClick={goToElectoralDivision('EC8C')}
				/>
			)}
		</HvcLoad>
	);
};

export default ResultAnalyticsStats;
