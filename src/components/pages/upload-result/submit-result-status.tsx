import React from 'react';

import { TypeButton } from '../../utils/button';
import { CheckSVG } from '../../utils/svgs';

const SubmitResultStatusStage = ({
	onClick,
	title,
	description,
	btnTitle,
}: {
	title: string;
	description?: string;
	btnTitle: string;
	onClick: () => void;
}) => (
	<div className='f-column-33'>
		<div className='border-label f-column-33 p-5 rounded align-items-center justify-content-center text-center'>
			<CheckSVG
				color='green'
				width='40'
				height='40'
			/>
			<h4>{title}</h4>
			{description && <p className='color-label'>{description}</p>}
		</div>
		<div className='f-column-12 justify-content-center'>
			<TypeButton
				title={btnTitle}
				buttonSize='small'
				onClick={onClick}
				className='w-100'
			/>
		</div>
	</div>
);

export default SubmitResultStatusStage;
