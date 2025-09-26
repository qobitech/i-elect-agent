import './style.scss';

import React, { useState } from 'react';

import { getUserData, type ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IActions } from '../../../interface/IAction';
import type { IElectionDivision } from '../../../interface/state/IElectionState';
import { ActionItem } from '../../utils/action';
import { TypeButton } from '../../utils/button';
import { CardItems, Hvc, HvcLoad, useCallAPI } from '../../utils/hooks';
import { AlertSVG, UploadIconSVG } from '../../utils/svgs';
import { TabSection, useTabSection } from '../../utils/tab-section';

const Overview = () => {
	const { states, actions, global, rsProps } = useGlobalContext();
	const { notificationGlobal, get_ElectionOfficial, get_ElectionByID, get_CountryStateByID } = actions!;

	const electionOfficialData = states?._election?.get_ElectionOfficial?.data;
	// const draftData = states?._draft?.get_DraftByID?.data

	const onError = () => {
		notificationGlobal('Something went wrong', false);
	};

	const getData = () => {
		get_ElectionOfficial({
			onFailure: () => {
				onError();
			},
			onSuccess: (res) => {
				get_ElectionByID({
					id: res?.data?.election?.id + '',
					onSuccess: (data) => {
						get_CountryStateByID({
							id: data?.data?.constituency?.stateId + '',
						});
					},
				});
			},
		});
	};

	useCallAPI(getData, !electionOfficialData);

	const overviewSectionData = [
		{
			title: 'Election',
			value: electionOfficialData?.election?.name || '',
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
			title: electionOfficialData?.election.name || '',
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

	const isAssignment =
		!!electionOfficialData?.localGovernments?.length ||
		!!electionOfficialData?.pollingUnits?.length ||
		!!electionOfficialData?.states?.length ||
		!!electionOfficialData?.wards?.length;

	const [isProfile, setIsProfile] = useState<boolean>(false);

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
					view={!isAssignment}
					className='f-row-7 align-items-center align-items-start'
				>
					<AlertSVG />
					<p className='color-label m-0 font-16'>No assignments</p>
				</Hvc>
				<Hvc
					removeDOM
					view={isAssignment}
					className='f-column-33 align-items-start'
				>
					<div className='border-label rounded p-4 w-100'>
						<CardItems
							title='Election'
							value={electionOfficialData?.election?.name || ''}
						/>
					</div>
					<p className='font-25'>You&apos;ve been assigned to submit the following election results</p>
					<div
						className='w-100'
						style={{ overflow: 'auto' }}
					>
						<div className='f-column-23'>
							<div className='grid-wrapper-20 gap-13'>
								{electionOfficialData?.pollingUnits?.length ? (
									<ActionItem
										action={uploadResultAction('EC8A', electionOfficialData?.pollingUnits)}
										icon={<UploadIconSVG />}
										label='EC8A Result'
									/>
								) : null}
								{electionOfficialData?.wards?.length ? (
									<ActionItem
										action={uploadResultAction('EC8B', electionOfficialData?.wards)}
										icon={<UploadIconSVG />}
										label='EC8B Result'
									/>
								) : null}
								{electionOfficialData?.localGovernments?.length ? (
									<ActionItem
										action={uploadResultAction('EC8C', electionOfficialData?.localGovernments)}
										icon={<UploadIconSVG />}
										label='EC8C Result'
									/>
								) : null}
								{electionOfficialData?.states?.length ? (
									<ActionItem
										action={uploadResultAction('EC8D', electionOfficialData?.states)}
										icon={<UploadIconSVG />}
										label='EC8D Result'
									/>
								) : null}
							</div>
						</div>
					</div>
				</Hvc>
			</div>
			<div className='f-column-21'>
				<div className='f-row justify-content-center'>
					<TypeButton
						title={!isProfile ? 'View Info' : 'Hide Info'}
						buttonSize='small'
						buttonType='outlined'
						className='border-0'
						icon={<AlertSVG />}
						onClick={() => setIsProfile(!isProfile)}
					/>
				</div>
				<Hvc
					removeDOM
					view={isProfile}
					className='body-column-left f-column-33'
				>
					<div className='f-column-15'>
						<TabSection
							tabProps={tabProps}
							type='block'
							position='start'
							tabGap='10'
						/>
						<Hvc
							removeDOM
							view={isTab(tabs.ELECTION)}
							className='grid-wrapper-30 gap-33 border-label rounded p-4'
						>
							{overviewSectionData.map((i, index) => (
								<CardItems
									title={i.title}
									value={i.value}
									key={index}
								/>
							))}
						</Hvc>
						<Hvc
							removeDOM
							view={isTab(tabs.PROFILE)}
							className='grid-wrapper-30 gap-33 border-label rounded p-4'
						>
							{usersectiondata.map((i, index) => (
								<CardItems
									title={i.title}
									value={i.value || ''}
									key={index}
								/>
							))}
						</Hvc>
					</div>
				</Hvc>
			</div>
			<div />
		</HvcLoad>
	);
};

export default Overview;
