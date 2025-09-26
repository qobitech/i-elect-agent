import './style.scss';

import React, { type FC } from 'react';

interface IActionIcon {
	icon: JSX.Element;
	action: () => void;
}
interface IActionItem extends IActionIcon {
	label: string;
}

export const ActionItem: FC<IActionItem> = ({ action, icon, label }) => (
	<div
		className='f-row-12 align-items-center cursor-pointer action-item-component p-2 rounded'
		onClick={action}
	>
		<div className='rounded p-2 f-row align-items-center justify-content-center icon-wrapper'>{icon}</div>
		<p className='m-0 font-16'>{label}</p>
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
