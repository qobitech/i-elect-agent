import BreadCrumbs from '../../../utils/bread-crumbs';
import { TypeButton } from '../../../utils/button';
import FormBuilder, { type IFormComponent } from '../../../utils/form-builder';
import { useFormHook } from '../../../utils/hooks';

const GovernmentID = () => {
	const [hookForm] = useFormHook({});

	const fc: IFormComponent[] = [
		{
			label: 'NIN',
			component: 'input',
			id: 'bankName',
		},
		{
			label: 'BVN',
			component: 'input',
			id: 'bankName',
		},
		{
			label: 'Drivers License ID',
			component: 'input',
			id: 'accountName',
		},
		{
			label: 'International Passport ID',
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

export default GovernmentID;
