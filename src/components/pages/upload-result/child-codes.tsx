import React from 'react';

import type { ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { RefreshComponent } from '../../utils/hooks';
import { CheckSVG } from '../../utils/svgs';
import type { IChildCode } from './utils';

const getResultCodeTitle = (resultType: ResultType) => {
	switch (resultType) {
		case 'EC8B':
			return { parent: 'Ward', child: 'Polling Unit' };
		case 'EC8C':
			return { parent: 'LGA', child: 'Ward' };
		case 'EC8D':
			return { parent: 'State', child: 'LGA' };
		default:
			return { parent: '', child: '' };
	}
};

const ChildCodesStage = () => {
	const {
		global: {
			state: { resultType, childCodes },
			updateState,
		},
		getCodeProps,
	} = useGlobalContext();
	const title = getResultCodeTitle(resultType as ResultType);
	const completed = childCodes.filter((i) => i.status)?.length || 0;

	const onChildCode = (data: IChildCode) => () => {
		updateState('selectedChildCode', data);
		updateState('partyVoteStage', 'Party Votes');
	};

	const { handleCodes, load } = getCodeProps;

	return (
		<div className='f-column-33'>
			<div className='f-row align-items-center justify-content-between flex-wrap'>
				<p className='m-0 text-little color-label'>
					Ensure you enter the political parties vote count for each {title.child} listed below.
				</p>
				<div className='f-row-7 align-items-center hw-mx cursor-pointer'>
					<p className='m-0 text-little color-label'>Refresh</p>
					<RefreshComponent
						onRefresh={handleCodes}
						load={load}
					/>
				</div>
			</div>
			<div className='text-center f-row-13 align-items-center justify-content-center'>
				<p className='text-little m-0'>{title.child} Codes</p>
				<p className='color-label text-little m-0'>
					( {completed} of {childCodes.length} completed )
				</p>
			</div>
			<div className='grid-wrapper-45 gap-33'>
				{childCodes.map((i) => (
					<TypeButton
						title={`${i.name} [ ${i?.code} ]`}
						buttonType='outlined'
						buttonSize='small'
						className='w-100'
						icon={i.status ? <CheckSVG color='green' /> : <></>}
						onClick={onChildCode(i)}
						key={i.status + i?.code}
					/>
				))}
			</div>
		</div>
	);
};

export default ChildCodesStage;
