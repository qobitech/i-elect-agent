import React from 'react';

import { useGlobalContext } from '../../../context/global';
import { OverViewHeader } from '../../utils/hooks';

export interface IVoteSummary {
	party: string;
	vote: number;
}

const VoteSummary = () => {
	const {
		global: {
			state: { partyVotes },
		},
	} = useGlobalContext();

	const getVoteSummary = (): IVoteSummary[] => {
		const votec =
			Array.from(
				partyVotes
					.flatMap((i) =>
						i.votes.map((j) => ({
							partyId: j.partyId,
							label: j.label,
							vote: parseInt((j.votes || 0) + ''),
						}))
					)
					.reduce((t, curr) => {
						if (t.has(curr.partyId)) {
							t.get(curr.partyId)!.vote += parseInt(curr.vote + '');
						} else {
							t.set(curr.partyId, { ...curr });
						}
						return t;
					}, new Map<number, { partyId: number; vote: number; label: string }>())
			).map((i) => ({
				party: i[1].label,
				vote: i[1].vote,
			})) || [];

		return votec;
	};

	const voteSummary = getVoteSummary();
	return (
		<div className='grid-wrapper-strict-25 gap-33'>
			{voteSummary.map((i, index) => (
				<div
					className='border-label rounded p-4 f-column-7'
					key={index}
				>
					<OverViewHeader title={i.party} />
					<p className='font-21'>{i.vote.toLocaleString()}</p>
				</div>
			))}
		</div>
	);
};

export default VoteSummary;
