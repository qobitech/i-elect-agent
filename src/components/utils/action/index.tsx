import './style.scss';

import React, { type FC } from 'react';

interface IActionIcon {
	icon: JSX.Element;
	action?: () => void;
}
interface IActionItem extends IActionIcon {
	label: string;
	description?: string;
}

export const ActionItem: FC<IActionItem> = ({ action, icon, label, description }) => (
	<div
		className='f-row-12 align-items-center cursor-pointer p-2 rounded border-0'
		onClick={action}
	>
		<div className='rounded p-2 f-row align-items-center justify-content-center icon-wrapper'>{icon}</div>
		<div className='f-column'>
			<p className='m-0 font-16 mb-1'>{label}</p>
			<p className='m-0 font-12'>{description}</p>
		</div>
	</div>
);

export const ActionIcon: FC<IActionIcon> = ({ action, icon }) => (
	<div
		className='rounded cursor-pointer p-2 f-row align-items-center justify-content-center icon-wrapper'
		onClick={action}
	>
		{icon}
	</div>
);
