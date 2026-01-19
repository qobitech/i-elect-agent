import { useState } from 'react';

import { getUserData, type ResultType } from '../../../../constants/global';
import { useGlobalContext } from '../../../../context/global';
import { useResultAnalytics } from '../../../../hooks/useResultAnalytics';
import { type actionComponent } from '../../../utils/right-section';
import { type ITableRecord } from '../../../utils/table';
import { getElectoralDivisionByResultType, type IUploadedResult, mapUploadedResultTableData } from '../ResultAnalytics.Helpers';
import { ResultTable } from './ResultTable';

const UploadedResults = ({ electionOfficialData }: IUploadedResult) => {
	const { actions, states, rsProps } = useGlobalContext();

	const { refresh, data, load, resultType } = useResultAnalytics(actions, states, electionOfficialData, true);

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
		rowActions: [
			{
				actionType: 'btn-options',
				buttonType: 'bold',
				options: [
					{
						label: 'View Result',
						action: () => {},
					},
					{
						label: 'Report',
						action: () => {
							rsProps?.callSection({
								action: 'view',
								component: 'report-result-issues',
								title: `Report Issues for ${i.code}`,
								data: {
									electionId: electionOfficialData?.electionId,
									partyId: getUserData().user?.PartyId,
									resultType: electionOfficialData?.assignment.resultType,
									code: electionOfficialData?.assignment.code,
									userId: getUserData().user?.UserId,
									resultId: i.resultId,
									comment: '',
									flag: '',
									// createdAt: '2025-10-31T13:05:08.847Z',
									// updatedAt: '2025-10-31T13:05:08.847Z',
								},
							});
						},
					},
				],
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

export default UploadedResults;
