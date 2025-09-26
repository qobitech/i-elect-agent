import React, { useEffect } from 'react';
import * as yup from 'yup';

import { useGlobalContext } from '../../../context/global';
import type { IElectionResultDetails } from '../../../store/actions/query/result';
import { TypeButton } from '../../utils/button';
import { TypeInput } from '../../utils/input';
import { AISVG, BackArrowSVG } from '../../utils/svgs';
import ExtractDataAI from './extract-data-ai';
import type { IResultSummary } from './utils';

export const defaultIFH: IResultSummary = {
	DataVotersOnRegister: 0,
	DataAccreditedVoters: 0,
	DataBallotPapersIssuedToPoolingUnit: 0,
	DataUnusedBallotPapers: 0,
	DataRejectedBallot: 0,
	DataTotalValidVotes: 0,
	DataTotalUsedBallotPapers: 0,
};

export const schema = {
	DataVotersOnRegister: yup.string(),
	DataAccreditedVoters: yup.string(),
	DataBallotPapersIssuedToPoolingUnit: yup.string(),
	DataUnusedBallotPapers: yup.string(),
	DataRejectedBallot: yup.string(),
	DataTotalValidVotes: yup.string(),
	DataTotalUsedBallotPapers: yup.string(),
};

const ResultSummaryStage = () => {
	const {
		global: {
			state: { resultSummary, isPreview: preview, onExtract },
			updateState,
		},
		onStage,
		states,
	} = useGlobalContext();

	function transformString(input: string): string {
		// Step 1: Remove "Data" from the string
		let result = input.replace(/^Data/, '');

		// Step 2: Add a space before each uppercase letter, except the first one
		result = result.replace(/([A-Z])/g, ' $1').trim();

		// Step 3: Add "Total" if it's not already in the string
		if (!result.includes('Total')) {
			result = `Total ${result}`;
		}

		return result;
	}

	const onCompleted = () => {
		onStage('Party Vote Count');
	};

	const onPreview = () => {
		onStage('Preview');
	};

	useEffect(() => {
		const extractedSummary = states?._result?.extract_ResultUrl?.pollingUnitDetails!;

		const mapResultSummary = {
			DataVotersOnRegister: extractedSummary?.numberOfVotersOnRegister || 0,
			DataAccreditedVoters: extractedSummary?.numberOfAccreditedVoters || 0,
			DataBallotPapersIssuedToPoolingUnit: extractedSummary?.numberOfBallotPapersIssued || 0,
			DataUnusedBallotPapers: extractedSummary?.numberOfUnusedBallotPapers || 0,
			DataRejectedBallot: extractedSummary?.numberOfRejectedBallots || 0,
			DataTotalValidVotes: extractedSummary?.numberOfTotalValidVotes || 0,
			DataTotalUsedBallotPapers: extractedSummary?.totalNumberOfUsedBallotPapers || 0,
		};

		const res = {
			...resultSummary,
			...mapResultSummary,
		};

		updateState('resultSummary', res);
	}, [states?._result?.extract_ResultUrl]);

	return (
		<div className='f-column-33'>
			<div
				className='f-row-12 align-items-center hw-mx cursor-pointer'
				onClick={() => {
					onStage(preview ? 'Preview' : 'Upload Result');
				}}
			>
				<BackArrowSVG />
				<p className='m-0 text-little'>Back</p>
			</div>
			<div className='f-row justify-content-between'>
				<p className='m-0 text-little color-label'>Input the correct details.</p>
				<TypeButton
					title={onExtract ? 'Close AI Data Extraction' : 'Extract Data with AI'}
					buttonSize='small'
					icon={<AISVG fill={onExtract ? '#000' : ''} />}
					onClick={() => updateState('onExtract', !onExtract)}
					buttonType={onExtract ? 'outlined' : 'bold'}
					disabled={states?._result?.extract_ResultUrlLoading}
				/>
			</div>
			<div className='f-row-responsive-reverse-33'>
				<div className={`f-column-33 ${onExtract ? 'flex-basis-40' : 'w-100'}`}>
					<div className='grid-wrapper-40 gap-33'>
						{Object.keys(resultSummary).map((i, index) => (
							<TypeInput
								key={index}
								label={transformString(i)}
								placeholder={`Enter ${transformString(i)}`}
								id={i}
								value={resultSummary[i as keyof IResultSummary]}
								onClick={(e) => e.currentTarget.select()}
								onChange={(e) => {
									const { id, value } = e.target;
									updateState('resultSummary', {
										...resultSummary,
										[id]: isNaN(parseInt(value)) ? 0 : parseInt(value),
									});
								}}
								type='text'
								inputMode='numeric'
								pattern='[0-9]*'
							/>
						))}
					</div>
					<div className='f-row-12 align-items-center'>
						<TypeButton
							buttonSize='small'
							buttonType='outlined'
							title='Previous'
							className='border-0'
							onClick={() => {
								onStage('Upload Result');
							}}
						/>
						<TypeButton
							buttonSize='small'
							title='Next >> Party Vote Count'
							className='w-100'
							onClick={onCompleted}
						/>
					</div>
					{preview ? (
						<div className='f-row-12 align-items-center'>
							<TypeButton
								buttonSize='small'
								buttonType='outlined'
								title='End Preview'
								className='w-100 border-0'
								onClick={onPreview}
							/>
						</div>
					) : null}
				</div>
				<div className={`f-column-33 ${onExtract ? 'flex-basis-60' : 'd-none'}`}>
					<ExtractDataAI />
				</div>
			</div>
		</div>
	);
};

export default ResultSummaryStage;
