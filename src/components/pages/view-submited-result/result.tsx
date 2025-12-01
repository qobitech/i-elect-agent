import { useEffect, useMemo, useRef, useState } from 'react';

import { useGlobalContext } from '../../../context/global';
import { type IOptionAction } from '../../utils/action-component';
import { handleScrollRightSection } from '../../utils/helper';
import { Hvc, HvcLoad } from '../../utils/hooks';
import { LeftNavSVG, RightNavSVG, TrashSVG } from '../../utils/svgs';
import { useTabSection } from '../../utils/tab-section';
import {
	defaultResultState,
	formatINECDate,
	type IEditElectionResultState,
	type IElectoralDivisionCode,
	type reviewType,
	tabs,
} from './helpers';
import ReviewAction from './review-action';
import { useGetResultsByRefID } from './use-get-result-by-ref-id';

const ViewSubmitedResult = () => {
	const { rsProps: rightPanel } = useGlobalContext();

	const { referenceId } = rightPanel?.data as {
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

	const [global, setGlobal] = useState<IEditElectionResultState>(initComponentState);

	const { review, navIndex, resultLoading } = global;

	const resultByIdRefIdProps = useGetResultsByRefID({
		rstype: rightPanel?.resultType!,
		onSuccess: () => {
			setGlobal((prev) => ({ ...prev, resultLoading: false }));
		},
		onFailure: () => {
			setGlobal((prev) => ({ ...prev, resultLoading: true }));
		},
	});

	const onRefresh = () => {
		resultByIdRefIdProps.getResults(referenceId);
	};

	useEffect(() => {
		setGlobal((prev) => ({ ...prev, resultLoading: true }));
		onRefresh();
	}, []);

	const response = resultByIdRefIdProps.response;

	const result = useMemo(() => response || defaultResultState, [response]);

	const { tabProps, isTab, setTab } = useTabSection(tabs.INFO, tabs);

	const total = result?.documentUrls?.length || 0;

	const navigate = (nav: 'prev' | 'next') => () => {
		const vigate = nav === 'prev' ? Math.max(0, navIndex - 1) : Math.min(total - 1, navIndex + 1);
		setGlobal((prev) => ({ ...prev, navIndex: vigate }));
	};

	const onReview = (review: reviewType) => () => {
		setGlobal((prev) => ({ ...prev, review, error: '' }));
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
			value: result?.localGovernment?.name || 'no data',
			copy: false,
		},
		{
			label: rightPanel?.resultType === 'EC8D' ? '' : 'LGA Code',
			value: result?.localGovernment?.code || 'no data',
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
			value: result?.presidingOfficer?.name || 'no data',
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
			</div>
			<div className='f-column-33 align-items-stretch justify-content-between mb-5'>
				<div className='flex-basis-65'>
					<ReviewAction result={result} />
				</div>
			</div>
		</HvcLoad>
	);
};

export default ViewSubmitedResult;
