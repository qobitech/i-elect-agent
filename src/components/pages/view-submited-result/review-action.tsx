import { type FC, useState } from 'react';
import styled from 'styled-components';

import { type IStates } from '../../../interface/IReducer';
import { type IIRevResultState } from '../../../interface/state/IRev';
import { type IUSH } from '../../layout/state-hook';
import { TypeButton } from '../../utils/button';
import { Hvc, MediaItem } from '../../utils/hooks';
import { OneColumnSVG, TwoColumnSVG } from '../../utils/svgs';
import { type IEditElectionResultState, type reviewType } from './helpers';

interface IReviewAction {
	result: IIRevResultState;
	states: IStates;
	onReview: (review: reviewType) => () => void;
	addNotes: () => void;
	approveResult: () => void;
	deleteResult: () => void;
	onDataRefresh: () => void;
	successTxt: string;
	onClose: () => void;
	global: IUSH<IEditElectionResultState>;
}

const ReviewAction: FC<IReviewAction> = ({
	result,
	onReview,
	addNotes,
	approveResult,
	deleteResult,
	successTxt,
	global,
	onDataRefresh,
}) => {
	const {
		state: { comment, success, error, review, loading, navIndex },
		updateState,
	} = global;

	return (
		<>
			<Hvc
				removeDOM
				view={!success}
				className='f-row-20 align-items-stretch w-100'
			>
				{/* document */}
				<Hvc
					view
					className={`f-column-10 w-100 ${!review ? 'flex-basis-100' : 'flex-basis-60'}`}
				>
					{/* document */}
					<div
						className='w-100 text-center'
						style={{ height: '67vh', overflow: 'auto' }}
					>
						<MediaItem
							url={result?.documentUrls?.[navIndex]}
							key={navIndex}
						/>
					</div>
				</Hvc>
				<Hvc
					removeDOM
					view={!!review}
					className='f-column-10 flex-basis-40'
				>
					{/* replace result */}
					<Hvc
						view={review === 'replace'}
						className='h-100 f-column-33'
					>
						<div className='f-row-12 align-items-center justify-content-center'>
							<TypeButton
								title='Replace'
								buttonSize='little'
								buttonType='outlined'
							/>
							<TypeButton
								title='Cancel'
								buttonType='danger'
								buttonSize='little'
								onClick={onReview(undefined)}
							/>
						</div>
					</Hvc>
					{/* add notes */}
					{/* <AddNotesForm
						review={review}
						error={error}
						comment={comment}
						loading={loading}
						addNotes={addNotes}
						onReview={onReview}
						updateState={updateState}
					/>
					{/* approve result */}
					{/* <ApproveResultForm
						review={review}
						approveResult={approveResult}
						loading={loading}
						onReview={onReview}
					/> */}
					{/* request delete result */}
					{/* <RequestDeleteResultForm
						review={review}
						deleteResult={deleteResult}
						loading={loading}
						onReview={onReview}
					/> */}
					{/* approve delete result */}
					{/* <ApproveDeleteRequestForm
						review={review}
						deleteResult={deleteResult}
						loading={loading}
						onReview={onReview}
					/> */}
					{/* cancel delete result */}
					{/* <CancelDeleteRequestForm
						review={review}
						deleteResult={deleteResult}
						loading={loading}
						onReview={onReview}
					/> */}
					{/* review delete request */}
					{/* <DeleteRequestForm
						review={review}
						deleteResult={deleteResult}
						loading={loading}
						onReview={onReview}
					/> */}
					{/* flag result */}
					{/* <ResultFlagForm
						review={review}
						error={error}
						loading={loading}
						onReview={onReview}
						global={global}
						result={result}
						onDataRefresh={onDataRefresh}
					/> */}
				</Hvc>
			</Hvc>
			<Hvc
				removeDOM
				view={success}
				className='flex-basis-60 f-column-53 align-items-center text-center border-label rounded p-5'
			>
				<h2>{successTxt}</h2>
				<TypeButton
					buttonSize='small'
					buttonType='outlined'
					onClick={() => {
						onReview(undefined)();
						updateState('success', false);
					}}
					title='Close'
				/>
			</Hvc>
		</>
	);
};

export default ReviewAction;

export const SwitchLayout = ({ defaultIndex, onLayout }: { defaultIndex: number; onLayout: (item: number) => void }) => {
	const [selected, setSelected] = useState<number>(defaultIndex);

	const handleSelectLayout = (item: number) => () => {
		setSelected(item);
		onLayout(item);
	};
	return (
		<SwitchLayoutComponent className='f-row-7 align-items-center'>
			<div
				className={`f-row-7 border rounded p-2 align-items-center tab-switch-item ${selected === 1 ? 'active' : ''}`}
				onClick={handleSelectLayout(1)}
			>
				<p className='m-0 text-tiny'>One column</p>
				<OneColumnSVG color={selected === 1 ? '#fff' : ''} />
			</div>
			<div
				className={`f-row-7 border rounded p-2 align-items-center tab-switch-item ${selected === 2 ? 'active' : ''}`}
				onClick={handleSelectLayout(2)}
			>
				<p className='m-0 text-tiny'>Two column</p>
				<TwoColumnSVG color={selected === 2 ? '#fff' : ''} />
			</div>
		</SwitchLayoutComponent>
	);
};

const SwitchLayoutComponent = styled.div`
	.tab-switch-item {
		height: 35px;
		cursor: pointer;
		&.active {
			background: #000;
			color: #fff;
		}
	}
`;
