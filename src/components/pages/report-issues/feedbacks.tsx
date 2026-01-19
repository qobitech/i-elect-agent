import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { HvcLoad, SeparatorComponent } from '../../utils/hooks';
import { type IPillData, PillComponent } from '../../utils/pills';
import { AlertSVG } from '../../utils/svgs';

interface qType {
	key: string;
	value: any;
}

const ReportFeedbacks = () => {
	const { actions, states, rsProps } = useGlobalContext();

	const onGetReport = (query?: qType[]) => {
		actions?.get_Report({
			query: query || [],
		});
	};

	useEffect(() => {
		onGetReport();
	}, []);

	const reports = states?._report?.get_Report?.data || [];

	const onNewReports = () => {
		rsProps?.callSection({
			action: 'view',
			component: 'report-issues',
			title: 'Report Issues',
		});
	};

	const viewReportDetails = (id: string) => {
		rsProps?.addRightSectionHistory();
		rsProps?.callSection({
			action: 'view',
			component: 'report-feedback-item',
			title: `Report Feedback #${id}`,
			data: {
				id,
			},
		});
	};

	const [selectedPill, setSelectedPill] = useState<string>('Unresolved');

	const pills: IPillData[] = [
		{
			filterValue: 'Unresolved',
			label: 'Unresolved',
		},
		{
			filterValue: 'Resolved',
			label: 'Resolved',
		},
	];

	const onClickPill = (filterValue: string) => {
		setSelectedPill(filterValue);
		onGetReport([
			{
				key: 'isResolved',
				value: filterValue === 'Resolved',
			},
		]);
	};

	return (
		<div className='f-column-33 pb-5'>
			<div className='f-row-10 w-100 text-left justify-content-between align-items-center'>
				<h3 className='header-body-text m-0'>Report Feedbacks</h3>
				<TypeButton
					title='Report New Issue'
					buttonSize='small'
					buttonType='danger'
					className='border-0'
					onClick={onNewReports}
				/>
			</div>
			<div className='f-row-7 align-items-center'>
				<AlertSVG />
				<p className='m-0 text-little'>View feedback for all reported issues</p>
			</div>
			<div>
				<PillComponent
					filterValues={[selectedPill]}
					pills={pills}
					onClickPill={onClickPill}
				/>
			</div>
			<HvcLoad
				removeDOM
				load={states?._report?.get_ReportLoading}
				view
				className='f-column-13'
			>
				{reports.map((i, index) => (
					<ReportFeedbackItem
						key={index}
						label={`#${index + 1}`}
						value={i.report.title}
						onClick={() => viewReportDetails(i.id)}
						status={i.isResolved}
						createdAt={i.createdAt}
					/>
				))}
			</HvcLoad>
		</div>
	);
};

export default ReportFeedbacks;

const ReportFeedbackItem = ({
	label,
	value,
	onClick,
	status,
	createdAt,
}: {
	label: string;
	value: string;
	createdAt: string;
	onClick: () => void;
	status: boolean;
}) => (
	<div
		className='f-column-15 cursor-pointer rounded p-4 report-issue-item'
		onClick={onClick}
	>
		<div className='f-row justify-content-between'>
			<p className='text-little color-label m-0'>{label} Issue</p>
			<div className='f-row-20 align-items-center'>
				<p className='text-little color-label m-0'>Status</p>
				<SeparatorComponent />
				<p className='text-little m-0'>{status ? 'Resolved' : 'Unresolved'}</p>
			</div>
		</div>
		<div className='f-column-11'>
			<p className='m-0 font-16 text-decoration-underline'>{value}</p>
			<p className='m-0 font-11 color-label'>{new Date(createdAt).toDateString()}</p>
		</div>
	</div>
);
