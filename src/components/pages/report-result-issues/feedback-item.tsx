import './style.scss';

import React, { useEffect } from 'react';

import { useGlobalContext } from '../../../context/global';
import { HvcLoad, SeparatorComponent } from '../../utils/hooks';

const ReportFeedbackItem = () => {
	const { actions, states, rsProps } = useGlobalContext();

	const { id } = rsProps?.data as { id: string };

	useEffect(() => {
		actions?.get_ReportByID({
			id,
		});
	}, []);

	const reportItem = states?._report?.get_ReportByID?.data;

	return (
		<HvcLoad
			load={states?._report?.get_ReportByIDLoading}
			view
			className='f-column-33'
		>
			<div className='f-column-11'>
				<p className='m-0 font-13 color-label'>Subject</p>
				<div className='f-row-33 align-items-center'>
					<h3 className='header-body-text m-0'>{reportItem?.report.title}</h3>
					<SeparatorComponent />
					<p className='m-0 color-label font-13'>{new Date(reportItem?.createdAt || '').toDateString()}</p>
				</div>
			</div>
			<div className='f-column-33 border rounded p-4'>
				<div className='f-row-47 align-items-center'>
					<div className='f-row-7 align-items-center'>
						<p className='m-0 color-label font-11'>Status</p>
						<SeparatorComponent />
						<p className='m-0 font-11'>{reportItem?.isResolved ? 'Resolved' : 'Unresolved'}</p>
						<div className={`report-status ${reportItem?.isResolved ? 'Resolved' : 'Unresolved'}`} />
					</div>
				</div>
				<p className='m-0 ff-bold'>{reportItem?.report.body}</p>
			</div>
			<div className='f-row-7 align-items-center d-none'>
				<p className='m-0 text-little color-label'>Reply from</p>
				<p className='m-0 text-little'>Mr. Mike</p>
			</div>
			<div className='f-column-13 border-label rounded p-4 d-none'>
				<p className='m-0'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
					aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
					occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</p>
			</div>
		</HvcLoad>
	);
};

export default ReportFeedbackItem;
