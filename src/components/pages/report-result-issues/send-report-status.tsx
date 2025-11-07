import React from 'react';

import { TypeButton } from '../../utils/button';
import { CheckSVG } from '../../utils/svgs';

const SendReportStatusStage = ({ onClose }: { onClose: () => void }) => (
	<div className='f-column-33'>
		<div className='border-label f-column-33 p-5 rounded align-items-center'>
			<CheckSVG
				color='green'
				width='40'
				height='40'
			/>
			<h4>The report has been submitted</h4>
			<p className='color-label'>You&apos; be notified once the report is reviewed</p>
		</div>
		<div className='f-row justify-content-center'>
			<TypeButton
				title='Exit'
				buttonSize='small'
				buttonType='danger'
				onClick={onClose}
			/>
		</div>
	</div>
);

export default SendReportStatusStage;
