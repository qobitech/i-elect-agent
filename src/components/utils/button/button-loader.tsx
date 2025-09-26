import './button-loader.scss';

import type React from 'react';

const ButtonLoader: React.FC<React.ComponentPropsWithoutRef<'span'>> = ({ ...props }) => (
	<div className='loading'>
		<span {...props}></span>
		<span {...props}></span>
		<span {...props}></span>
	</div>
);

export default ButtonLoader;
