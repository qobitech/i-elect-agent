import React from 'react';

import { TypeButton } from '../../utils/button';
import { Hvc } from '../../utils/hooks';
import { type ursType } from './utils';

const PartyVotesStageCTA = ({
	onStage,
	preview,
	isDone,
	isUpdate,
	onDone,
}: {
	onStage: (stage: ursType) => void;
	preview: boolean;
	isDone: boolean;
	isUpdate: boolean;
	onDone: () => void;
}) => (
	<Hvc
		removeDOM
		view={isDone}
		className='f-column-23'
	>
		<div className='f-row-12'>
			<TypeButton
				title='Previous'
				buttonType='outlined'
				buttonSize='small'
				className={`${preview ? 'w-100' : ''} border-0`}
				onClick={() => onStage('Result Summary')}
			/>
			{!preview && (
				<TypeButton
					title='Next >> Preview'
					className='w-100'
					buttonSize='small'
					onClick={onDone}
				/>
			)}
		</div>
		{preview ? (
			<div className='f-row-12'>
				<TypeButton
					buttonSize='small'
					buttonType='outlined'
					title='End Preview'
					onClick={() => onStage('Preview')}
					className='w-100 border-0'
				/>
				{isUpdate && (
					<TypeButton
						buttonSize='small'
						title='Update'
					/>
				)}
			</div>
		) : null}
	</Hvc>
);

export default PartyVotesStageCTA;
