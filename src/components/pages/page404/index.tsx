import React from 'react';
import { useNavigate } from 'react-router';

import { pageurl } from '../../../constants/pageurl';
import { TypeButton } from '../../utils/button';
import Icon from './page-illustration';

const Page404 = () => {
	const navigate = useNavigate();
	return (
		<div className='f-column-30 align-items-center p-4'>
			<Icon />
			<p>Sorry for the inconvenience</p>
			<TypeButton
				title='Back to home'
				onClick={() => navigate(pageurl.OVERVIEW)}
			/>
		</div>
	);
};

export default Page404;
