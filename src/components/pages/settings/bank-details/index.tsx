import BreadCrumbs from '../../../utils/bread-crumbs';
import { TypeButton } from '../../../utils/button';
import FormBuilder, { type IFormComponent } from '../../../utils/form-builder';
import { useFormHook } from '../../../utils/hooks';

const BankDetails = () => {
	const [hookForm] = useFormHook({});

	const fc: IFormComponent[] = [
		{
			label: 'Bank Name',
			component: 'input',
			id: 'bankName',
		},
		{
			label: 'Account Name',
			component: 'input',
			id: 'accountName',
		},
		{
			label: 'Account Number',
			component: 'input',
			id: 'accountNumber',
		},
	];

	return (
		<div>
			<BreadCrumbs noHome />

			<div
				className='p-4 border-label rounded mt-4 f-column-24'
				style={{ maxWidth: '750px' }}
			>
				<div
					className='grid-wrapper-40 gap-23'
					style={{ maxWidth: '750px' }}
				>
					<FormBuilder
						formComponent={fc}
						hookForm={hookForm}
						min
					/>
				</div>
				<TypeButton
					title='Save'
					buttonType='outlined'
					buttonSize='medium'
				/>
			</div>
		</div>
	);
};

export default BankDetails;
