import { useNavigate } from 'react-router';

import { AngleRightSVG } from '../../../utils/svgs';

interface Props {
	label: string;
	value: string;
	path: string;
}

const SettingsMenuItem = ({ label, value, path }: Props) => {
	const navigate = useNavigate();

	return (
		<div
			className='settings-container_menuitem'
			onClick={() => navigate(path)}
		>
			<div>
				<h5>{label}</h5>
				<p>{value}</p>
			</div>
			<AngleRightSVG />
		</div>
	);
};

export default SettingsMenuItem;
