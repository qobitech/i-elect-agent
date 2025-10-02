import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import logo from '../../../assets/images/logo.png';
import { useGlobalContext } from '../../../context/global';
import { useQuery } from '../../../hooks/useQuery';
import { TypeButton } from '../../utils/button';
import FormBuilder, { type IFormComponent } from '../../utils/form-builder';
import { HvcLoad, useFormHook } from '../../utils/hooks';
import { AlertSVG, PulseSVG } from '../../utils/svgs';
import { type IOnboardingHK, nigerianBanks, onboardingSchema } from './Onboarding.helpers';

const Onboarding = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const queries = useQuery();
	const { states, actions } = useGlobalContext();

	const [success, setSuccess] = useState<boolean>(false);

	const [hookForm] = useFormHook<IOnboardingHK>(onboardingSchema);

	const fc: IFormComponent[] = [
		{
			id: 'accountName',
			label: 'Account Name',
			component: 'input',
		},
		{
			id: 'accountNumber',
			label: 'Account Number',
			component: 'input',
		},
		{
			id: 'bankName',
			label: 'Bank Name',
			component: 'select',
			initOptions: { id: 1, label: 'Select Bank', value: '' },
			optionData: nigerianBanks.map((i, index) => ({
				id: index,
				label: i,
				value: i,
			})),
		},
		{
			id: 'votersNumber',
			label: 'Enter your Voters Card ID',
			component: 'input',
		},
		{
			id: 'photoUrl',
			label: 'Upload your Photo',
			component: 'file',
		},
		{
			id: 'documentUrl',
			label: 'Upload a valid Government ID',
			component: 'file',
		},
		{
			id: 'tandc',
			label: 'I agree to the Terms and Conditions.',
			component: 'check-box',
		},
	];

	const verify = () => {
		setLoading(true);

		actions?.verify_Volunteer_Onboarding({
			token: queries.token,
			onSuccess: () => {
				setLoading(false);
			},
			onFailure: () => {
				setLoading(false);
				setError('Invalid onboarding link');
			},
		});
	};

	useEffect(() => {
		verify();
	}, []);

	const dataRes = states?._volunteer?.verify_Volunteer_Onboarding?.data;

	const onSubmit = (data: IOnboardingHK) => {
		actions?.onboard_Volunteer({
			data: {
				volunteerId: dataRes?.id ?? 0,
				accountName: data.accountName ?? '',
				accountNumber: data.accountNumber ?? '',
				bankName: data.bankName ?? '',
			},
			onSuccess: () => {
				setSuccess(true);
			},
			onFailure: () => {
				setError('Something went wrong');
			},
		});
	};

	if (loading) return <PulseSVG />;

	if (error)
		return (
			<div className='onboarding-form-container'>
				<div className='box-shadow p-5 f-column-33 onboarding-form'>
					<div className='onboarding-form-container_error'>
						<AlertSVG />
						<h1 className='mb-5'>{error}</h1>
						<TypeButton
							title='Back to Home'
							onClick={() => navigate('/')}
							buttonSize='small'
							buttonType='danger'
						/>
					</div>
				</div>
			</div>
		);

	return (
		<>
			<HvcLoad
				view={!success}
				className='onboarding-form-container'
			>
				<div className='box-shadow p-5 f-column-33 onboarding-form'>
					<div className='onboarding-form-container_logo-container'>
						<img
							className='logo-section'
							src={logo}
						/>
					</div>
					<div className='onboarding-form-container_header'>
						<h1>{success ? 'Onboarding Complete' : 'Complete your onboarding'}</h1>
						{!success && (
							<p>
								Submit your personal details to verify your identity and finalize your registration as an election agent. Your
								information is kept secure and confidential.
							</p>
						)}
					</div>

					{!success ? (
						<>
							<form
								className='grid-wrapper-100 gap-33'
								onSubmit={(e) => e.preventDefault()}
							>
								<FormBuilder
									formComponent={fc}
									hookForm={hookForm}
									min
								/>
							</form>
							{!success ? (
								<TypeButton
									title='Submit'
									load={states?._volunteer?.verify_Volunteer_OnboardingLoading}
									onClick={hookForm.handleSubmit(onSubmit)}
								/>
							) : (
								<TypeButton
									title='Login'
									onClick={() => navigate('/login')}
								/>
							)}
						</>
					) : null}
				</div>
			</HvcLoad>
		</>
	);
};

export default Onboarding;
