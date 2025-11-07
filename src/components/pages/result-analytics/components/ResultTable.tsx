import { HvcLoad } from '../../../utils/hooks';
import PaginationComponent from '../../../utils/pagination';
import Table from '../../../utils/table';
import { type IResultTable } from '../ResultAnalytics.Helpers';

export const ResultTable = ({ load, refresh, name, tableBody, totalPages, currentPage, handlePagination }: IResultTable) => (
	<HvcLoad
		load={load}
		view
		className='f-column-33'
		onRefresh={refresh}
	>
		<div className='border-label rounded p-3 max-height-400 over-flow-auto'>
			<Table
				header={[`${name} Code`, `${name} ID`, 'Action']}
				record={tableBody}
				currentPage={currentPage || 1}
			/>
		</div>

		<PaginationComponent
			currentPage={currentPage || 0}
			pages={totalPages || 0}
			handlePagination={handlePagination}
		/>
	</HvcLoad>
);
