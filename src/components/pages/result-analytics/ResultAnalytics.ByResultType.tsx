import { useGlobalContext } from '../../../context/global';
import { type IElectionOfficialByQuery } from '../../../interface/state/IElectionState';
import { HvcLoad } from '../../utils/hooks';
import { TabSection, useTabSection } from '../../utils/tab-section';
import ResultAnalyticsHeader from './components/Header';
import RemainingResults from './components/RemainingResults';
import ResultStats from './components/ResultStats';
import UploadedResults from './components/UploadedResults';
import { analyticsElectoralDivisionTabObject } from './ResultAnalytics.Helpers';

interface IResultAnalyticsElectoralDivision {
	electionOfficialData?: IElectionOfficialByQuery;
}

const ResultAnalyticsElectoralDivision = ({ electionOfficialData }: IResultAnalyticsElectoralDivision) => {
	const { states } = useGlobalContext();

	const { tabProps, isTab } = useTabSection(analyticsElectoralDivisionTabObject.UPLOADED, analyticsElectoralDivisionTabObject);

	return (
		<HvcLoad
			view
			className='f-column-33'
		>
			<div className='f-column-18'>
				<TabSection
					tabProps={tabProps}
					tabGap='12'
					type='block'
					position='center'
				/>

				{isTab(analyticsElectoralDivisionTabObject.UPLOADED) ? (
					<UploadedResults electionOfficialData={electionOfficialData} />
				) : null}

				{isTab(analyticsElectoralDivisionTabObject.REMAINING) ? (
					<RemainingResults electionOfficialData={electionOfficialData} />
				) : null}
			</div>
		</HvcLoad>
	);
};

export default ResultAnalyticsElectoralDivision;
