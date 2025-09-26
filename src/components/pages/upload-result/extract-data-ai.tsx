import { useState } from 'react';

import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { MediaItem } from '../../utils/hooks';
import { LeftNavSVG, RightNavSVG } from '../../utils/svgs';
import TextPrompt from '../../utils/text-prompt';

const ExtractDataAI = () => {
	const {
		global: { state },
		actions,
		states,
	} = useGlobalContext();

	const [navIndex, setNavIndex] = useState<number>(0);
	const [isExtract, setIsExtract] = useState<boolean>(false);

	const extractData = () => {
		// const file = state.files[navIndex]
		// const formData = new FormData()
		// formData.append('file', file)
		// actions?.extract_ResultUrl({
		//   data: formData,
		//   onSuccess: () => {}
		// })
		actions?.extract_ResultUrl({
			url: state.uploadedFiles[navIndex],
			onSuccess: () => {},
		});
		setIsExtract(true);
	};

	const load = states?._result?.extract_ResultUrlLoading;

	const total = state.uploadedFiles.length || 0;

	const navigate = (nav: 'prev' | 'next') => () => {
		const vigate = nav === 'prev' ? Math.max(0, navIndex - 1) : Math.min(total - 1, navIndex + 1);
		setNavIndex(vigate);
	};

	const isSuccessful = !!states?._result?.extract_ResultUrl?.documentTitle;

	const prompt = load ? 'Extracting Results...' : isSuccessful ? 'Extraction Successful' : 'Extraction Failed';

	return (
		<div className='border-label rounded f-column-9 align-items-center pt-2'>
			<div className='f-row-20 align-items-center justify-content-between w-100 px-2'>
				<div className='f-row-20 align-items-center'>
					<TypeButton
						title='Extract Data'
						onClick={extractData}
						load={load}
						buttonSize='small'
					/>
					{isExtract || isSuccessful ? (
						<TextPrompt
							prompt={prompt}
							status={isSuccessful}
							noStatus={load}
						/>
					) : null}
				</div>
				<div className='f-row-20 align-items-center'>
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
				</div>
			</div>

			<div
				className='w-100 text-center'
				style={{ height: '65vh', overflow: 'auto' }}
			>
				<MediaItem
					url={state.uploadedFiles[navIndex]}
					key={navIndex}
					isCover
				/>
			</div>
		</div>
	);
};

export default ExtractDataAI;
