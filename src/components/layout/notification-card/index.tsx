import './NotificationCard.scss';

import type React from 'react';
import { useEffect, useState } from 'react';

import type { IActions } from '../../../interface/IAction';
import { CheckSVG, ErrorSVG } from '../../utils/svgs';

interface NotificationCardProps {
	notice: string;
	duration?: number; // Optional duration for how long the notification should be visible
	status?: boolean;
	actions: IActions;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notice, duration = 3000, status = true, actions }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		// Show the notification when the component is mounted
		setVisible(!!notice);

		// Hide the notification after the specified duration
		const timer = setTimeout(() => {
			setVisible(false);
		}, duration);

		const ndtimer = setTimeout(() => {
			actions?.notificationGlobal('', status);
		}, duration + 1000);

		// Cleanup the timer when the component is unmounted
		return () => {
			clearTimeout(timer);
			clearTimeout(ndtimer);
		};
	}, [notice]);

	return (
		<div className={`notification-card ${visible ? 'show' : ''} ${status ? 'success' : 'error'}`}>
			<div className='f-row-10 align-items-center'>
				<p className='m-0 text-small'>{notice}</p>
				<div
					className='hw-mx f-row aic jcc'
					style={{ width: '15px', height: '15px' }}
				>
					{status ? <CheckSVG color='green' /> : <ErrorSVG />}
				</div>
			</div>
		</div>
	);
};

export default NotificationCard;
