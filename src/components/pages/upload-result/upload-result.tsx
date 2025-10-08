import React from 'react';

import { useGlobalContext } from '../../../context/global';
import { TypeButton } from '../../utils/button';
import { CardItems, Hvc } from '../../utils/hooks';
import { MultipleMediaUploadComponent } from '../../utils/multiple-upload-document';
import { BackArrowSVG, UploadIconSVG } from '../../utils/svgs';

const UploadResultStage = () => {
	const {
		global: {
			state: { files, isUpdate, isPreview: preview, uploadedFiles },
			updateState,
		},
		states,
		rsProps,
		actions,
		onStage,
	} = useGlobalContext();

	// console.log(uploadedFiles, 'JUJU')

	const isUploaded = !!uploadedFiles.length;

	const load = states?._irev?.upload_IRevResultLoading;

	const handlePreviewFile = (index: number) => {
		rsProps?.addRightSectionHistory();
		rsProps?.callSection({
			action: 'view',
			component: 'preview-media-file',
			title: 'Preview Select File',
			data: {
				file: files[index],
			},
		});
	};

	const onUploadDocument = () => {
		const fd = new FormData();
		files.forEach((i) => {
			fd.append('upload', i);
		});
		actions?.upload_Result({
			data: fd,
			onSuccess: (res) => {
				updateState('uploadedFiles', [res.data.uri]);
				onStage('Upload Result Status');
			},
		});
	};

	return (
		<div className='f-column-33 w-100'>
			<div
				className='f-row-12 align-items-center hw-mx cursor-pointer'
				onClick={() => onStage(preview ? 'Preview' : 'Electoral Division')}
			>
				<BackArrowSVG />
				<p className='m-0 text-little'>Back</p>
			</div>
			<div className='f-column-33 align-items-center w-100'>
				<Hvc
					removeDOM
					view={!files.length}
					className='border-label-bottom py-4 w-100'
				>
					<CardItems
						title='Step 1'
						value='Take a clear picture of the election results with your phone camera'
					/>
				</Hvc>
				<div className='w-100 f-column-33'>
					{!files.length ? (
						<CardItems
							title='Step 2'
							value='Upload the election results'
						/>
					) : null}
					<MultipleMediaUploadComponent
						setFiles={(files) => {
							updateState('files', files);
						}}
						handlePreviewFile={handlePreviewFile}
						files={files}
						load={load}
						uploadDocs={onUploadDocument}
						isUpdate={isUpdate}
						isUploaded={isUploaded}
						uploadedFiles={uploadedFiles}
					/>

					<Hvc
						removeDOM
						view={!!files.length}
						className='f-column-23 align-items-center w-100'
					>
						<TypeButton
							title={!isUpdate ? 'Upload' : 'Update'}
							buttonType={isUploaded && !isUpdate ? 'disabled' : 'bold'}
							disabled={isUploaded && !isUpdate}
							buttonSize='small'
							icon={<UploadIconSVG color='#fff' />}
							load={load}
							className='w-100'
							onClick={onUploadDocument}
						/>

						{isUploaded ? (
							<TypeButton
								title='Next >> Result Summary'
								buttonSize='small'
								className='w-100'
								buttonType='outlined'
								onClick={() => onStage('Result Summary')}
							/>
						) : null}
						{preview ? (
							<TypeButton
								title='End Preview'
								buttonSize='small'
								className='w-100 border-0'
								buttonType='outlined'
								onClick={() => onStage('Preview')}
							/>
						) : null}
					</Hvc>
				</div>
			</div>
		</div>
	);
};

export default UploadResultStage;
