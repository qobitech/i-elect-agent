import type React from 'react';
import { type FC } from 'react';

import DataWrapper from '../wrapper/data-wrapper';

export interface IRouteProps {
	element: React.ElementType;
	path?: string | string[] | undefined;
}

const GeneralRoute: FC<IRouteProps> = ({ element: Component }) => (
	<DataWrapper generalRoute>
		<Component />
	</DataWrapper>
);

export default GeneralRoute;
