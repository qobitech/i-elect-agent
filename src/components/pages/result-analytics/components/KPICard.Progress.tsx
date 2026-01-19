import { OverViewHeader } from '../../../utils/hooks';
import { ProgressBar } from './ProgressBar';

interface Props {
	label: string;
	progress: number[];
}

const ResultAnalyticsKPICardProgress = ({ label, progress }: Props) => (
	<div className='flex-shrink flex-auto border-box border-label rounded p-3 f-column-10'>
		<OverViewHeader title={label} />

		<div className='f-row-17 mt-auto'>
			{progress.map((progressItem, index) => (
				<ProgressBar
					label={label}
					showLabel={false}
					percentage={100}
					fillColorsVariant='success'
					value={progressItem}
					key={index}
				/>
			))}
		</div>
	</div>
);

export default ResultAnalyticsKPICardProgress;
