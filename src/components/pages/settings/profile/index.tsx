import BreadCrumbs from '../../../utils/bread-crumbs';
import { TypeButton } from '../../../utils/button';
import FormBuilder, { type IFormComponent } from '../../../utils/form-builder';
import { useFormHook } from '../../../utils/hooks';
import { TabSection, useTabSection } from '../../../utils/tab-section';

const Profile = () => {
	const [hookForm] = useFormHook({});

	const fc: IFormComponent[] = [
		{
			label: 'First Name',
			component: 'input',
			id: 'firstName',
		},
		{
			label: 'Last Name',
			component: 'input',
			id: 'lastName',
		},
		{
			label: 'Email Address',
			component: 'input',
			id: 'email',
		},
		{
			label: 'Phone Number',
			component: 'input',
			id: 'phone',
		},
		{
			label: 'Gender',
			component: 'input',
			initOptions: { label: '', value: '', id: 1 },
			id: 'gender',
		},
		{
			label: 'Date of Birth',
			component: 'input',
			type: 'date',
			id: 'dateofbirth',
		},
		{
			label: 'NIN',
			component: 'input',
			id: 'nin',
		},
	];

	const tabs = {
		BASIC: 'Basic Information',
		LOCATION: 'Location',
		FIELD: 'Field Readiness',
	};
	const tabSection = useTabSection(tabs.BASIC, tabs);

	return (
		<div>
			<BreadCrumbs noHome />
			<div className='pt-4'>
				<TabSection
					tabProps={tabSection.tabProps}
					tabGap='40'
					type='default'
					position='start'
				/>
			</div>
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
					disabled
				/>
			</div>
		</div>
	);
};

export default Profile;
