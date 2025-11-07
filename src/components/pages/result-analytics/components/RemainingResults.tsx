import { useState } from 'react';

import { getUserData, type ResultType } from '../../../../constants/global';
import { useGlobalContext } from '../../../../context/global';
import { useResultAnalytics } from '../../../../hooks/useResultAnalytics';
import { type ITableRecord } from '../../../utils/table';
import { getElectoralDivisionByResultType, type IUploadedResult, mapUploadedResultTableData } from '../ResultAnalytics.Helpers';
import { ResultTable } from './ResultTable';

const RemainingResults = ({ electionOfficialData }: IUploadedResult) => {
	const { actions, states } = useGlobalContext();

	const { refresh, data, load, resultType } = useResultAnalytics(actions, states, electionOfficialData, false);

	const electoralDivisionName = getElectoralDivisionByResultType(resultType!);

	const tableBody = data?.data.map((i) => ({
		id: i.id,
		row: [
			{
				value: i.code,
			},
			{
				value: i.pollingUnitId,
			},
		],
	})) as unknown as ITableRecord[];

	const handlePagination = (selectedItem: { selected: number }) => {
		refresh(selectedItem.selected + 1);
	};

	return (
		<ResultTable
			name={electoralDivisionName}
			handlePagination={handlePagination}
			refresh={refresh}
			tableBody={tableBody}
			currentPage={data?.currentPage}
			totalPages={data?.totalPages}
			load={load}
			key={electoralDivisionName}
		/>
	);
};

export default RemainingResults;
