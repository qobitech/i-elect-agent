import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import logo from '../../../assets/images/logo.png';
import { useGlobalContext } from '../../../context/global';
import { useQuery } from '../../../hooks/useQuery';
import { TypeButton } from '../../utils/button';
import FormBuilder, { type IFormComponent } from '../../utils/form-builder';
import { useFormHook } from '../../utils/hooks';
import { AlertSVG, PulseSVG } from '../../utils/svgs';
import { type IOnboardingHK, onboardingSchema } from './Onboarding.helpers';

const Onboarding = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const queries = useQuery();
	const { states, actions } = useGlobalContext();

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
			component: 'input',
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

	const onSubmit = (data: IOnboardingHK) => {
		actions?.onboard_Volunteer({
			data: {
				volunteerId: 0,
				accountName: data.accountName ?? '',
				accountNumber: data.accountNumber ?? '',
				bankName: data.bankName ?? '',
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
		<div className='onboarding-form-container'>
			<div className='box-shadow p-5 f-column-33 onboarding-form'>
				<div className='onboarding-form-container_logo-container'>
					<img
						className='logo-section'
						src={logo}
					/>
				</div>
				<div className='onboarding-form-container_header'>
					<h1>Complete your onboarding</h1>
					<p>
						Submit your personal details to verify your identity and finalize your registration as an election agent. Your
						information is kept secure and confidential.
					</p>
				</div>

				<form
					className='grid-wrapper-100 gap-33'
					onSubmit={hookForm.handleSubmit(onSubmit)}
				>
					<FormBuilder
						formComponent={fc}
						hookForm={hookForm}
						min
					/>
				</form>

				<TypeButton title='Submit' />
			</div>
		</div>
	);
};

export default Onboarding;
