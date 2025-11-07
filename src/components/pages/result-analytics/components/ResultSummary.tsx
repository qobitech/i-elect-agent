import { CardItems, OverViewHeader } from '../../../utils/hooks';
import { type IResultAnalyticsKPICard, type IResultAnalyticsSummaryCard } from '../ResultAnalytics.Helpers';
import { Indicator } from '../ResultTableSection.Indicator';
import { ProgressBar } from './ProgressBar';

const ResultAnalyticsSummary = ({ data, source }: IResultAnalyticsSummaryCard) => {
	const oppositeSource = source === 'sourceA' ? 'sourceB' : 'sourceA';
	return (
		<div className='flex-shrink flex-auto border-box border-label rounded p-4 f-column-20 cursor-pointer shadow-sm'>
			<h2 className='font-18'>Vote Summary</h2>

			<div className='grid-wrapper-15 gap-33'>
				<div>
					<OverViewHeader title='Registered Voters' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{data[source]?.registeredVoters?.toLocaleString()}</p>
						<Indicator
							isValid={data.sourceA.registeredVoters === data.sourceB.registeredVoters}
							value={data[oppositeSource].registeredVoters}
							position={data[source]?.registeredVoters > data[oppositeSource]?.registeredVoters ? 'up' : 'down'}
						/>
					</div>
				</div>
				<div>
					<OverViewHeader title='Accredited Voters' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{data[source]?.accreditedVoters?.toLocaleString()}</p>

						<Indicator
							isValid={data.sourceA.accreditedVoters === data.sourceB.accreditedVoters}
							value={data[oppositeSource].accreditedVoters}
							position={data[source]?.accreditedVoters > data[oppositeSource]?.accreditedVoters ? 'up' : 'down'}
						/>
					</div>
				</div>
				<div>
					<OverViewHeader title='Valid Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{data[source]?.validVotes?.toLocaleString()}</p>

						<Indicator
							isValid={data.sourceA.validVotes === data.sourceB.validVotes}
							value={data[oppositeSource].validVotes}
							position={data[source]?.validVotes > data[oppositeSource]?.validVotes ? 'up' : 'down'}
						/>
					</div>
				</div>
				<div>
					<OverViewHeader title='Rejected Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{data[source]?.rejectedVotes?.toLocaleString()}</p>

						<Indicator
							isValid={data.sourceA.rejectedVotes === data.sourceB.rejectedVotes}
							value={data[oppositeSource].rejectedVotes}
							position={data[source]?.rejectedVotes > data[oppositeSource]?.rejectedVotes ? 'up' : 'down'}
						/>
					</div>
				</div>
				<div>
					<OverViewHeader title='Total Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{data[source]?.totalVotes?.toLocaleString()}</p>

						<Indicator
							isValid={data.sourceA.totalVotes === data.sourceB.totalVotes}
							value={data[oppositeSource].totalVotes}
							position={data[source]?.totalVotes > data[oppositeSource]?.totalVotes ? 'up' : 'down'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultAnalyticsSummary;
