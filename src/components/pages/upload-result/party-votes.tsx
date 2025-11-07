import type React from 'react';
import { useEffect } from 'react';

import { useGlobalContext } from '../../../context/global';
import type { IVoteTabulation } from '../../../store/actions/query/result';
import { TypeButton } from '../../utils/button';
import { TypeInput } from '../../utils/input';
import { AISVG } from '../../utils/svgs';
import ExtractDataAI from './extract-data-ai';
import type { IPartyVotes, IVoteCount } from './utils';

const PartyVotes = () => {
	const {
		global: {
			state: { partyVotes, childCodes, selectedChildCode, selectedParentCode, resultType, onExtract, parentCodes },
			updateState,
		},
		onStage,
		states,
	} = useGlobalContext();

	const isCode = resultType !== 'EC8A';

	const updateChildCode = () => {
		const p = childCodes.map((i) => ({
			...i,
			status: i?.code === selectedChildCode?.code ? true : i.status,
		}));
		updateState('childCodes', [...p]);
	};

	const onPartyVoteCompleted = () => {
		if (isCode) {
			updateState('partyVoteStage', 'Child');
			updateChildCode();
		} else {
			onStage('Preview');
		}
	};

	const id = selectedChildCode?.codeId || selectedParentCode?.codeId;

	useEffect(() => {
		const extractedVotes = states?._result?.extract_ResultUrl?.voteTabulation!;

		const getVoteCount = (voteItem: IVoteCount) => {
			const vote = extractedVotes?.find((v) => v.politicalParty === voteItem.label);
			return vote?.votesInFigures || 0;
		};

		const pv = partyVotes.map((i) => ({
			...i,
			votes: i.votes.map((voteItem) => ({
				...voteItem,
				votes: getVoteCount(voteItem),
			})),
		}));

		updateState('partyVotes', pv);
	}, [states?._result?.extract_ResultUrl]);

	const partyVote: IPartyVotes = id ? partyVotes.filter((i) => i.id === id)[0] : { id: 0, votes: [] };

	console.log(partyVotes, id, parentCodes, selectedChildCode, 'juju');

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		const p: IPartyVotes[] = partyVotes.map((j) => ({
			...j,
			votes:
				partyVote.id === j.id
					? j.votes.map((vote) => ({
							...vote,
							votes: vote.partyId + '' === id ? parseInt(value) : vote.votes,
						}))
					: j.votes,
		}));
		updateState('partyVotes', [...p]);
	};

	const sortVotes = (a: IVoteCount, b: IVoteCount) => {
		if (a.label > b.label) return 1;
		if (a.label < b.label) return -1;
		return 0;
	};

	return (
		<div className='f-column-33'>
			<div className='f-row justify-content-between'>
				<div className='f-row-17 hw-mx align-items-center'>
					<p className='m-0 text-little color-label'>Input the vote count for each party.</p>
				</div>
				<TypeButton
					title={onExtract ? 'Close AI Data Extraction' : 'Extract Data with AI'}
					buttonSize='small'
					icon={<AISVG fill={onExtract ? '#000' : ''} />}
					onClick={() => updateState('onExtract', !onExtract)}
					buttonType={onExtract ? 'outlined' : 'bold'}
					disabled={states?._result?.extract_ResultUrlLoading}
				/>
			</div>
			<div className='f-row-responsive-reverse-33  justify-content-between'>
				<div className={`f-column-33 ${onExtract ? 'flex-basis-40' : 'w-100'}`}>
					<div className='grid-wrapper-strict-40 gap-33'>
						{partyVote?.votes?.sort(sortVotes).map((i, index) => (
							<TypeInput
								key={index}
								label={i.label}
								placeholder='Enter Votes'
								id={i.partyId + ''}
								value={i.votes || 0}
								imageUrl={i.logo}
								onClick={(e) => e.currentTarget.select()}
								onChange={handleOnChange}
								type='text'
								inputMode='numeric'
								pattern='[0-9]*'
							/>
						))}
					</div>
					<TypeButton
						buttonSize='small'
						title={isCode ? 'Save Votes' : 'Next >> Preview'}
						onClick={onPartyVoteCompleted}
					/>
				</div>
				<div className={`f-column-33 ${onExtract ? 'flex-basis-60' : 'd-none'}`}>
					<ExtractDataAI />
				</div>
			</div>
		</div>
	);
};

export default PartyVotes;
