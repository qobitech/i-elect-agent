import { type FC, useState } from 'react';
import styled from 'styled-components';

import { type IStates } from '../../../interface/IReducer';
import { type IIRevResultState } from '../../../interface/state/IRev';
import { type IUSH } from '../../layout/state-hook';
import { TypeButton } from '../../utils/button';
import { Hvc, MediaItem } from '../../utils/hooks';
import { OneColumnSVG, TwoColumnSVG } from '../../utils/svgs';
import { type reviewType } from './helpers';

interface IReviewAction {
	result: IIRevResultState;
}

const ReviewAction: FC<IReviewAction> = ({ result }) => (
	<>
		<div className='f-row-20 align-items-stretch w-100'>
			{/* document */}
			<Hvc
				view
				className='f-column-10 w-100 flex-basis-100'
			>
				{/* document */}
				<div
					className='w-100 text-center'
					style={{ height: '67vh', overflow: 'auto' }}
				>
					<MediaItem url={result?.documentUrls?.[0]} />
				</div>
			</Hvc>
		</div>
	</>
);

export default ReviewAction;

export const SwitchLayout = ({ defaultIndex, onLayout }: { defaultIndex: number; onLayout: (item: number) => void }) => {
	const [selected, setSelected] = useState<number>(defaultIndex);

	const handleSelectLayout = (item: number) => () => {
		setSelected(item);
		onLayout(item);
	};
	return (
		<SwitchLayoutComponent className='f-row-7 align-items-center'>
			<div
				className={`f-row-7 border rounded p-2 align-items-center tab-switch-item ${selected === 1 ? 'active' : ''}`}
				onClick={handleSelectLayout(1)}
			>
				<p className='m-0 text-tiny'>One column</p>
				<OneColumnSVG color={selected === 1 ? '#fff' : ''} />
			</div>
			<div
				className={`f-row-7 border rounded p-2 align-items-center tab-switch-item ${selected === 2 ? 'active' : ''}`}
				onClick={handleSelectLayout(2)}
			>
				<p className='m-0 text-tiny'>Two column</p>
				<TwoColumnSVG color={selected === 2 ? '#fff' : ''} />
			</div>
		</SwitchLayoutComponent>
	);
};

const SwitchLayoutComponent = styled.div`
	.tab-switch-item {
		height: 35px;
		cursor: pointer;
		&.active {
			background: #000;
			color: #fff;
		}
	}
`;
