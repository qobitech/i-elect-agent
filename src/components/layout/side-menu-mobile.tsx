import React, { useMemo } from 'react';

import type { IGlobalRightSection } from '../utils/right-section';
import { SwitchOffSVG } from '../utils/svgs';
import { menuData, MenuItem } from './side-menu';

const SideMenuMobile = ({ globalContext }: IGlobalRightSection) => {
	if (!globalContext) return <></>;

	const { actions } = globalContext;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const filteredMenu = useMemo(() => menuData.filter((i) => !i.hide), [menuData]);

	return (
		<div>
			<ul
				className='f-column-22 m-0 p-0 px-1'
				style={{ overflow: 'auto' }}
			>
				{filteredMenu.map((menuItem, index) => (
					<MenuItem
						icon={menuItem.icon}
						title={menuItem.title}
						isActive={menuItem.isActive}
						key={index}
						pageUrl={menuItem.pageUrl}
						sub={menuItem.sub}
					/>
				))}
				<div className='logout-section border-0 p-0'>
					<MenuItem
						icon={<SwitchOffSVG />}
						title='Logout'
						pageUrl='sdwdfw'
						action={() => {
							actions?.logout_Auth({});
						}}
					/>
				</div>
			</ul>
		</div>
	);
};

export default SideMenuMobile;
