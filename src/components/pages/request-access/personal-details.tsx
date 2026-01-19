import { TypeButton } from '../../utils/button';
import FormBuilder from '../../utils/form-builder';
import { useFormHook } from '../../utils/hooks';
import { type IPersonalDetailsProps, personalDetailsFC, personalDetailsSchema } from './utils';

export const PersonalDetails = ({ onNext }: { onNext: (data: IPersonalDetailsProps) => void }) => {
	const [hookForm] = useFormHook<IPersonalDetailsProps>(personalDetailsSchema);

	return (
		<div className='f-column-33 mx-auto w-100'>
			<div className='f-column-13'>
				<h5 className='m-0'>Personal Details</h5>
				<p className='color-label m-0 font-14 color-label'>Please provide the correct details as requested below</p>
			</div>
			<FormBuilder
				hookForm={hookForm}
				formComponent={personalDetailsFC}
			/>
			<TypeButton
				title='Next'
				buttonSize='small'
				onClick={hookForm.handleSubmit(onNext)}
			/>
		</div>
	);
};
