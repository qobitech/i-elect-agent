import { ArrowDownSvg, ArrowUpSvg, CautionSvg, CheckSVG } from '../../utils/svgs';
import { type IIndicator } from './ResultAnalytics.Helpers';

export const Indicator = ({ isValid, onClick, value, position }: IIndicator) => (
	<div className='f-row-6 align-items-center'>
		{isValid ? (
			<CheckSVG
				color='green'
				onClick={onClick}
				focusable='true'
				aria-label='caution'
			/>
		) : (
			<CautionSvg
				onClick={onClick}
				focusable='true'
				aria-label='caution'
			/>
		)}
		{!isValid ? <p className='m-0'>({value})</p> : null}
		{!isValid ? <>{position === 'up' ? <ArrowUpSvg /> : <ArrowDownSvg />}</> : null}
	</div>
);
