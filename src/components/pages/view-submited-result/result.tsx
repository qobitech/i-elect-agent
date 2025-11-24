import { useEffect, useMemo, useRef } from 'react';

import { useGlobalContext } from '../../../context/global';
import { IStates } from '../../../interface/IReducer';
import { useStateHook } from '../../layout/state-hook';
import { ActionComponent, type IOptionAction } from '../../utils/action-component';
import { handleScrollRightSection } from '../../utils/helper';
import { Hvc, HvcLoad, useFormHook } from '../../utils/hooks';
import { FlagSVG, LeftNavSVG, NotesSVG, RightNavSVG, TrashSVG } from '../../utils/svgs';
import { TabSection, useTabSection } from '../../utils/tab-section';
import Flags from './flag-result';
import {
	defaultResultState,
	formatINECDate,
	type IEditElectionResultState,
	type IElectoralDivisionCode,
	type IHF,
	type reviewType,
	tabs,
} from './helpers';
import ResultInfo from './result-info';
import ReviewAction from './review-action';
import { useGetResultsByID } from './use-get-result-by-id';
import { useGetResultsByProps } from './use-get-result-by-props';
import { useGetResultsByRefID } from './use-get-result-by-ref-id';
import UserNotes from './user-notes';
import { useReviewActions } from './useReviewAcions';

const ViewSubmitedResult = () => {
	const { states, rsProps: rightPanel } = useGlobalContext();

	const { electionName, electoralDivision, referenceId, id } = rightPanel?.data as {
		electionName: string;
		electoralDivision: {
			name: string;
			value: IElectoralDivisionCode;
		};
		referenceId: string;
		id: string;
	};

	const initComponentState: IEditElectionResultState = {
		review: undefined,
		error: '',
		comment: '',
		success: false,
		loading: false,
		resultLoading: false,
		navIndex: 0,
	};

	const global = useStateHook<IEditElectionResultState>(initComponentState);

	const {
		state: { review, navIndex, resultLoading },
		updateState,
	} = global;

	const resultByProps = useGetResultsByProps({
		rstype: rightPanel?.resultType!,
		onSuccess: () => {
			updateState('resultLoading', false);
		},
		onFailure: () => {
			updateState('resultLoading', false);
		},
	});

	const resultByIdRefIdProps = useGetResultsByRefID({
		rstype: rightPanel?.resultType!,
		onSuccess: () => {
			updateState('resultLoading', false);
		},
		onFailure: () => {
			updateState('resultLoading', false);
		},
	});

	const resultByIdProps = useGetResultsByID({
		rstype: rightPanel?.resultType!,
		onSuccess: () => {
			updateState('resultLoading', false);
		},
		onFailure: () => {
			updateState('resultLoading', false);
		},
	});

	const onRefresh = () => {
		if (id) {
			resultByIdProps.getResults(id);
		}
		if (referenceId) {
			resultByIdRefIdProps.getResults(referenceId);
		} else {
			resultByProps.getResults({
				elections: [electionName],
				[electoralDivision?.name]: [electoralDivision?.value?.name],
				geoZones: [],
				zones: [],
			});
		}
	};

	useEffect(() => {
		updateState('resultLoading', true);
		onRefresh();
	}, []);

	const response = id ? resultByIdProps.response : referenceId ? resultByIdRefIdProps.response : resultByProps.response.data[0];

	const result = useMemo(() => response || defaultResultState, [response]);

	const { tabProps, isTab, setTab } = useTabSection(tabs.INFO, tabs);

	const total = result?.documentUrls?.length || 0;

	const navigate = (nav: 'prev' | 'next') => () => {
		const vigate = nav === 'prev' ? Math.max(0, navIndex - 1) : Math.min(total - 1, navIndex + 1);
		updateState('navIndex', vigate);
	};

	const [hookForm] = useFormHook<IHF>({});

	const { addNotes, approveDeleteResult, deleteResultRequest } = useReviewActions({
		global,
		hookForm,
		result,
		resultType: rightPanel?.resultType,
		onRefresh,
	});

	const onReview = (review: reviewType) => () => {
		updateState('review', review);
		updateState('error', '');
	};

	const successTxt = useMemo(() => {
		if (review === 'add notes') return 'User Notes added successfully';
		if (review === 'approve') return 'Election result approved successfully';
		if (review === 'flag') return 'Election result flagged successfully';
		if (review === 'approve delete request') return 'Election result deleted successfully';
		return '';
	}, [review]);

	const onClose = () => {
		updateState('success', false);
		rightPanel?.closeSection();
	};

	const options: IOptionAction[] = [
		{
			label: 'Add User Note',
			action: () => {
				onReview('add notes')();
			},
		},
		{
			label: 'Flag Result',
			action: () => {
				onReview('flag')();
			},
		},
		{
			label: 'Request Delete',
			action: () => {
				onReview('request delete')();
			},
		},
		{
			label: 'Send Result to Email',
			action: () => {},
		},
	];

	const isLink = (status: boolean) => (status ? 'text-decoration-underline cursor-pointer' : '');

	const bottomRef = useRef<HTMLDivElement>(null);

	const onFlag = () => {
		handleScrollRightSection(bottomRef);
		setTab(tabs.FLAGS);
	};

	const onNotes = () => {
		handleScrollRightSection(bottomRef);
		setTab(tabs.USERNOTES);
	};

	const resultInfo = [
		{
			label: result?.approvedBy?.name ? 'Approved Date' : 'Date',
			value: result?.approvedAt ? formatINECDate(result?.approvedAt) : '...',
			copy: false,
		},
		{
			label: 'State',
			value: result?.state?.name || '',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8D' ? '' : 'LGA',
			value: result?.localGovernment?.name || '',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8D' ? '' : 'LGA Code',
			value: result?.localGovernment?.code || '',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8C' || rightPanel?.resultType === 'EC8D' ? '' : 'RA/Ward',
			value: result?.ward?.name || '',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8C' || rightPanel?.resultType === 'EC8D' ? '' : 'RA/Ward Code',
			value: result?.ward?.code || '',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8A' ? 'Polling Unit' : '',
			value: result?.pollingUnit?.name || '...',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8A' ? 'Polling Unit Code' : '',
			value: result?.pollingUnit?.code || '...',
			copy: false,
		},
		{
			label: 'Presiding Officer',
			value: result?.presidingOfficer?.name || '',
			copy: false,
		},
		{
			label: result?.approvedBy?.name ? 'Status' : '',
			value: result?.status || '',
			copy: false,
		},
	];

	return (
		<HvcLoad
			removeDOM
			load={resultLoading}
			view={!!result}
			className='f-column-23'
		>
			<div className='grid-wrapper-30 gap-11 bg-light rounded p-3'>
				{resultInfo
					.filter((i) => i.label)
					.map((i, index) => (
						<div key={index}>
							<p className='font-9 color-label m-0 mb-1'>{i.label}</p>
							<p className='font-10 m-0'>{i.value}</p>
						</div>
					))}
			</div>
			<div className='f-row-20 align-items-center justify-content-between'>
				<div className='f-row-40 align-items-center w-100'>
					<Hvc
						removeDOM
						view={!review}
						className='f-row-20 align-items-center'
					>
						<div
							className='hw-mx cursor-pointer align-items-center f-row-7 p-1'
							onClick={navigate('prev')}
						>
							<LeftNavSVG />
						</div>
						<div
							className='hw-mx cursor-pointer align-items-center f-row-7 p-1'
							onClick={navigate('next')}
						>
							<RightNavSVG />
						</div>
						<p className='m-0 text-little color-label'>
							{navIndex + 1} of {total}
						</p>
					</Hvc>
					<Hvc
						removeDOM
						view={!review}
						className='f-row-33 align-items-center mx-auto hw-mx px-3 rounded'
						style={{ margin: '0 auto' }}
					>
						<div
							className='hw-mx p-2 f-row-7 align-items-center justify-content-center'
							onClick={onFlag}
						>
							<FlagSVG />
							<p className={`m-0 text-tiny ${isLink(!!result.flags?.length)}`}>Flagged</p>
							<p className='m-0 text-tiny color-label'>({result.flags?.length || 0})</p>
						</div>
						<div
							className='hw-mx p-2 f-row-7 align-items-center justify-content-center'
							onClick={onNotes}
						>
							<NotesSVG />
							<p className={`m-0 text-tiny ${isLink(!!result.notes?.length)}`}>User Notes</p>
							<p className='m-0 text-tiny color-label'>({result.notes?.length || 0})</p>
						</div>
						<Hvc
							removeDOM
							view={result.deleteIsRequested}
							className='hw-mx p-2 f-row-7 align-items-center justify-content-center'
						>
							<TrashSVG color='red' />
							<p className='m-0 text-tiny text-decoration-underline'>Delete requested</p>
						</Hvc>
					</Hvc>
				</div>
				<Hvc
					removeDOM
					view={!review}
				>
					<ActionComponent
						title='Options'
						buttonSize='little'
						buttonType='outlined'
						actions={options}
					/>
				</Hvc>
			</div>
			<div className='f-column-33 align-items-stretch justify-content-between'>
				<div className='flex-basis-65'>
					<ReviewAction
						result={result}
						states={states!}
						onReview={onReview}
						addNotes={addNotes}
						global={global}
						approveResult={approveDeleteResult}
						deleteResult={deleteResultRequest}
						onClose={onClose}
						successTxt={successTxt}
						onDataRefresh={onRefresh}
					/>
				</div>

				<div
					className='flex-basis-35 w-100'
					ref={bottomRef}
				>
					<div className='pb-2 f-row justify-content-between'>
						<TabSection
							tabProps={tabProps}
							position='start'
							tabGap='5'
							type='block'
						/>
					</div>
					<div
						className='rounded p-3'
						style={{ border: '1px solid #f0f0f0' }}
					>
						<ResultInfo
							result={result}
							view={isTab(tabs.INFO)}
							resultType={rightPanel?.resultType!}
						/>
						<Hvc
							removeDOM
							view={isTab(tabs.USERNOTES)}
						>
							<UserNotes result={result} />
						</Hvc>
						<Hvc
							removeDOM
							view={isTab(tabs.FLAGS)}
						>
							<Flags result={result} />
						</Hvc>
					</div>
				</div>
			</div>
		</HvcLoad>
	);
};

export default ViewSubmitedResult;
