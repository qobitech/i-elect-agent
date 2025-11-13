import { type ResultType } from '../../../constants/global';
import { type IPartyState } from '../../../interface/state/IParty';
import { type IIrevAnalyticsResponseData } from '../../../interface/state/IRev';
import Table, { type ITableRecord } from '../../utils/table';
import { Indicator } from './ResultTableSection.Indicator';

interface IResultTableSection {
	source: 'sourceA' | 'sourceB';
	resultType: ResultType;
	politicalParties?: IPartyState[];
	analyticsData: IIrevAnalyticsResponseData[] | undefined;
}

const tableHeaderNameByResultypeObj: Partial<Record<ResultType, string>> = {
	EC8B: 'Polling Unit',
	EC8C: 'RA/Ward',
	EC8D: 'Local Government',
};

const ResultTableSection = ({ source, resultType, politicalParties, analyticsData }: IResultTableSection) => {
	const resultTypeTableHeader = tableHeaderNameByResultypeObj[resultType] ?? '';

	const oppositeSource = source === 'sourceA' ? 'sourceB' : 'sourceA';

	const tableHeader = [resultTypeTableHeader, 'Code', ...(politicalParties?.map((i) => i.shortName) ?? '')];

	const getSourceVoteCount = (item: IIrevAnalyticsResponseData, source: 'sourceA' | 'sourceB') => {
		const itemSource = item[source];

		return itemSource?.voteCount ?? [];
	};

	const tableRecord = analyticsData?.map((item) => {
		const mainSourceVoteCount = getSourceVoteCount(item, source);
		const oppositeSourceVoteCount = getSourceVoteCount(item, oppositeSource);
		return {
			id: item.entityName,
			row: [
				{
					value: item.entityName ?? '...',
					cellWidth: '150px',
				},
				{
					value: item.code ?? '...',
					cellWidth: '120px',
				},
				...mainSourceVoteCount.map((e, index) => ({
					value: (
						<div
							className='f-row-15 align-items-center'
							style={{ width: '150px' }}
						>
							<p className='font-14 m-0'>{e.voteCount.toLocaleString()}</p>

							<Indicator
								isValid={e.voteCount === oppositeSourceVoteCount?.[index]?.voteCount}
								value={oppositeSourceVoteCount?.[index]?.voteCount}
								position={e.voteCount > oppositeSourceVoteCount?.[index]?.voteCount ? 'up' : 'down'}
							/>
						</div>
					),
				})),
			],
		};
	}) as ITableRecord[];

	return (
		<div style={{ overflow: 'auto', width: '100%', position: 'relative', minHeight: '400px' }}>
			<Table
				record={tableRecord}
				header={tableHeader}
				stickyColumns={2}
			/>
		</div>
	);
};

export default ResultTableSection;
