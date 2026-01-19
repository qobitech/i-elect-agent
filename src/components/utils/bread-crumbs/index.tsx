import './style.scss';

import React from 'react';
import { Link, useLocation } from 'react-router';

import { AngleRightSVG } from '../svgs';
import { GenerateBreadcrumb } from './helpers';
const BreadCrumbs = ({ noHome }: { noHome?: boolean }) => {
	const location = useLocation();
	const pathname = location.pathname;
	const dynamicBreadcrumbList = GenerateBreadcrumb(pathname);
	const hasHomeBreadcrumb = dynamicBreadcrumbList.some((path) => path.label === 'Home');
	const breadcrumbOptions =
		hasHomeBreadcrumb || noHome ? [...dynamicBreadcrumbList] : [{ label: 'Home', url: '/' }, ...dynamicBreadcrumbList];
	const activePath = breadcrumbOptions.length ? breadcrumbOptions[breadcrumbOptions.length - 1] : undefined;
	const activeLink = breadcrumbOptions.length ? breadcrumbOptions[breadcrumbOptions.length - 2] : undefined;
	return (
		<>
			<div className='breadcrumb'>
				{breadcrumbOptions.map((path, index) => (
					<React.Fragment key={path.label}>
						{index !== 0 && (
							<span>
								<AngleRightSVG />
							</span>
						)}
						<Link
							to={path.url}
							style={{ color: pathname === path.url ? '#05A2BF' : '#748181' }}
						>
							{path.label}
						</Link>
					</React.Fragment>
				))}
			</div>
			<div className='breadcrumbmobile'>
				<div className='breadcrumbmobile_container'>
					<Link to={activeLink?.url ?? ''}>
						<AngleRightSVG className='breadcrumbmobile_link' />
					</Link>
					<p className='breadcrumbmobile_title'>{activePath?.label}</p>
				</div>
			</div>
		</>
	);
};
export default BreadCrumbs;
