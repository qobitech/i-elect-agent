import Table, { type ITableRecord } from '../../../utils/table';
import { tableHeader } from '../ResultAnalytics.Helpers';

const ResultAnalyticsProgressTable = () => {
	const tableBody: ITableRecord[] = [];

	return (
		<div>
			<Table
				header={tableHeader}
				record={tableBody}
			/>
		</div>
	);
};

export default ResultAnalyticsProgressTable;
