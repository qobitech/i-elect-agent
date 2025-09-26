import type { FC } from 'react';

import { Hvc } from '../hooks';
import { InfoSVG } from '../svgs';
import type { ISelecteditems } from './utils';

export const SelectedItems: FC<ISelecteditems> = ({ items, onRemove, label }) => (
	<div className='f-column-20'>
		<div className='f-row-10 flex-wrap'>
			{items.map((i, index) => (
				<div
					key={index}
					className='rounded px-2 py-1 f-row-7 aic text-tiny'
					onClick={() => onRemove(i.value)}
					style={{ border: '1px solid #f1f1f1', cursor: 'default' }}
				>
					<p className='m-0 '>{i.label}</p>
					<i className='fas fa-times color-label' />
				</div>
			))}
		</div>
		<Hvc
			removeDOM
			view={!!items.length}
			className='f-row-7 aic'
		>
			<InfoSVG />
			<p className='m-0 text-tiny color-danger'>
				You&apos;ve selected {items.length} {label ?? 'items'}
				{items.length === 1 ? '' : 's'}
			</p>
		</Hvc>
	</div>
);
