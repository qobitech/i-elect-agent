import './style.scss';

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

import logo from '../../../assets/images/logo.png';
import { getUserData } from '../../../constants/global';
import { pageurl } from '../../../constants/pageurl';
import type { IActions } from '../../../interface/IAction';
import { DropDownMenu } from '../../utils/hooks';
import type { IRightSection } from '../../utils/right-section';
import { HamburgerSVG } from '../../utils/svgs';

const Header = ({ actions, rsProps }: { actions: IActions; rsProps: IRightSection<{}> }) => {
	const navigate = useNavigate();

	const dropDownItems = useMemo(
		() => [
			{
				action: () => {
					actions.logout_Auth({});
				},
				icon: '',
				title: 'Log out',
				disabled: false,
			},
		],
		[]
	);

	const onOpenMenu = () => {
		rsProps.callSection({
			action: 'view',
			component: 'side-menu-mobile',
			title: 'Menu',
		});
	};

	return (
		<div className='header-wrapper'>
			<div className='f-row-60 w-100 justify-content-between align-items-center'>
				<div className='f-row-15 nav-brand align-items-center after-lg'>
					<img
						src={logo}
						alt=''
						style={{ width: '150px' }}
						onClick={() => navigate(pageurl.OVERVIEW)}
					/>
				</div>
				<div
					className='after-lg hw-mx cursor-pointer ml-auto'
					onClick={onOpenMenu}
				>
					<HamburgerSVG />
				</div>
				<div className='f-row-20 align-items-center ml-auto justify-content-end only-lg'></div>
				<div className='f-row-20 align-items-center ml-auto justify-content-end only-lg'>
					<div
						className='px-2 py-1'
						style={{ borderRadius: '25px', border: '1px solid green' }}
					>
						<p
							className='m-0'
							style={{ fontSize: '12px', color: 'green' }}
						>
							{getUserData()?.user?.UserName || ''}
						</p>
					</div>
					<DropDownMenu
						id='dropdownMenuButton'
						dropDownIcon='fa fa-ellipsis-v text-small px-2'
						items={dropDownItems}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
