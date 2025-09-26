import { TypeButton } from '../../utils/button';
import { CardItems } from '../../utils/hooks';
import type { ursType } from './utils';

const Preview = ({
	onStage,
	onSubmit,
	load,
	numberofUploadedFile,
}: {
	onStage: (stage: ursType) => void;
	onSubmit: () => void;
	load: boolean;
	numberofUploadedFile: number;
}) => (
	<div className='f-column-17'>
		<div className='f-column-23 border-label rounded p-4 cursor-pointer'>
			<CardItems
				title=''
				value='Election results'
			/>
			<div className='f-row-12 align-items-center'>
				<TypeButton
					title='Preview'
					buttonSize='little'
					buttonType='outlined'
					onClick={() => onStage('Upload Result')}
				/>
				<p className='text-small m-0 color-label'>
					{numberofUploadedFile} file{numberofUploadedFile === 1 ? '' : 's'} uploaded
				</p>
			</div>
		</div>
		<div className='f-column-23 border-label rounded p-4 cursor-pointer'>
			<CardItems
				title=''
				value='Election Summary Data'
			/>
			<TypeButton
				title='Preview'
				buttonSize='little'
				buttonType='outlined'
				onClick={() => onStage('Result Summary')}
			/>
		</div>
		<div className='f-column-23 border-label rounded p-4 cursor-pointer'>
			<CardItems
				title=''
				value='Party Vote Count'
			/>
			<div className='f-row-12 align-items-center'>
				<TypeButton
					title='Preview'
					buttonSize='little'
					buttonType='outlined'
					onClick={() => onStage('Party Vote Count')}
				/>
				<TypeButton
					title='Vote Summary'
					buttonSize='little'
					buttonType='outlined'
					onClick={() => onStage('Party Vote Summary')}
				/>
			</div>
		</div>
		<div className='mt-4'>
			<TypeButton
				title='Submit'
				buttonSize='small'
				onClick={onSubmit}
				className='w-100'
				load={load}
			/>
		</div>
	</div>
);

export default Preview;
