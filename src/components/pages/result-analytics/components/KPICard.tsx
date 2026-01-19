import { CardItems } from '../../../utils/hooks';
import { type IResultAnalyticsKPICard } from '../ResultAnalytics.Helpers';
import { ProgressBar } from './ProgressBar';

const ResultAnalyticsKPICard = ({ label, expected, uploaded, onClick }: IResultAnalyticsKPICard) => (
	<div
		className='flex-shrink flex-auto border-box border-label rounded p-3 f-column-20 cursor-pointer shadow-sm'
		onClick={onClick}
	>
		<h2 className='font-18'>{label}</h2>

		<div className='f-row-20 justify-content-between'>
			<CardItems
				title='Expected'
				value={(expected ?? 0).toLocaleString()}
			/>
			<CardItems
				title='Uploaded'
				value={(uploaded ?? 0).toLocaleString()}
			/>
			<CardItems
				title='Remaining'
				value={((expected ?? 0) - (uploaded ?? 0)).toLocaleString()}
			/>
		</div>

		<ProgressBar
			showLabel={true}
			percentage={100}
			fillColorsVariant='success'
			value={uploaded}
			max={expected}
		/>
	</div>
);

export default ResultAnalyticsKPICard;
