import './assets/style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss';

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router';

import { PulseSVG } from './components/utils/svgs';
import { pageurl } from './constants/pageurl';
import AuthRoute from './routes/auth-route';

const OverviewPage = React.lazy(async () => await import('./components/pages/overview'));
const Settings = React.lazy(async () => await import('./components/pages/settings'));
const SettingsProfile = React.lazy(async () => await import('./components/pages/settings/profile'));
const SettingsBankDetails = React.lazy(async () => await import('./components/pages/settings/bank-details'));
const SettingsGovernmentID = React.lazy(async () => await import('./components/pages/settings/government-id'));
const RequestAccess = React.lazy(async () => await import('./components/pages/request-access'));
const VerifyOTP = React.lazy(async () => await import('./components/pages/auth/verify-otp'));
const LoginPage = React.lazy(async () => await import('./components/pages/auth/login'));
const OnboardingPage = React.lazy(async () => await import('./components/pages/onboarding/Onboarding'));
const Page404 = React.lazy(async () => await import('./components/pages/page404'));
const AdminRoute = React.lazy(async () => await import('./routes/admin-route'));

const App = () => (
	<Router basename={process.env.PUBLIC_URL}>
		<Suspense
			fallback={
				<div
					style={{ width: '100%', height: '100vh' }}
					className='f-column text-center align-items-center'
				>
					<PulseSVG />
				</div>
			}
		>
			<Routes>
				{/* <Route
					path='/'
					element={<AdminRoute />}
				>
					<Route
						path={pageurl.OVERVIEW}
						element={<OverviewPage />}
					/>
					<Route
						path={pageurl.SETTINGS}
						element={<Settings />}
					/>
					<Route
						path={pageurl.SETTINGSPROFILE}
						element={<SettingsProfile />}
					/>
					<Route
						path={pageurl.SETTINGSBANKDETAILS}
						element={<SettingsBankDetails />}
					/>
					<Route
						path={pageurl.SETTINGSGOVERNMENTID}
						element={<SettingsGovernmentID />}
					/>
				</Route> */}
				<Route
					path='/'
					element={<AuthRoute />}
				>
					<Route
						path={pageurl.LOGIN}
						element={<LoginPage />}
					/>
					<Route
						path={pageurl.VERIFYOTP}
						element={<VerifyOTP />}
					/>
					<Route
						path={pageurl.REQUESTACCESS}
						element={<RequestAccess />}
					/>
					<Route
						path={pageurl.ONBOARDING}
						element={<OnboardingPage />}
					/>
				</Route>
				<Route
					path='*'
					element={<Page404 />}
				/>
			</Routes>
		</Suspense>
	</Router>
);

export default App;
