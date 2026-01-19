/* eslint-disable react-hooks/rules-of-hooks */
import { TabSection, useTabSection } from '../../utils/tab-section';
import { type IResultSourceWrapperSection, sourceWrapperTemplate } from './ResultAnalytics.Helpers';

const ResultSourceWrapperSection = ({ resultType, children }: IResultSourceWrapperSection) => {
	if (!resultType) return;

	const sourceWrapperProps = sourceWrapperTemplate[resultType];
	const tabs = sourceWrapperProps?.tabs;
	const description = sourceWrapperProps?.description;
	const source = sourceWrapperProps?.source;

	const tabSectionProps = useTabSection(tabs?.SRC1!, tabs!);

	return (
		<div className='f-column-23'>
			<div className='border-label-bottom pb-2'>
				<TabSection
					tabProps={tabSectionProps.tabProps}
					tabGap='10'
					type='block'
					position='start'
				/>
			</div>
			<div>
				<p className='font-13'>{description?.[tabSectionProps.tab]}</p>
			</div>
			{children?.(source?.[tabSectionProps.tab] as 'sourceA' | 'sourceB')}
		</div>
	);
};

export default ResultSourceWrapperSection;
