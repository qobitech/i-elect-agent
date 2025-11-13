import React, { useEffect, useRef } from 'react';

import type { ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IElectionDivision, IGetElectionOfficial } from '../../../interface/state/IElectionState';
import { type IIrevElectionSubmissionResponse } from '../../../interface/state/IRev';
import { TypeButton } from '../../utils/button';
import { handleScrollRightSection } from '../../utils/helper';
import { Hvc } from '../../utils/hooks';
import { RightArrowSVG } from '../../utils/svgs';
import {
	defaultElectionData,
	getResults,
	useLGAResultDataManager,
	usePollingUnitResultDataManager,
	useStateResultDataManager,
	useWardResultDataManager,
} from './hooks';
import ParentCodesStage from './parent-codes';
import PartyVotesStage from './party-votes-stage';
import Preview from './preview';
import ResultSummaryStage from './result-summary';
import SubmitResultStatusStage from './submit-result-status';
import UploadResultStage from './upload-result';
import UploadResultStatusStage from './upload-result-status';
import VoteSummary from './vote-summary';

const UploadResult = () => {
	const { rsProps, actions, states, global, saveAsDraft, onStage, clearDraftLocal, clearDraft } = useGlobalContext();
	const bottomRef = useRef<HTMLDivElement>(null);

	const {
		state: {
			files,
			isPreview,
			partyVotes,
			selectedParentCode,
			selectedChildCode,
			partyVoteStage,
			stage,
			uploadedFiles,
			draftStatus,
			resultType,
			parentCodes,
		},
		updateState,
		clearAll,
	} = global;

	const as = rsProps?.data as {
		assignmentData: IElectionDivision[] | undefined;
		electionData: IGetElectionOfficial | undefined;
	};

	const handleInitParentCode = () => {
		const resultType = rsProps?.resultType!;
		updateState(
			'parentCodes',
			as?.assignmentData?.map((i) => ({
				code: i?.code,
				codeId: i.id,
				name: i.name,
				status: false,
			})) || []
		);
		updateState('resultType', resultType);
		updateState('electionData', as?.electionData || defaultElectionData);
	};

	useEffect(() => {
		if (!parentCodes.length) handleInitParentCode();
	}, [as?.assignmentData, parentCodes]);

	useEffect(() => {
		handleScrollRightSection(bottomRef);
		if (stage === 'Preview' && !isPreview) {
			updateState('isPreview', true);
		}
	}, [stage]);

	useEffect(() => {
		updateState(
			'isUpdate',
			(() => {
				if (uploadedFiles.length) {
					// if lenght of files is more than uploaded files
					// if uploaded files exists and theres movement in files
					return files.length !== uploadedFiles.length || !!files.length;
				}
				return false;
			})()
		);
	}, [files]);

	const onDoneSubmission = () => {
		clearAll();
		clearDraftLocal();
		clearDraft(selectedParentCode?.code);
		handleInitParentCode();
		updateState('stage', 'Electoral Division');
	};

	const results = getResults(states, partyVotes);

	const { data: stateResultData } = useStateResultDataManager({
		results,
	});

	const { data: lgaResultData } = useLGAResultDataManager({
		results,
	});

	const { data: wardResultData } = useWardResultDataManager({
		results,
	});

	const { data: pollingUnitResultData } = usePollingUnitResultDataManager({
		results,
	});

	const onSubmit = () => {
		const onSuccess = (res: IIrevElectionSubmissionResponse) => {
			const data = states?._election.get_ElectionOfficial.data;

			const obj: Partial<Record<ResultType, any>> = {
				EC8A: pollingUnitResultData,
				EC8B: wardResultData,
				EC8C: lgaResultData,
				EC8D: stateResultData,
			};

			const reqData = obj?.[resultType as ResultType];

			const assignmentData = data?.find((i) => i.electionId === reqData.election.id);

			if (!assignmentData) return;

			const assignment = assignmentData.assignment;

			actions?.update_ElectionOfficialById({
				onSuccess: () => {
					updateState('stage', 'Election Result Submission Status');
				},
				data: {
					id: assignmentData.id,
					referenceId: res.referenceId,
					userId: assignmentData.userId,
					electionId: assignmentData.electionId,
					election: assignmentData.election,
					name: assignmentData.name,
					assignment: {
						id: Number(assignment.id),
						code: assignment.code,
						name: assignment.name,
						resultType: assignment.resultType,
						isCompleted: true,
					},
				},
				id: assignmentData.id,
			});
		};
		if (resultType === 'EC8D') {
			actions?.push_IRevStateDataModel({
				data: stateResultData,
				onSuccess,
			});
		}
		if (resultType === 'EC8C') {
			actions?.push_IRevLGADataModel({
				data: lgaResultData,
				onSuccess,
			});
		}
		if (resultType === 'EC8B') {
			actions?.push_IRevWardDataModel({
				data: wardResultData,
				onSuccess,
			});
		}
		if (resultType === 'EC8A') {
			actions?.push_IRevPollingUnitDataModel({
				data: pollingUnitResultData,
				onSuccess,
			});
		}
	};

	const getSubmitLoad = () =>
		states?._irev?.push_IRevDataModelLoading ||
		states?._irev?.push_IRevWardDataModelLoading ||
		states?._irev?.push_IRevLGADataModelLoading ||
		states?._irev?.push_IRevStateDataModelLoading ||
		false;

	const submitLoad = getSubmitLoad();

	return (
		<div
			className='pb-4 mb-4 f-column-33 px-2'
			ref={bottomRef}
		>
			<div className='f-column-20 w-100 text-left justify-content-between'>
				<div className='f-row-10 w-100 text-left justify-content-between'>
					<div className='f-row-23 align-items-center'>
						<h3 className='header-body-text m-0'>{stage}</h3>
					</div>
					<Hvc
						removeDOM
						view={stage !== 'Election Result Submission Status' && stage !== 'Electoral Division'}
					>
						<TypeButton
							title={draftStatus ? 'Saving..' : 'Save as Draft'}
							buttonSize='little'
							buttonType='outlined'
							className='border-0 p-0 f-12'
							onClick={saveAsDraft}
						/>
					</Hvc>
				</div>
				<Hvc
					removeDOM
					view={!!selectedParentCode?.code}
					className='f-row-20 align-items-center'
				>
					<p className='m-0 text-little'>
						{selectedParentCode.name} <span className='color-label'>[ {selectedParentCode?.code} ]</span>
					</p>
					<Hvc
						removeDOM
						view={partyVoteStage === 'Party Votes' && !!selectedChildCode.name}
						className='f-row-20 align-items-center'
					>
						<RightArrowSVG />
						<p className='m-0 text-little'>
							{selectedChildCode.name} <span className='color-label'>[ {selectedChildCode?.code} ]</span>
						</p>
					</Hvc>
				</Hvc>
			</div>
			{/* Parent Code */}
			<Hvc
				removeDOM
				view={stage === 'Electoral Division'}
			>
				<ParentCodesStage />
			</Hvc>
			{/* Upload Result */}
			<Hvc
				removeDOM
				view={stage === 'Upload Result'}
				className='f-column-23 align-items-center w-100 py-2'
			>
				<UploadResultStage />
			</Hvc>
			{/* Upload Result Status */}
			<Hvc
				removeDOM
				view={stage === 'Upload Result Status'}
			>
				<UploadResultStatusStage
					onNext={() => {
						updateState('isUpdate', false);
						onStage('Result Summary');
					}}
					onView={() => {
						updateState('isUpdate', false);
						onStage('Upload Result');
					}}
				/>
			</Hvc>
			<Hvc
				removeDOM
				view={stage === 'Party Vote Summary'}
				className='f-column-33'
			>
				<VoteSummary />
				<TypeButton
					title='Done'
					buttonSize='small'
					onClick={() => onStage('Preview')}
				/>
			</Hvc>
			<Hvc
				removeDOM
				view={stage === 'Result Summary'}
			>
				<ResultSummaryStage />
			</Hvc>
			<Hvc
				removeDOM
				view={stage === 'Party Vote Count'}
			>
				<PartyVotesStage />
			</Hvc>
			<Hvc
				removeDOM
				view={stage === 'Preview'}
			>
				<Preview
					onStage={onStage}
					onSubmit={onSubmit}
					load={submitLoad}
					numberofUploadedFile={uploadedFiles.length}
				/>
			</Hvc>
			<Hvc
				removeDOM
				view={stage === 'Election Result Submission Status'}
			>
				<SubmitResultStatusStage
					onClick={onDoneSubmission}
					title='The Election Result has been submitted successfully'
					description='Your task has been completed, and no further action is required.
          Thank you for ensuring accuracy and fulfilling your
          responsibility.'
					btnTitle='Close'
				/>
			</Hvc>
			<div />
		</div>
	);
};

export default UploadResult;
