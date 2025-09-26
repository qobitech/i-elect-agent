import './settings.scss';

import { pageurl } from '../../../constants/pageurl';
import { AngleRightSVG } from '../../utils/svgs';
import SettingsMenuItem from './government-id/Settings.MenuItem';

const Settings = () => (
	<div>
		<div className='page-header'>
			<h2>Settings</h2>
		</div>
		<div className='settings-container'>
			<SettingsMenuItem
				label='Profile'
				value='This section contains the basic identifying information used across your account and for verification purposes.'
				path={pageurl.SETTINGSPROFILE}
			/>
			<SettingsMenuItem
				label='Bank Details'
				value='Your financial account information such as bank name, account number, routing number, and account type.'
				path={pageurl.SETTINGSBANKDETAILS}
			/>
			<SettingsMenuItem
				label='Government ID'
				value={
					"Official identification documents issued by government authorities, such as driver's license, passport, national ID card, or state ID."
				}
				path={pageurl.SETTINGSGOVERNMENTID}
			/>
		</div>
	</div>
);

export default Settings;
