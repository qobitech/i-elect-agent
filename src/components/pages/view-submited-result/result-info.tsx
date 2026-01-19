import type { FC } from 'react';

import type { ResultType } from '../../../constants/global';
import type { IIRevResultState } from '../../../interface/state/IRev';
import { CardItems, Hvc } from '../../utils/hooks';
import { _codeSeparator, formatINECDate } from './helpers';

interface IResultSummary {
	result: IIRevResultState;
	resultType: ResultType;
	view: boolean;
}

const ResultInfo: FC<IResultSummary> = ({ result, view, resultType }) => {
	const resultInfo = [
		{
			label: 'Approved By',
			value: result?.approvedBy?.name || 'Not approved',
			copy: false,
		},
		{
			label: result?.approvedBy?.name ? 'Approved Date' : '',
			value: result?.approvedAt ? formatINECDate(result?.approvedAt) : '...',
			copy: false,
		},
		{
			label: 'State',
			value: result?.state?.name || '',
			copy: false,
		},
		{
			label: resultType === 'EC8D' ? '' : 'LGA',
			value: result?.localGovernment?.name || '',
			copy: false,
		},
		{
			label: resultType === 'EC8C' || resultType === 'EC8D' ? '' : 'RA/Ward',
			value: result?.ward?.name || '',
			copy: false,
		},
		{
			label: resultType === 'EC8A' ? 'Polling Unit' : '',
			value: result?.pollingUnit?.name || '...',
			copy: false,
		},
		{
			label: resultType === 'EC8A' ? 'Polling Unit Code' : '',
			value: _codeSeparator(result?.pollingUnit?.code || '...').pollingunit,
			copy: true,
		},
		{
			label: 'Presiding Officer',
			value: result?.presidingOfficer?.name || '',
			copy: false,
		},
		{
			label: result?.approvedBy?.name ? 'Status' : '',
			value: result?.status || '',
			copy: false,
		},
	];
	return (
		<Hvc
			removeDOM
			view={view}
			className='f-column-33'
		>
			<h3 className='m-0'>Election Result Info</h3>
			<section className='f-column-40 gap-40'>
				<CardItems
					title='Election'
					value={result?.election?.name}
				/>
				<section className='grid-wrapper-40 gap-40'>
					{resultInfo
						.filter((i) => i.label)
						.map((i, index) => (
							<CardItems
								title={i.label}
								value={i.value || ''}
								copy={i.copy}
								key={index}
							/>
						))}
				</section>
			</section>
		</Hvc>
	);
};

export default ResultInfo;
