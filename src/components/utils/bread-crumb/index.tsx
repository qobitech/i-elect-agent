import './style.scss';

import type React from 'react';
import { useNavigate } from 'react-router';

import { pageurl } from '../../../constants/pageurl';
import { HomeSVG, RightArrowSVG } from '../svgs';

export interface ICrumb {
	title: string;
	url: string;
}
export interface IBreadCrumb {
	crumbs: ICrumb[];
}

const BreadCrumb: React.FC<IBreadCrumb> = ({ crumbs }) => {
	const navigate = useNavigate();

	return (
		<div className='bread-crumb-section'>
			<div className='bread-crumb-container gap-18'>
				<div
					className='d-flex align-items-center'
					onClick={() => navigate(pageurl.OVERVIEW)}
				>
					<HomeSVG />
				</div>
				<RightArrowSVG />
				{crumbs.map((i, index) => {
					if (index !== crumbs.length - 1) {
						return (
							<div
								className='bread-crumb-header-text'
								key={index}
							>
								<div
									onClick={() => navigate(i.url)}
									className='bread-crumb-link-container'
								>
									{i.title}
								</div>
								&nbsp;&nbsp;
								<i className='fas fa-angle-right d-flex align-items-center mx-2' />
								&nbsp;
							</div>
						);
					} else {
						return (
							<div
								className='bread-crumb-header-text'
								key={index}
							>
								{i.title || <i className='fa fa-spinner fa-spin' />}
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

export default BreadCrumb;
