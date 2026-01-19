import { TypeButton } from '../../utils/button';

export const Preview = ({
	onSubmit,
	load,
	onLocation,
	onPersonal,
}: {
	onSubmit: () => void;
	load: boolean;
	onPersonal: () => void;
	onLocation: () => void;
}) => (
	<div className='f-column-33'>
		<div className='grid-wrapper-40 gap-33'>
			<div
				className='border rounded p-4 cursor-pointer'
				onClick={onPersonal}
			>
				<p>Personal Details</p>
			</div>
			<div
				className='border rounded p-4 cursor-pointer'
				onClick={onLocation}
			>
				<p>Location Details</p>
			</div>
		</div>
		<TypeButton
			title='Submit'
			onClick={onSubmit}
			load={load}
		/>
	</div>
);
