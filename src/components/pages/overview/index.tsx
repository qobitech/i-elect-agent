import './style.scss';

import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import { getUserData, type ResultType } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import { useGlobalContext } from '../../../context/global';
import type { IElectionDivision } from '../../../interface/state/IElectionState';
import { TypeButton } from '../../utils/button';
import { CardItems, Hvc, HvcLoad, useCallAPI } from '../../utils/hooks';
import { AlertSVG } from '../../utils/svgs';
import { useTabSection } from '../../utils/tab-section';
import Table, { type ITableRecord } from '../../utils/table';

const Overview = () => {
	const navigate = useNavigate();

	const { states, actions, global, rsProps } = useGlobalContext();
	const { notificationGlobal, get_ElectionOfficial, get_ElectionByID, get_CountryStateByID } = actions!;

	const electionOfficialData = states?._election?.get_ElectionOfficial?.data.find(
		(i) => i.userId === Number(getUserData().user?.UserId)
	);
	const electionData = states?._election?.get_ElectionByID?.data;

	const onError = () => {
		notificationGlobal('Something went wrong', false);
	};

	const getData = () => {
		get_ElectionOfficial({
			query: [
				{
					key: 'UserId',
					value: getUserData().user?.UserId,
				},
			],
			onFailure: () => {
				onError();
			},
			onSuccess: (res) => {
				const electionOfficial = res.data.find((i) => i.userId === Number(getUserData().user?.UserId));

				if (electionOfficial) {
					get_ElectionByID({
						id: String(electionOfficial.electionId),
						onSuccess: (data) => {
							get_CountryStateByID({
								id: data?.data?.constituency?.stateId + '',
							});
						},
					});
				}
			},
		});
	};

	useCallAPI(getData, !electionOfficialData);

	const overviewSectionData = [
		{
			title: 'Election',
			value: electionData?.name || '',
		},
	];

	const usersectiondata = [
		{
			title: 'Full Name',
			value: getUserData()?.user?.FullName,
		},
		{
			title: 'Email',
			value: getUserData()?.user?.Email,
		},
		{
			title: 'Phone',
			value: getUserData()?.user?.PhoneNumber,
		},
	];

	const uploadResultAction = (type: ResultType, assignmentData: IElectionDivision[] | undefined) => () => {
		global.clearAll();
		rsProps?.callSection({
			action: 'create',
			component: 'upload-result',
			title: electionData?.name || '',
			max: true,
			resultType: type,
			data: {
				assignmentData,
				electionData: states?._election?.get_ElectionOfficial,
			},
		});
	};

	const tabs = {
		ELECTION: 'Election Details',
		PROFILE: 'Agent Profile',
	};

	const { tabProps, isTab } = useTabSection(tabs.ELECTION, tabs);

	const onReportIssues = () => {
		rsProps?.callSection({
			action: 'view',
			component: 'report-issues',
			title: 'Report Issues',
			max: true,
		});
	};

	const isAssignment = !!electionOfficialData?.assignment.code;

	const taskRecord: ITableRecord[] = [
		{
			id: '1',
			row: [
				{
					value: `${electionOfficialData?.assignment.resultType.toUpperCase()} Result`,
				},
				{
					value: `${electionOfficialData?.assignment.name} [${electionOfficialData?.assignment.code}]`,
				},
				{
					value: electionOfficialData?.assignment.isCompleted ? 'Completed' : 'Pending',
				},
			],
			rowActions: [
				{
					actionType: 'btn-options',
					options: [
						{
							label: 'Upload Election Result',
							action: () => {
								uploadResultAction(electionOfficialData?.assignment.resultType.toUpperCase() as ResultType, [
									{
										id: Number(electionOfficialData?.assignment.id ?? '4'),
										name: electionOfficialData?.assignment.name ?? '',
										code: electionOfficialData?.assignment.code ?? '',
									},
								])();
							},
							disabled: electionOfficialData?.assignment.isCompleted,
						},
						{
							label: 'View Uploaded Result',
							action: () => {},
							disabled: !electionOfficialData?.referenceId,
						},
						{
							label: 'View Result Analytics',
							action: () => {
								navigate(pageurl.RESULTANALYTICS);
							},
							disabled: electionOfficialData?.assignment?.resultType?.toLowerCase() === 'ec8a',
						},
					],
				},
			],
		},
	];

	return (
		<HvcLoad
			load={states?._election?.get_ElectionOfficialLoading}
			view
			className='f-column-77 pb-4 mb-4'
		>
			<div className='f-column-33'>
				<div className='f-row-20 align-items-center justify-content-between w-100'>
					<p
						className='text-small m-0 color-label'
						style={{ color: '#616161' }}
					>
						Assignment
					</p>
					<TypeButton
						title='Reports'
						buttonSize='small'
						buttonType='danger'
						className='border-0'
						onClick={onReportIssues}
					/>
				</div>
				<Hvc
					removeDOM
					view={isAssignment}
					className='f-column-33 align-items-start'
					errorFallBack={
						<div className='f-row-7 align-items-center align-items-start'>
							<AlertSVG />
							<p className='color-label m-0 font-16'>No assignments</p>
						</div>
					}
				>
					<div className='border-label rounded p-4 w-100'>
						<CardItems
							title='Election'
							value={electionData?.name || ''}
						/>
					</div>
					<p className='font-25'>You&apos;ve been assigned to submit the following election results</p>
					<Table
						header={['Result Type', 'Assignment', 'Status', '']}
						record={taskRecord}
					/>
				</Hvc>
			</div>
			<div />
		</HvcLoad>
	);
};

export default Overview;
