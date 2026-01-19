import '../button/index.scss';

import React from 'react';

import type { btnSize, btnType } from '../button';
import { PulseSVG } from '../svgs';

export interface IOptionAction {
	label: string;
	action?: () => void;
	disabled?: boolean;
}

export const ActionComponent = ({
	actions,
	title,
	load,
	buttonType,
	buttonSize,
}: {
	title?: string;
	actions?: IOptionAction[];
	load?: boolean;
	buttonType?: btnType;
	buttonSize?: btnSize;
}) => (
	<div className='dropdown type-button'>
		<button
			title='Action'
			className={`dropdown-toggle ${buttonType || ''} ${buttonSize || ''}`}
			type='button'
			id='dropdownMenuButton'
			data-toggle='dropdown'
			aria-haspopup='true'
			aria-expanded='false'
			style={{ fontSize: '11px' }}
		>
			{title || 'Action'}
			{load ? (
				<>
					&nbsp;&nbsp;
					<PulseSVG />
				</>
			) : null}
		</button>

		<div
			className='dropdown-menu mr-4 mt-2'
			aria-labelledby='dropdownMenuButton'
		>
			{actions?.map((i, index) => (
				<p
					className={`dropdown-item m-0 text-little py-2 ${i.disabled ? 'cursor-not-allowed color-disabled' : 'cursor-pointer'}`}
					onClick={i.disabled ? undefined : i.action}
					key={index}
				>
					{i.label}
				</p>
			))}
		</div>
	</div>
);
