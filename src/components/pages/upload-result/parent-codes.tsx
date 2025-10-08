import React, { useEffect, useState } from 'react';

import { getUserData, type ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IElectoralDivisionCode } from '../../../interface/state/IRev';
import type { IRrevDataReq } from '../../../store/actions/query/irev';
import { TypeButton } from '../../utils/button';
import { Hvc, HvcLoad } from '../../utils/hooks';
import { CheckSVG } from '../../utils/svgs';
import type { ICode } from './utils';

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

const ParentCodesStage = () => {
	const {
		global: {
			state: { parentCodes, resultType, electionData, load },
			updateState,
			clearAll,
			clearState,
		},
		isDraft,
		restoreDraft,
		clearDraft,
		clearDraftLocal,
		actions,
		states,
	} = useGlobalContext();

	const getCode = (result: ResultType) => (resultType === result ? parentCodes.map((i) => i.name) : []);

	const onSuccess = () => {
		clearState('load');
	};

	const onFailure = () => {
		clearState('load');
	};

	const getAllResults = () => {
		updateState('load', true);
		const req = {
			zones: [],
			geoZones: [],
			elections: [electionData?.data?.election?.name],
		} as IRrevDataReq;
		const getFunc = () => {
			if (resultType === 'EC8A') {
				req.localGovernments = [];
				req.wards = [];
				req.states = [];
				req.pollingUnits = getCode('EC8A');
				return actions?.get_IRevPollingUnitDataModel;
			} else if (resultType === 'EC8B') {
				req.localGovernments = [];
				req.pollingUnits = [];
				req.states = [];
				req.wards = getCode('EC8B');
				return actions?.get_IRevWardDataModel;
			} else if (resultType === 'EC8C') {
				req.pollingUnits = [];
				req.wards = [];
				req.states = [];
				req.localGovernments = getCode('EC8C');
				return actions?.get_IRevLGADataModel;
			} else if (resultType === 'EC8D') {
				req.pollingUnits = [];
				req.wards = [];
				req.localGovernments = [];
				req.states = getCode('EC8D');
				return actions?.get_IRevStateDataModel;
			}

			return undefined;
		};
		getFunc?.()?.({ paged: true, data: req, onSuccess, onFailure });
	};

	useEffect(() => {
		clearDraftLocal();
	}, []);

	const getDraft = () => {
		actions?.get_Draft({
			query: [
				{
					key: 'userId',
					value: getUserData().user?.UserId,
				},
			],
		});
	};

	useEffect(() => {
		if (parentCodes.length) {
			getDraft();
			getAllResults();
		}
	}, [parentCodes]);

	const getResponse = () => {
		let response: IElectoralDivisionCode[] = [];
		const irev = states?._irev;
		if (resultType === 'EC8A') {
			response = irev?.get_IRevPollingUnitDataModel?.data?.map((i) => i.pollingUnit)!;
		}
		if (resultType === 'EC8B') {
			response = irev?.get_IRevWardDataModel?.data?.map((i) => i.ward)!;
		}
		if (resultType === 'EC8C') {
			response = irev?.get_IRevLGADataModel?.data?.map((i) => i.localGovernment)!;
		}
		if (resultType === 'EC8D') {
			response = irev?.get_IRevStateDataModel?.data?.map((i) => i.state)!;
		}
		return response;
	};

	const responseData = getResponse();

	const [promptUseDraft, setPromptUseDraft] = useState<string | null>(null);

	const onParentCode = (data: ICode) => () => {
		if (isDraft(data?.code)) {
			setPromptUseDraft(data?.code);
		} else {
			updateState('selectedParentCode', data);
			updateState('stage', 'Upload Result');
		}
	};

	const continueWithDraft = (data: ICode) => {
		setPromptUseDraft(null);
		restoreDraft(data.code);
	};

	const startAfresh = (data: ICode) => {
		clearDraftLocal();
		clearDraft(data.code);
		clearAll();
		setPromptUseDraft(null);
		updateState('selectedParentCode', data);
		updateState('stage', 'Upload Result');
	};

	const title = getResultCodeTitle(resultType as ResultType);

	const isSubmitted = (code: string) => responseData?.map((j) => j?.code)?.includes(code);

	return (
		<HvcLoad
			removeDOM
			load={load}
			view
			className='f-column-33'
		>
			<div>{/* <h6 className="m-0">{title.parent}s</h6> */}</div>
			<p className='m-0 text-little color-label'>
				For every <b>{title.parent}</b> listed below, ensure you provide the required details and then submit.
			</p>
			{parentCodes.map((i) => (
				<div
					key={i.status + i?.code}
					className='f-column-13'
				>
					<TypeButton
						title={`${i.name} [ ${i?.code} ]`}
						buttonType={isSubmitted(i?.code) ? 'disabled' : 'outlined'}
						buttonSize='small'
						className='w-100'
						icon={isSubmitted(i?.code) ? <CheckSVG color='green' /> : <></>}
						disabled={isSubmitted(i?.code)}
						onClick={onParentCode(i)}
						style={{ color: 'green', opacity: 1 }}
					/>
					<Hvc
						removeDOM
						view={promptUseDraft === i?.code}
						className='f-column-13 border-label rounded p-4 text-center align-items-center'
					>
						<p className='text-little'>
							Looks like you have a saved draft. Would you like to continue where you left off or start a new session?
						</p>
						<div className='f-row-20 justify-content-center'>
							<TypeButton
								title='Continue with Draft'
								buttonSize='small'
								buttonType='outlined'
								onClick={() => continueWithDraft(i)}
							/>
							<TypeButton
								title='Start Fresh'
								buttonSize='small'
								onClick={() => startAfresh(i)}
							/>
						</div>
					</Hvc>
				</div>
			))}
		</HvcLoad>
	);
};

export default ParentCodesStage;
