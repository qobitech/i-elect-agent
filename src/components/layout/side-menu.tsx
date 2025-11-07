import React, { type FC, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import logo from '../../assets/images/logo.png';
import { _isUrl } from '../../components/utils/helper';
import {
	AngleDownSVG,
	AngleRightSVG,
	OverviewSVG,
	ResultSVG,
	SettingsSVG,
	SwitchOffSVG,
	// OverviewSVG,
	// UploadIconSVG,
	// AdminManagementSVG,
	// ElectionSVG
} from '../../components/utils/svgs';
import { pageurl } from '../../constants/pageurl';
import type { IActions } from '../../interface/IAction';
import { Hvc } from '../utils/hooks';

export const getResultTabs = (url: string) => url.toLowerCase().trim().replace(/ /g, '-');

interface IMenuSub {
	title: string;
	action?: () => void;
	hide?: boolean;
	url: string;
}

interface IMenuItem {
	title: string;
	isActive?: boolean;
	icon: JSX.Element;
	pageUrl: string;
	action?: () => void;
	hide?: boolean;
	sub?: IMenuSub[];
}

export const resultTabEnums = {
	VIOLATION: 'Violations',
	STATUSSUMMARY: 'Status Summary',
	TRANSACTIONS: 'Transactions',
};

export const isPage = (query: string, value: string) => query === getResultTabs(value);

export const menuData: IMenuItem[] = [
	{
		icon: <OverviewSVG />,
		title: 'Home',
		pageUrl: pageurl.OVERVIEW,
	},
	{
		icon: <ResultSVG />,
		title: 'Result Analytics',
		pageUrl: pageurl.RESULTANALYTICS,
	},
	{
		icon: <SettingsSVG />,
		title: 'Settings',
		pageUrl: pageurl.SETTINGS,
	},
	// {
	//   icon: <UploadIconSVG />,
	//   title: 'Upload Result',
	//   pageUrl: pageurl.UPLOADRESULT,
	//   roleAction: ACTIONS.ELECTIONTYPEVIEW
	// },
	// {
	//   icon: <ElectionSVG />,
	//   title: 'Review Result',
	//   pageUrl: pageurl.REVIEWRESULT,
	//   roleAction: ACTIONS.ELECTIONCYCLEVIEW
	// },
	// {
	//   icon: <AdminManagementSVG />,
	//   title: 'Profile',
	//   pageUrl: pageurl.PROFILE,
	//   roleAction: ACTIONS.MANAGEMENTVIEW
	// }
];

export const MenuItem: FC<IMenuItem> = ({ icon, title, pageUrl, action, sub }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isSub, setIsSub] = useState<boolean>(false);

	const onClick = () => {
		if (sub?.length) {
			setIsSub(!isSub);
		} else {
			if (typeof action === 'function') {
				action();
			} else {
				navigate(pageUrl);
			}
		}
	};

	const onSubClick = (url: string) => {
		navigate(`${pageUrl}/${url}`);
	};

	const isMenu = _isUrl(pageUrl, location) || sub?.some((item) => _isUrl(item.url, location));

	const activeClass = isMenu ? 'active' : '';

	return (
		<li
			className={`${activeClass} f-column-20`}
			data-tooltip={title}
		>
			<div
				className='menu-header f-row-20 align-items-center'
				onClick={onClick}
				style={{ height: '38.84px' }}
			>
				<div className='svg-container'>{icon}</div>
				<p
					className='m-0 font-11'
					style={{ fontSize: '13px' }}
				>
					{title}
				</p>
				<div className='hw-mx ml-auto f-row align-items-center'>
					{sub?.length ? isSub ? <AngleDownSVG /> : <AngleRightSVG /> : null}
				</div>
			</div>
			{/* sub menu */}
			<Hvc
				removeDOM
				view={!!sub && isSub}
				className='pl-5 f-column-10'
			>
				{sub?.map((i, index) => (
					<div
						key={index}
						onClick={() => onSubClick(i.url)}
					>
						<p className={`m-0 color-label sub-menu font-13 ${_isUrl(i.url, location) ? 'active' : ''}`}>{i.title}</p>
					</div>
				))}
			</Hvc>
		</li>
	);
};

interface ISideMenu {
	menu: IMenuItem[];
	actions: IActions;
}

const SideMenu: FC<ISideMenu> = ({ menu, actions }) => {
	const navigate = useNavigate();

	const filteredMenu = useMemo(() => menu.filter((i) => !i.hide), [menu]);

	return (
		<div className='side-menu-container'>
			<nav>
				<div className='f-row-15 nav-brand align-items-center'>
					<img
						src={logo}
						alt=''
						style={{ width: '150px' }}
						onClick={() => navigate(pageurl.OVERVIEW)}
					/>
				</div>
				<ul
					className='f-column-7 m-0 p-0'
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
					<div className='logout-section'>
						<MenuItem
							icon={<SwitchOffSVG />}
							title='Logout'
							pageUrl='sdwdfw'
							action={() => {
								actions.logout_Auth({});
							}}
						/>
					</div>
				</ul>
			</nav>
		</div>
	);
};

export default SideMenu;
