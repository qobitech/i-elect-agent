import './style.scss';

import React, { useState } from 'react';

import { getUserData } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { Hvc } from '../../utils/hooks';
import { TypeInput } from '../../utils/input';
import { AlertSVG } from '../../utils/svgs';
import { TypeTextArea } from '../../utils/text-area';
import SubmitResultStatusStage from '../upload-result/submit-result-status';

const assignmentDetails = [
	{
		label: '#1',
		value: 'Wrong assignment',
	},
	{
		label: '#2',
		value: 'No Assignment',
	},
	{
		label: '#3',
		value: 'Result not submitting',
	},
	{
		label: '#4',
		value: 'Cannot upload result',
	},
];

const ReportIssueStage = () => {
	const {
		global: {
			state: { reportIssues },
			updateState,
			clearState,
		},
		rsProps,
		actions,
		states,
	} = useGlobalContext();

	const userData = {
		email: getUserData().user?.Email || '',
		phoneNumber: getUserData().user?.PhoneNumber || '',
		userId: getUserData().user?.UserId || '',
	};
	const handleSelect = (title: string) => () => {
		updateState('reportIssues', {
			...userData,
			report: {
				...reportIssues.report,
				title,
			},
		});
	};

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const onSendReport = () => {
		actions?.create_Report({
			data: {
				body: reportIssues.report.body,
				title: reportIssues.report.title,
			},
			onSuccess: () => {
				clearState('reportIssues');
				setIsSuccess(true);
			},
		});
	};

	const onViewReports = () => {
		rsProps?.callSection({
			action: 'view',
			component: 'report-feedbacks',
			title: 'Report Feedback',
		});
	};

	const onDoneSubmission = () => {
		setIsSuccess(false);
	};

	const [isTitle, setIsTitle] = useState<boolean>(false);

	return (
		<>
			<Hvc
				removeDOM
				view={!isSuccess}
				className='f-column-33'
			>
				<div className='f-row-10 w-100 text-left justify-content-between align-items-center'>
					<h3 className='header-body-text m-0'>Report New Issue</h3>
					<TypeButton
						title='View Feedbacks'
						buttonSize='small'
						buttonType='danger'
						className='border-0'
						onClick={onViewReports}
					/>
				</div>
				<div className='f-row-7 align-items-center'>
					<AlertSVG />
					<p className='m-0 text-little'>Select all that apply</p>
				</div>
				<div className='grid-wrapper-23 gap-13 '>
					{assignmentDetails.map((i, index) => (
						<ReportIssueItem
							key={index}
							label={i.label}
							value={i.value}
							isSelected={reportIssues.report.title === i.value}
							onClick={handleSelect(i.value)}
						/>
					))}
				</div>
				<div className='f-row-23 align-items-center'>
					<p className='m-0 color-label text-little'>Issue not found?</p>
					<p
						className='m-0 text-little text-decoration-underline cursor-pointer'
						onClick={() => {
							updateState('reportIssues', {
								...userData,
								report: {
									...reportIssues.report,
									title: '',
								},
							});
							setIsTitle(!isTitle);
						}}
					>
						{isTitle ? 'Remove' : 'Add'} Title
					</p>
				</div>
				{isTitle ? (
					<div>
						<TypeInput
							label='Add Title'
							placeholder='Enter Title'
							onChange={(e) => {
								updateState('reportIssues', {
									...userData,
									report: {
										...reportIssues.report,
										title: e.target.value,
									},
								});
							}}
							value={reportIssues.report.title}
						/>
					</div>
				) : null}
				<div>
					<TypeTextArea
						label='Add Comment'
						onChange={(e) => {
							updateState('reportIssues', {
								...userData,
								report: {
									...reportIssues.report,
									body: e.target.value,
								},
							});
						}}
						value={reportIssues.report.body}
					/>
				</div>
				<div className='f-column-17'>
					<TypeButton
						buttonSize='small'
						title='Send Report'
						className='w-100'
						onClick={onSendReport}
						load={states?._report?.create_ReportLoading}
					/>
				</div>
			</Hvc>
			<Hvc
				removeDOM
				view={isSuccess}
				className='f-column-33'
			>
				<SubmitResultStatusStage
					onClick={onDoneSubmission}
					title='Your Issue has been reported successfully'
					description='No further action is required.
          Please be patient while we reivew the issue'
					btnTitle='Close'
				/>
			</Hvc>
		</>
	);
};

const ReportIssueItem = ({
	label,
	value,
	isSelected,
	onClick,
}: {
	label: string;
	value: string;
	isSelected?: boolean;
	onClick: () => void;
}) => (
	<div
		className={`f-column-13 rounded p-4 report-issue-item ${isSelected ? 'selected' : ''}`}
		onClick={onClick}
	>
		<div>
			<p className='text-little color-label m-0'>{label} Issue</p>
		</div>
		<div>
			<p className='m-0 font-16'>{value}</p>
		</div>
	</div>
);

export default ReportIssueStage;
