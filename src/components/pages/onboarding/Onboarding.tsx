import { TypeButton } from '../../utils/button';
import FormBuilder, { type IFormComponent } from '../../utils/form-builder';
import { useFormHook } from '../../utils/hooks';
import { type IOnboardingHK, onboardingSchema } from './Onboarding.helpers';

const Onboarding = () => {
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
			id: 'governmentDocument',
			label: 'Government Document',
			component: 'input',
			type: 'file',
		},
		{
			id: 'tandc',
			label: 'I agree to the Terms and Conditions.',
			component: 'check-box',
		},
	];

	const onSubmit = () => {};

	return (
		<div className='onboarding-form-container'>
			<div className='box-shadow p-5 f-column-33 onboarding-form'>
				<div>
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
