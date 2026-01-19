import type React from 'react';
import { type FC } from 'react';
import { Navigate } from 'react-router';

import { ISADMINLOGGED } from '../constants/global';
import { pageurl } from '../constants/pageurl';
import DataWrapper from '../wrapper/data-wrapper';

export interface IRouteProps {
	element: React.ElementType;
	path?: string | string[] | undefined;
}

const PublicRoute: FC<IRouteProps> = ({ element: Component }) => {
	if (ISADMINLOGGED()) {
		return <Navigate to={pageurl.OVERVIEW} />;
	}
	return (
		<DataWrapper publicRoute>
			<Component />
		</DataWrapper>
	);
};

export default PublicRoute;
