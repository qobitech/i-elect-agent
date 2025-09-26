import './style.scss';

import type React from 'react';
import { type FC, useState } from 'react';

export interface ITabComponentProp {
	isSelected: boolean;
	setTab: React.Dispatch<React.SetStateAction<string>>;
	title: string;
	onSetTab?: () => void;
}

export interface IUseTab {
	tab: string;
	setTab: React.Dispatch<React.SetStateAction<string>>;
	isTab: (value: string) => boolean;
	tabProps: ITabComponentProp[];
	getDataType: (typeQuery: string | undefined) => string;
}

export const useTabSection = (
	defaultTab: string,
	tabs: Record<string, string>,
	typeQuery?: string,
	onSetTab?: (tab: string) => void
): IUseTab => {
	const tabsArray = Object.values(tabs);

	const filterDataType = (tabQuery: string | undefined) => (i: string) => i.toLowerCase() === tabQuery?.toLowerCase();

	const getDataType = (typeQuery: string | undefined) => {
		if (!typeQuery) return defaultTab;
		return tabsArray.filter(filterDataType(typeQuery))?.[0] || defaultTab;
	};

	const [tab, setTab] = useState<string>(() => getDataType(typeQuery));

	type typeTabs = (typeof tabs)[keyof typeof tabs];

	const isTab = (value: typeTabs) => tab?.toLowerCase() === value?.toLowerCase();

	const tabProps: ITabComponentProp[] = tabsArray.map((i) => ({
		isSelected: isTab(i),
		title: i,
		setTab,
		onSetTab,
	})) as ITabComponentProp[];

	return {
		tab,
		setTab,
		isTab,
		tabProps,
		getDataType,
	};
};

export interface ITabSection {
	tabProps: ITabComponentProp[];
	position: 'start' | 'end' | 'center';
	positionMobile?: 'start' | 'end' | 'center';
	tabGap?: string;
	type?: 'default' | 'block';
}

export const TabSection: FC<ITabSection> = ({ tabProps, position, positionMobile, tabGap, type }) => (
	<div
		className={`d-flex tab-header-section ${type === 'block' ? 'flex-wrap' : 'bottom'} justify-content-${position}`}
		style={{ gap: `${tabGap || 50}px`, overflow: 'auto' }}
	>
		{type !== 'block'
			? tabProps.map((i, index) => (
					<TabComponent
						key={index}
						isSelected={i.isSelected}
						setTab={i.setTab}
						title={i.title}
						onSetTab={i.onSetTab}
					/>
				))
			: null}
		{type === 'block'
			? tabProps.map((i, index) => (
					<TabBlockComponent
						key={index}
						isSelected={i.isSelected}
						setTab={i.setTab}
						title={i.title}
						onSetTab={i.onSetTab}
					/>
				))
			: null}
	</div>
);

export const TabComponent = ({
	isSelected,
	title,
	setTab,
	number,
	onSetTab,
}: {
	isSelected: boolean;
	title: string;
	setTab: React.Dispatch<React.SetStateAction<string>>;
	number?: string;
	onSetTab?: (tab?: string) => void;
}) => (
	<div
		style={{
			width: 'max-content',
			height: 'max-content',
			cursor: 'pointer',
			flexShrink: 0,
		}}
		onClick={() => {
			setTab(title);
			onSetTab?.(title);
		}}
	>
		<div
			className={`tab-title mb-2 ${isSelected ? '' : 'color-light'}`}
			style={{
				whiteSpace: 'nowrap',
			}}
		>
			{title}
			{number || ''}
		</div>
		<div
			style={{
				background: isSelected ? '#000' : 'none',
				height: '3px',
			}}
			className='w-100 rounded'
		/>
	</div>
);

export const TabBlockComponent = ({
	isSelected,
	title,
	setTab,
	number,
	onSetTab,
}: {
	isSelected: boolean;
	title: string;
	setTab: React.Dispatch<React.SetStateAction<string>>;
	number?: string;
	onSetTab?: (tab?: string) => void;
}) => (
	<div
		style={{
			width: 'max-content',
			height: 'max-content',
			cursor: 'pointer',
			flexShrink: 0,
			padding: '0.4725rem 0.8725rem',
			background: isSelected ? 'rgb(220 242 232)' : 'none',
			transition: '.2s ease all',
		}}
		onClick={() => {
			setTab(title);
			onSetTab?.(title);
		}}
		className='rounded'
	>
		<div
			className={`tab-title m-0 ${isSelected ? '' : ''}`}
			style={{
				whiteSpace: 'nowrap',
				fontSize: '0.79625rem',
			}}
		>
			{title}
			{number || ''}
		</div>
	</div>
);
