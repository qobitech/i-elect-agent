import React from 'react';

import { TypeButton } from '../../utils/button';
import { CheckSVG } from '../../utils/svgs';

const UploadResultStatusStage = ({ onNext, onView }: { onView: () => void; onNext: () => void }) => (
	<div className='f-column-33'>
		<div className='border-label f-column-33 p-5 rounded align-items-center justify-content-center text-center'>
			<CheckSVG
				color='green'
				width='40'
				height='40'
			/>
			<h4>The Election Result has been uploaded successfully</h4>
		</div>
		<div className='f-column-23 justify-content-center'>
			<TypeButton
				title='View Uploaded Result'
				buttonSize='small'
				onClick={onView}
				className='w-100'
				buttonType='outlined'
			/>
			<TypeButton
				title='Next >> Election Result Summary'
				buttonSize='small'
				onClick={onNext}
				className='w-100'
			/>
		</div>
	</div>
);

export default UploadResultStatusStage;
