import React from 'react';

import type { IGlobalRightSection } from '../../utils/right-section';

const PreviewMediaFile = ({ globalContext }: IGlobalRightSection) => {
	if (!globalContext) return <></>;

	const { rsProps } = globalContext;

	const { file } = rsProps?.data as { file: File };

	return (
		<div className='f-column-33'>
			<div className='f-column-10 w-100 text-left justify-content-between'>
				<h3 className='header-body-text m-0'>Preview Media File</h3>
			</div>
			<div className='f-row-33 align-items-center'>
				<p className='m-0 text-little color-label'>{file.name}</p>
			</div>
			<div
				className='border-label rounded'
				style={{ overflow: 'hidden' }}
			>
				{/* media section */}
				<img
					src={URL.createObjectURL(file)}
					alt='election result'
					className='w-100 h-100'
					style={{ objectFit: 'contain' }}
				/>
			</div>
		</div>
	);
};

export default PreviewMediaFile;
