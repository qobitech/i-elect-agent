import React, { useEffect } from 'react';

import type { ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { Hvc, RefreshComponent } from '../../utils/hooks';
import { BackArrowSVG } from '../../utils/svgs';
import ChildCodesStage from './child-codes';
import PartyVotes from './party-votes';
import PartyVotesStageCTA from './party-votes-stage-cta';

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
		getCodeProps,
		onStage,
	} = useGlobalContext();

	const { handleCodes, load } = getCodeProps;

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
				<PartyVotesStageCTA
					isDone={isDone}
					onDone={onDone}
					preview={preview}
					onStage={onStage}
					isUpdate={isUpdate}
				/>
			</Hvc>
			<Hvc
				removeDOM
				view={partyVoteStage === 'Party Votes'}
				className='f-column-33'
			>
				<div className='f-row-7 align-items-center hw-mx cursor-pointer'>
					<p className='m-0 text-little color-label'>Refresh</p>
					<RefreshComponent
						onRefresh={handleCodes}
						load={load}
					/>
				</div>
				<PartyVotes />
			</Hvc>
		</div>
	);
};

export default PartyVotesStage;
