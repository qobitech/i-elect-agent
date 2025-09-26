import './index.scss';

import React, { useState } from 'react';

import type { ResultType } from '../../../constants/global';
import type { IGlobalContext } from '../../../context/global';
import { type btnType, TypeButton } from '../button';
import { BackArrowSVG, PulseSVG } from '../svgs';
import TextPrompt from '../text-prompt';

export type actionType = 'create' | 'view' | 'update' | 'delete' | null;
export type actionComponent =
	| 'zone'
	| 'state'
	| 'lga'
	| 'ward'
	| 'polling-unit'
	| 'election'
	| 'election-type'
	| 'management'
	| 'management-action'
	| 'management-roles'
	| 'political-party'
	| 'presiding-officer'
	| 'election-result'
	| 'election-result-irev'
	| 'user-role'
	| 'election-cycle'
	| 'constituency'
	| 'assign-action-roles'
	| 'assign-actions-role'
	| 'assign-election-officer'
	| 'assign-election-officers'
	| 'create-election-officers'
	| 'quick-actions'
	| 'view-notification'
	| 'side-menu-mobile'
	| 'upload-result'
	| 'report-issues'
	| 'preview-media-file'
	| 'report-feedbacks'
	| 'report-feedback-item'
	| null;
export type actionId = string | null;

interface IRSAction {
	type: actionType;
	component: actionComponent;
	id?: actionId;
}

export interface IGetCTA {
	action: actionType;
	component: actionComponent;
	title?: string;
	id?: string;
}

export interface IRsPropsCTA {
	title: string;
	buttonType: btnType;
	action: () => void;
}

export interface ICallSection<T> {
	action: actionType;
	component: actionComponent;
	title?: string | JSX.Element;
	id?: string;
	data?: T;
	slug?: string;
	cta?: IRsPropsCTA[];
	max?: boolean;
	resultType?: ResultType;
}

export interface IRightSection<K> {
	closeSection: () => void;
	openSection: boolean;
	setAction: React.Dispatch<React.SetStateAction<IRSAction>>;
	action: IRSAction;
	setTitle: React.Dispatch<React.SetStateAction<string | JSX.Element>>;
	title: string | JSX.Element;

	callSection(data: ICallSection<K>): void;
	isView: (type: actionType, component: actionComponent) => boolean;
	data: { onRefresh?: () => void; [key: string]: any } | null;

	updateData(data: K | null): void;
	setDataRequestCounter: React.Dispatch<React.SetStateAction<number>>;
	dataRequestCounter: number;
	addRightSectionHistory: () => void;
	removeRightSectionHistory: () => void;
	isSectionHistory: boolean;
	clearRightSectionHistory: () => void;
	removeItemRightSectionHistory: (component: actionComponent) => void;
	slug: string;
	cta: IRsPropsCTA[];
	setMax: React.Dispatch<React.SetStateAction<boolean>>;
	max: boolean;
	resultType: ResultType | null;
}

export interface IRightSectionHistory {
	action: actionType;
	component: actionComponent;
	title: string;
	id?: string;
	data?: any;
}

export const useRightSection = <K extends {}>(): IRightSection<K> => {
	const [sectionHistories, setSectionHistories] = useState<IRightSectionHistory[] | null>(null);
	const [title, setTitle] = useState<string | JSX.Element>('');
	const [resultType, setResultType] = useState<ResultType | null>(null);
	const [dataRequestCounter, setDataRequestCounter] = useState<number>(0);
	const [openSection, setOpenSection] = useState<boolean>(() => false);
	const [slug, setSlug] = useState<string>(() => '');
	const [cta, setCTA] = useState<IRsPropsCTA[]>([]);
	const [max, setMax] = useState<boolean>(false);
	const [action, setAction] = useState<IRSAction>({
		type: null,
		component: null,
		id: null,
	});
	const [data, setData] = useState<{
		onRefresh?: () => void;
		[key: string]: any;
	} | null>(null);

	function updateData(data: K | null) {
		setData(data);
	}

	const isView = (type: actionType, component: actionComponent) => action.type === type && action.component === component;

	function callSection<T>(arg: ICallSection<T>) {
		const { action, component, title, id, data, slug, cta, max, resultType } = arg;
		setAction((prev) => ({
			type: action || prev.type,
			component: component || prev.component,
			id: id || prev.id,
		}));
		setTitle((prev) => title || prev);
		setOpenSection(true);
		setData(data as unknown as K);
		setSlug((prev) => slug || prev);
		setCTA((prev) => cta || prev);
		setMax((prev) => max || prev);
		setResultType((prev) => resultType || prev);
	}

	const addRightSectionHistory = () => {
		if (typeof title !== 'string') return;
		if (!action.component) return;
		setSectionHistories((prev) => {
			const sh = prev || [];
			sh.push({
				action: action.type,
				component: action.component,
				title,
				id: slug || '',
				data,
			});
			return sh;
		});
	};

	const removeRightSectionHistory = () => {
		setSectionHistories((prev) => {
			if (!prev) return null;
			const sh = prev.pop();
			setData(sh?.data as unknown as K);
			callSection({
				action: sh?.action || 'view',
				title: sh?.title || '',
				component: sh?.component || null,
				slug: sh?.id || slug || '',
				data: sh?.data,
			});
			return prev;
		});
	};

	const removeItemRightSectionHistory = (component: actionComponent) => {
		setSectionHistories((prev) => {
			if (!prev) return null;
			return prev.filter((i) => i.component !== component);
		});
	};

	const clearRightSectionHistory = () => {
		setSectionHistories(null);
	};

	const closeSection = () => {
		setAction({ component: null, type: null, id: null });
		setOpenSection(false);
		setSectionHistories(null);
		setSlug('');
		setCTA([]);
		setMax(false);
		setResultType(null);
	};

	return {
		closeSection,
		openSection,
		setAction,
		action,
		setTitle,
		title,
		callSection,
		isView,
		data,
		updateData,
		setDataRequestCounter,
		dataRequestCounter,
		addRightSectionHistory,
		removeRightSectionHistory,
		isSectionHistory: Array.isArray(sectionHistories) && !!sectionHistories[0],
		clearRightSectionHistory,
		removeItemRightSectionHistory,
		slug,
		cta,
		max,
		resultType,
		setMax,
	};
};

interface IRSection<T> {
	children?: any;
	rsProps: IRightSection<T>;
	globalContext?: IGlobalContext;
}

export interface IGlobalRightSection {
	rsProps?: IRightSection<{}>;
	globalContext?: IGlobalContext;
}

const RightSection = <T extends {}>({ children, rsProps, globalContext }: IRSection<T>) => {
	const matchChild: any = React.Children.map(children, (child) => {
		if (child) return { ...child, props: { ...child.props, rsProps, globalContext } };
		return child;
	});

	const isTitleString = typeof rsProps.title === 'string';

	return (
		<>
			{rsProps.openSection ? (
				<div
					className='back-drop'
					onClick={rsProps.closeSection}
				/>
			) : null}
			<div className={`right_container ${rsProps.openSection ? 'menuopen' : 'menuclose'} ${rsProps.max ? 'max' : ''}`}>
				<div className='rs-header border-label-bottom'>
					{isTitleString ? <h3>{rsProps.title}</h3> : rsProps.title}
					<div className='f-row-20 align-items-center ctas'>
						{rsProps?.cta?.map((i, index) => (
							<TypeButton
								title={i.title}
								buttonType={i.buttonType}
								buttonSize='small'
								onClick={i.action}
								key={index}
							/>
						))}
						<TypeButton
							title=''
							close
							buttonType='danger'
							buttonSize='small'
							onClick={() => {
								// globalContext?.saveAsDraft()
								rsProps.closeSection();
							}}
						/>
					</div>
				</div>
				{rsProps.isSectionHistory ? (
					<div className='mt-auto py-3'>
						<div
							className='f-row-12 align-items-center hw-mx cursor-pointer'
							onClick={() => {
								rsProps.removeRightSectionHistory();
							}}
						>
							<BackArrowSVG />
							<p className='m-0 text-little'>Back</p>
						</div>
					</div>
				) : null}
				{rsProps.title ? (
					<div className='rs-body'>{matchChild}</div>
				) : (
					<div>
						{rsProps.data !== null && !rsProps.data ? (
							<div className='pt-3'>
								<TextPrompt
									prompt='Something went wrong'
									status={false}
								/>
							</div>
						) : (
							<PulseSVG />
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default RightSection;
