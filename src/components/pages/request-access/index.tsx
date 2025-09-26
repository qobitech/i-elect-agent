import { useState } from 'react';

import { useGlobalContext } from '../../../context/global';
import type { ICreateVolunteer } from '../../../store/actions/core/volunteer';
import { Hvc } from '../../utils/hooks';
import { LocationDetails } from './location-details';
import { PersonalDetails } from './personal-details';
import { Preview } from './preview';
import { RequestStatus } from './request-status';
import type { ILocationDetailsProps, IPersonalDetailsProps, stageType } from './utils';

const RequestAccess = () => {
	const { actions, states } = useGlobalContext();
	const [stage, setStage] = useState<stageType>(() => 'Personal');
	const [response, setResponse] = useState<boolean>(false);
	const [req, setReq] = useState<{
		location: ILocationDetailsProps | undefined;
		personal: IPersonalDetailsProps | undefined;
	}>({ location: undefined, personal: undefined });

	const onSubmit = () => {
		const personal = req.personal!;
		const location = req.location!;
		actions?.create_Volunteer({
			data: {
				...personal,
				...location,
			} as ICreateVolunteer,
			onSuccess: () => {
				setResponse(true);
			},
		});
	};

	const onNext = (data: IPersonalDetailsProps) => {
		setReq((p) => ({ ...p, personal: data }));
		setStage('Location');
	};
	const onPreview = (data: ILocationDetailsProps) => {
		setReq((p) => ({ ...p, location: data }));
		setStage('Preview');
	};

	console.log(req, 'juju');

	return (
		<>
			<div className='f-column-33 py-5'>
				<div
					style={{ maxWidth: '600px' }}
					className='f-column-33 mx-auto w-100 pt-5 pb-3 px-5 border rounded'
				>
					<div className='f-column-13'>
						<h2 className='m-0'> Election Result Management System (Result Upload App) - Request Access</h2>
						<p className='color-label m-0'>
							If you are not yet registered and need access to upload results, please fill out the form below. Our team will
							review your request, and you&apos;ll receive a notification once access has been granted.
						</p>
					</div>
					<Hvc
						removeDOM
						view={stage === 'Personal'}
						className='f-column-33 py-5'
					>
						<PersonalDetails onNext={onNext} />
					</Hvc>
					<Hvc
						removeDOM
						view={stage === 'Location'}
						className='f-column-33 py-5'
					>
						<LocationDetails onPreview={onPreview} />
					</Hvc>
					<Hvc
						removeDOM
						view={stage === 'Preview'}
						className='f-column-33 py-5'
					>
						<Preview
							onPersonal={() => {
								setStage('Personal');
							}}
							onLocation={() => {
								setStage('Location');
							}}
							load={states?._volunteer?.create_VolunteerLoading || false}
							onSubmit={onSubmit}
						/>
					</Hvc>
				</div>
			</div>
			<Hvc
				removeDOM
				view={response}
				className='f-column-33 py-5'
			>
				<RequestStatus />
			</Hvc>
		</>
	);
};

export default RequestAccess;
