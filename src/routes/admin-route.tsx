import React, { type FC } from 'react';
import { Navigate, Outlet } from 'react-router';

import { ISADMINLOGGED } from '../constants/global';
import { pageurl } from '../constants/pageurl';
import DataWrapper from '../wrapper/data-wrapper';

export interface IRouteProps {
	path?: string | string[] | undefined;
}

const AdminRoute: FC<IRouteProps> = () => {
	if (!ISADMINLOGGED()) {
		return <Navigate to={pageurl.LOGIN} />;
	}
	return (
		<DataWrapper adminRoute>
			<Outlet />
		</DataWrapper>
	);
};

export default AdminRoute;
