import React from 'react';

import { useGlobalContext } from '../../context/global';
import ReportIssueStage from '../pages/report-issues';
import ReportFeedbackItem from '../pages/report-issues/feedback-item';
import ReportFeedbacks from '../pages/report-issues/feedbacks';
import ReportResultIssueStage from '../pages/report-result-issues';
import UploadResult from '../pages/upload-result';
import PreviewMediaFile from '../pages/upload-result/preview-media-file';
import RightSection, { type IGlobalRightSection } from '../utils/right-section';
import SideMenuMobile from './side-menu-mobile';

const GlobalRightSection = ({ ...props }) => {
	const globalContext = useGlobalContext();

	if (!globalContext) return <></>;

	const rsProps = globalContext.rsProps;

	if (!rsProps) return <></>;

	return (
		<>
			<RightSection
				rsProps={rsProps}
				globalContext={globalContext}
			>
				{rsProps.isView('view', 'report-feedbacks') ? <ReportFeedbacks /> : null}
				{rsProps.isView('view', 'report-feedback-item') ? <ReportFeedbackItem /> : null}
				{rsProps.isView('view', 'side-menu-mobile') ? <SideMenuMobile /> : null}
				{rsProps.isView('view', 'report-issues') ? <ReportIssueStage /> : null}
				{rsProps.isView('view', 'report-result-issues') ? <ReportResultIssueStage /> : null}
				{rsProps.isView('view', 'preview-media-file') ? <PreviewMediaFile /> : null}
				<CompDisplay isView={rsProps.isView('create', 'upload-result')}>
					<UploadResult />
				</CompDisplay>
			</RightSection>
		</>
	);
};

export default GlobalRightSection;

const CompDisplay = ({ children, isView, globalContext }: IGlobalRightSection & { children?: any; isView: boolean }) => {
	const matchChild: any = React.Children.map(children, (child) => {
		if (child) return { ...child, props: { ...child.props, globalContext } };
		return child;
	});

	return <div className={isView ? '' : 'd-none'}>{matchChild}</div>;
};
