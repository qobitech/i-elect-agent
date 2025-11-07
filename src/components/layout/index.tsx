import './style.scss';

import React, { useEffect } from 'react';

import { ISADMINLOGGED } from '../../constants/global';
import { GlobalContext } from '../../context/global';
import type { IActions } from '../../interface/IAction';
import type { IStates } from '../../interface/IReducer';
import { useAppData, useGetCodes } from '../pages/upload-result/hooks';
import type { ursType } from '../pages/upload-result/utils';
import { TypeButton } from '../utils/button';
import { useCopy, useInactivityTimeout, useSaveB4Changes } from '../utils/hooks';
// import Toast from '../utils/toast'
import NotificationModal, { useModal } from '../utils/new-modal';
import { useRightSection } from '../utils/right-section';
import { ClockSVG } from '../utils/svgs';
import { useCountDown } from '../utils/timer';
import ChildWrapper from './child-wrapper';
import GlobalRightSection from './global-right-section';
import Header from './header';
import NotificationCard from './notification-card';
import SideMenu, { menuData } from './side-menu';

export interface IDashboard {
	authRoute?: boolean;
	children?: any;
	generalRoute?: boolean;
	publicRoute?: boolean;
	adminRoute?: boolean;
	props?: any;
}

const Dashboard = ({ ...rest }: IDashboard) => {
	const { adminRoute, children, authRoute, generalRoute, publicRoute, ...props } = rest;

	const rsProps = useRightSection();
	const copyProps = useCopy();
	// const navigate = useNavigate()

	const { states, ...propsactions } = props as unknown as {
		states: IStates;
		[x: string]: any;
	};

	const actions = propsactions as IActions;

	const { global, saveAsDraft, restoreDraft, isDraft, clearDraft, clearDraftLocal } = useAppData(actions, states);

	const useNotificationProps = useModal();

	// const isSessionTimeout = states?.global?.sessionTimeoutGlobal?.status

	const handleWarning = () => {
		// if user is logged in
		if (adminRoute) {
			useNotificationProps.handleOpenModal('Inactivity Alert');
		}
	};
	const handleSignOut = () => {
		actions?.logout_Auth({});
	};
	const stayLoggedIn = () => {
		useNotificationProps.handleCloseModal();
	};

	const isInactive = useInactivityTimeout(540000, handleWarning, states); // 1 minutes

	useSaveB4Changes();

	const onStage = (stage: ursType) => {
		saveAsDraft();
		global.updateState('stage', stage);
	};

	const getCodeProps = useGetCodes({ actions, states, global });

	useEffect(() => {
		if (ISADMINLOGGED() && global.state.selectedParentCode?.code) {
			getCodeProps.handleCodes();
		}
	}, [global.state.parentCodes.length]);

	return (
		<>
			<NotificationModal
				useNotificationProps={useNotificationProps}
				size='wide'
				disableClose
			>
				<InactivityAlert
					stayLoggedIn={stayLoggedIn}
					handleSignOut={handleSignOut}
					startTimer={isInactive}
				/>
			</NotificationModal>

			<GlobalContext.Provider
				value={{
					rsProps,
					copyProps,
					states,
					actions: actions as unknown as IActions,
					global,
					saveAsDraft,
					restoreDraft,
					clearDraft,
					clearDraftLocal,
					isDraft,
					onStage,
					getCodeProps,
				}}
			>
				<NotificationCard
					actions={actions}
					notice={states?.global?.notificationGlobal?.notice || ''}
					status={states?.global?.notificationGlobal?.status || false}
				/>
				<GlobalRightSection />
				<div className='main-container'>
					<div className='child-container'>
						{adminRoute ? (
							<SideMenu
								menu={menuData}
								actions={actions}
							/>
						) : null}
						<div className='main-content-container w-100'>
							{adminRoute ? (
								<Header
									actions={actions}
									rsProps={rsProps}
								/>
							) : null}
							<ChildWrapper>{children}</ChildWrapper>
						</div>
					</div>
				</div>
			</GlobalContext.Provider>
		</>
	);
};

export default Dashboard;

const InactivityAlert = ({
	stayLoggedIn,
	handleSignOut,
	startTimer,
}: {
	stayLoggedIn: () => void;
	handleSignOut: () => void;
	startTimer: boolean;
}) => {
	const countdown = useCountDown(20, startTimer);
	const isExpired = countdown === '00:00:00';

	useEffect(() => {
		if (isExpired) {
			handleSignOut();
		}
	}, [isExpired]);

	return (
		<div className='f-column-33 text-center p-4 align-items-center'>
			<div className='f-row-10 align-items-center justify-content-center'>
				<ClockSVG />
				<h4 className='m-0 color-danger'>Inactivity Alert</h4>
			</div>
			<p className='text-little'>
				We noticed that you have been inactive for a while. To keep your account secure, you will be automatically logged out in{' '}
				<span className='color-danger'>{countdown}</span> if no activity is detected.
			</p>
			<TypeButton
				title='Please Click here to stay logged in'
				onClick={stayLoggedIn}
				buttonSize='small'
			/>
		</div>
	);
};
