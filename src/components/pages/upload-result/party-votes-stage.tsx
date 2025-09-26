import React, { useEffect } from 'react';

import type { ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { Hvc } from '../../utils/hooks';
import { BackArrowSVG } from '../../utils/svgs';
import ChildCodesStage from './child-codes';
import PartyVotes from './party-votes';

export const getResultCodeTitle = (resultType: ResultType) => {
	switch (resultType) {
		case 'EC8B':
			return { parent: 'Ward', child: 'Polling Unit' };
		case 'EC8C':
			return { parent: 'LGA', child: 'Ward' };
		case 'EC8D':
			return { parent: 'State', child: 'LGA' };
		default:
			return { parent: '', child: '' };
	}
};

const PartyVotesStage = () => {
	const {
		global: {
			state: { isPreview: preview, partyVoteStage, childCodes, resultType },
			updateState,
		},
		onStage,
	} = useGlobalContext();

	const isCode = resultType !== 'EC8A';

	useEffect(() => {
		updateState('partyVoteStage', isCode ? 'Child' : 'Party Votes');
	}, []);

	const isDone = childCodes.some((i) => i.status);

	const onDone = () => {
		onStage('Preview');
	};

	const isUpdate = false;

	return (
		<div className='f-column-33'>
			<Hvc
				removeDOM
				view={partyVoteStage === 'Child'}
				className='f-column-33'
			>
				<div
					className='f-row-12 align-items-center hw-mx cursor-pointer'
					onClick={() => onStage(preview ? 'Preview' : 'Result Summary')}
				>
					<BackArrowSVG />
					<p className='m-0 text-little'>Back</p>
				</div>
				<ChildCodesStage />
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
			</Hvc>
			<Hvc
				removeDOM
				view={partyVoteStage === 'Party Votes'}
				className='f-column-33'
			>
				<PartyVotes />
			</Hvc>
		</div>
	);
};

export default PartyVotesStage;
