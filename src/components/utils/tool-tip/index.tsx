import React from 'react';

import { Hvc } from '../hooks';
import { AlertSVG } from '../svgs';

const ToolTip = ({ tip }: { tip: string }) => (
	<Hvc
		removeDOM
		view={!!tip}
		className='hw-mx position-relative'
	>
		<div
			className='hw-mx tool-tip'
			data-tooltip={tip}
		>
			<AlertSVG />
		</div>
	</Hvc>
);

export default ToolTip;
