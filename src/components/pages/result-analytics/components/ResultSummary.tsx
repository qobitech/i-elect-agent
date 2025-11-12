import { IIrevAnalyticsResponseVoteSummary } from '../../../../interface/state/IRev';
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
						<p className='font-24 m-0'>{(data?.[source]?.registeredVoters ?? '0')?.toLocaleString()}</p>
						{data?.[source]?.registeredVoters ? (
							<Indicator
								isValid={data?.sourceA?.registeredVoters === data?.sourceB?.registeredVoters}
								value={data?.[oppositeSource]?.registeredVoters ?? 0}
								position={
									(data?.[source]?.registeredVoters ?? 0) > (data?.[oppositeSource]?.registeredVoters ?? 0) ? 'up' : 'down'
								}
							/>
						) : null}
					</div>
				</div>
				<div>
					<OverViewHeader title='Accredited Voters' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{(data?.[source]?.accreditedVoters ?? '0')?.toLocaleString()}</p>
						{data?.[source]?.accreditedVoters ? (
							<Indicator
								isValid={data?.sourceA?.accreditedVoters === data?.sourceB?.accreditedVoters}
								value={data?.[oppositeSource]?.accreditedVoters ?? 0}
								position={
									(data?.[source]?.accreditedVoters ?? 0) > (data?.[oppositeSource]?.accreditedVoters ?? 0) ? 'up' : 'down'
								}
							/>
						) : null}
					</div>
				</div>
				<div>
					<OverViewHeader title='Valid Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{(data?.[source]?.validVotes ?? '0')?.toLocaleString()}</p>
						{data?.[source]?.validVotes ? (
							<Indicator
								isValid={data?.sourceA?.validVotes === data?.sourceB?.validVotes}
								value={data?.[oppositeSource]?.validVotes ?? 0}
								position={(data?.[source]?.validVotes ?? 0) > (data?.[oppositeSource]?.validVotes ?? 0) ? 'up' : 'down'}
							/>
						) : null}
					</div>
				</div>
				<div>
					<OverViewHeader title='Rejected Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{(data?.[source]?.rejectedVotes ?? '0')?.toLocaleString()}</p>
						{data?.[source]?.rejectedVotes ? (
							<Indicator
								isValid={data?.sourceA?.rejectedVotes === data?.sourceB?.rejectedVotes}
								value={data?.[oppositeSource]?.rejectedVotes ?? 0}
								position={(data?.[source]?.rejectedVotes ?? 0) > (data?.[oppositeSource]?.rejectedVotes ?? 0) ? 'up' : 'down'}
							/>
						) : null}
					</div>
				</div>
				<div>
					<OverViewHeader title='Total Votes' />
					<div className='f-row-15 align-items-center'>
						<p className='font-24 m-0'>{(data?.[source]?.totalVotes ?? '0')?.toLocaleString()}</p>
						{data?.[source]?.totalVotes ? (
							<Indicator
								isValid={data?.sourceA?.totalVotes === data?.sourceB?.totalVotes}
								value={data?.[oppositeSource]?.totalVotes ?? 0}
								position={(data?.[source]?.totalVotes ?? 0) > (data?.[oppositeSource]?.totalVotes ?? 0) ? 'up' : 'down'}
							/>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultAnalyticsSummary;
