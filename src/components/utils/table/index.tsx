import './table.scss';

import type React from 'react';
import { type FC, useState } from 'react';

import { ActionComponent, type IOptionAction } from '../action-component';
import { type btnSize, type btnType, TypeButton } from '../button';
import { TypeCheckbox } from '../checkbox';
import { Hvc } from '../hooks';
import { TypeSelect } from '../select';
import { CheckSVG, CopySVG, MinusSVG, PlusSVG } from '../svgs';

const PAGE_SIZE = 10;

export interface ITableActionLegacy {
	action: string;
	setAction: React.Dispatch<React.SetStateAction<string>>;
	selectedItems: string[];
	setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
	actionEnums?: Record<string, string> | null;
	handleSelectAll: ({ target }: React.ChangeEvent<HTMLInputElement>, record: ITableRecord[]) => void;
	handleSelect: ({ target }: React.ChangeEvent<HTMLInputElement>, record: ITableRecord) => void;
	searchAction?: (req: any) => void;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
	searchValue: string;
	searchPlaceHolder?: string;
	paginationParams?: IPaginationParams;
}

interface IPaginationParams {
	current: number;
	total: number;
	onPageChange?: (selectedItem: { selected: number }) => void;
	isPagination: boolean;
	load: boolean;
}

interface ITableArgs {
	actionEnums?: Record<string, string> | null;
	searchAction?: (req: any) => void;
	paginationParams?: IPaginationParams;
	searchPlaceHolder?: string;
}

export const useTableActionLegacy = (tableArg?: ITableArgs): ITableActionLegacy => {
	const [action, setAction] = useState<string>('');
	const [searchValue, setSearchValue] = useState<string>('');
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>, record: ITableRecord[]) => {
		const { checked } = target;
		setSelectedItems(() => {
			if (checked) {
				return [...record.map((i) => i.id)];
			}
			setAction('');
			return [];
		});
	};

	const handleSelect = ({ target }: React.ChangeEvent<HTMLInputElement>, record: ITableRecord) => {
		const { checked } = target;
		setSelectedItems((prev) => {
			if (checked) {
				return [record.id, ...prev];
			} else {
				return prev.filter((v) => v !== record.id);
			}
		});
	};

	return {
		action,
		setAction,
		selectedItems,
		setSelectedItems,
		actionEnums: tableArg?.actionEnums,
		handleSelect,
		handleSelectAll,
		searchValue,
		setSearchValue,
		searchAction: tableArg?.searchAction,
		paginationParams: tableArg?.paginationParams,
		searchPlaceHolder: tableArg?.searchPlaceHolder,
	};
};

export interface ITableAction {
	action: string;
	setAction: React.Dispatch<React.SetStateAction<string>>;
	selectedItems: string[] | null;
	setSelectedItems: React.Dispatch<React.SetStateAction<string[] | null>>;
	selectedItem: string | null;
	setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
	actionEnums?: Record<string, string> | null;
}

export const useTableAction = (actionEnums?: Record<string, string> | null): ITableAction => {
	const [action, setAction] = useState<string>('');
	const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
	const [selectedItem, setSelectedItem] = useState<string | null>(null);
	return {
		action,
		setAction,
		selectedItems,
		setSelectedItems,
		selectedItem,
		setSelectedItem,
		actionEnums,
	};
};

export interface ICell {
	value?: string | number | JSX.Element;
	imageUrl?: string;
	isLink?: boolean;
	position?: number;
	status?: boolean;
	rating?: number;
	lastPosition?: number;
	icon?: string | JSX.Element;
	url?: string;
	action?: () => void;
	textLength?: number;
	cellWidth?: string;
	classProps?: string;
	dangerouselySetHtml?: string;
	mutate?: (id: string, value: string | number) => void;
	mutateValue?: string | number;
	mutateType?: 'text' | 'number';
	mutateId?: string;
	mutateMin?: number;
	mutateMax?: number;
	mutatePostTxt?: string;
	copy?: boolean;
	copySuccess?: boolean;
	onCopy?: () => void;
}

export interface ICellAction extends ICell {
	color?: string;
	view?: 'text' | 'icon' | 'both';
	background?: string;
	buttonType?: btnType;
	hide?: boolean;
	actionType?: 'btn' | 'btn-options';
	options?: IOptionAction[];
	buttonSize?: btnSize;
	disabled?: boolean;
}

export interface ITableRecord {
	id: string;
	row: ICell[];
	isSelected?: boolean;
	rowActions?: ICellAction[];
}

interface IResultTable {
	header: string[];
	record: ITableRecord[];
	currentPage?: number;
	hideNumbering?: boolean;
	tableAction?: ITableAction;
	handleTableAction?: () => void;
	lastCardElementRef?: (node: any) => void;
	ctaComponent?: JSX.Element | null;
	stickyColumns?: 1 | 2 | 3;
}

const Table: React.FC<IResultTable> = ({
	header,
	record,
	currentPage,
	hideNumbering,
	tableAction,
	handleTableAction,
	lastCardElementRef,
	ctaComponent,
	stickyColumns,
}) => {
	const isRecord = record?.length > 0;
	const isCheckedRow = (id: string) => !!tableAction?.selectedItems?.includes?.(id);

	const hideCheck = !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0];

	const selectedAll = tableAction?.selectedItems !== null && tableAction?.selectedItems?.length === record?.length;

	const isCTA = !!ctaComponent;

	const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = target;
		if (checked) {
			const ids = record.map((i) => i.id);
			tableAction?.setSelectedItems?.(ids);
		} else {
			tableAction?.setSelectedItems?.(null);
		}
	};

	const handleSelect = ({ target }: React.ChangeEvent<HTMLInputElement>, i: ITableRecord) => {
		const { checked } = target;
		if (checked) {
			const ids = tableAction?.selectedItems || [];
			ids.push(i.id);
			tableAction?.setSelectedItems?.([...ids]);
		} else {
			const ids = tableAction?.selectedItems || [];
			const index = ids.indexOf(i.id);
			if (index >= 0) {
				ids.splice(index, 1);
				tableAction?.setSelectedItems?.([...ids]);
			}
		}
	};

	const isSticky = stickyColumns !== undefined;

	const stickyClass = (index: number) => {
		if (!stickyColumns || index > stickyColumns) return '';
		return index < (hideNumbering ? stickyColumns - 1 : stickyColumns)
			? `sticky-col col-${index + (hideNumbering ? 1 : 2)} ${!hideNumbering && index < 1 ? 'numbering' : ''}`
			: '';
	};

	return (
		<div
			className='table-container rounded position-relative'
			style={{ maxWidth: '1200px' }}
		>
			{!hideCheck ? (
				<TableActionComponent
					tableAction={tableAction}
					handleTableAction={handleTableAction}
				/>
			) : null}
			{!isRecord ? null : (
				<table className='reportTable'>
					<thead className='thead_blue'>
						{!hideNumbering && <th className={isSticky ? 'sticky-col col-1' : ''}></th>}
						{header.map((i, index) => (
							<th
								key={index}
								className={stickyClass(index)}
							>
								{index === 0 && !hideCheck && (
									<div style={{ marginRight: 25 }}>
										<TypeCheckbox
											onChange={handleSelectAll}
											checked={selectedAll}
										/>
									</div>
								)}
								{i}
							</th>
						))}
					</thead>
					<tbody>
						{isRecord &&
							record.map((i, jindex) => (
								<tr
									key={jindex}
									className={i.isSelected ? 'selected-table-row' : ''}
									ref={jindex + 1 === record.length ? lastCardElementRef : null}
								>
									{!hideNumbering && (
										<td
											style={{ padding: '10px 0px 10px 10px' }}
											className={isSticky ? 'sticky-col col-1' : ''}
										>
											<p style={{ margin: 0, fontSize: '11px' }}>{jindex + 1 + ((currentPage || 1) - 1) * PAGE_SIZE}</p>
										</td>
									)}
									{i?.row?.map((j, index) => (
										<td
											key={index}
											width={`${100 / header.length}%`}
											className={stickyClass(index)}
										>
											{index === 0 ? (
												<div
													style={{
														display: 'flex',
														alignItems: 'center',
														minHeight: '35px',
													}}
												>
													{!hideCheck && (
														<div style={{ marginRight: 25 }}>
															<TypeCheckbox
																onChange={(e) => handleSelect(e, i)}
																checked={selectedAll || isCheckedRow(i.id)}
																id={i.id}
															/>
														</div>
													)}
													<CellValueComponent {...j} />
												</div>
											) : (
												<CellValueComponent {...j} />
											)}
										</td>
									))}
									{i?.rowActions?.length ? (
										<td>
											<div className='table-cell-action'>
												{i?.rowActions?.map((j, index) => (
													<CellValueActionComponent
														key={index}
														{...j}
														nomargin={index === (i?.rowActions?.length || 0) - 1 ? 'true' : 'false'}
													/>
												))}
											</div>
										</td>
									) : null}
								</tr>
							))}
					</tbody>
				</table>
			)}
			{!isRecord ? (
				<>{isCTA ? ctaComponent : <p className='margin-auto text-center py-4 font-small no-data'>No Data</p>}</>
			) : null}
		</div>
	);
};

const CellValueComponent: React.FC<ICell> = ({
	value,
	action,
	textLength,
	cellWidth,
	classProps,
	dangerouselySetHtml,
	mutate,
	mutateValue,
	mutateType,
	mutateId,
	mutateMax,
	mutateMin,
	mutatePostTxt,
	imageUrl,
	copy,
	onCopy,
	copySuccess,
}) => (
	<TDContent
		action={action}
		value={value}
		textLength={textLength!}
		cellWidth={cellWidth!}
		classProps={classProps!}
		dangerouselySetHtml={dangerouselySetHtml!}
		mutate={mutate}
		mutateValue={mutateValue}
		mutateType={mutateType}
		mutateId={mutateId}
		mutateMax={mutateMax}
		mutateMin={mutateMin}
		mutatePostTxt={mutatePostTxt}
		imageUrl={imageUrl}
		copy={copy}
		onCopy={onCopy}
		copySuccess={copySuccess}
	/>
);

interface ITDC {
	action: (() => void) | undefined;
	value?: string | number | JSX.Element;
	textLength: number;
	cellWidth: string;
	classProps: string;
	dangerouselySetHtml: string;
	mutate?: (id: string, value: string | number) => void;
	mutateValue?: string | number;
	mutateType?: 'number' | 'text';
	mutateId?: string;
	mutateMax?: number;
	mutateMin?: number;
	mutatePostTxt?: string;
	imageUrl?: string;
	copy?: boolean;
	copySuccess?: boolean;
	onCopy?: () => void;
}

const TDContent: React.FC<ITDC> = ({
	action,
	value,
	textLength,
	cellWidth,
	classProps,
	dangerouselySetHtml,
	mutate,
	mutateType,
	mutateValue,
	mutateId,
	mutateMax,
	mutateMin,
	mutatePostTxt,
	imageUrl,
	copy,
	onCopy,
	copySuccess,
}) => {
	const [summarizeText, setSummarizeText] = useState<boolean>(() => !!textLength);
	const isSumm = value ? value?.toString().length > textLength : false;
	const isElement = typeof value !== 'string' && typeof value !== 'number';
	const cellValue = !isElement
		? value
			? textLength
				? value?.toString().substring(0, textLength) + (isSumm ? '...' : '')
				: value?.toString()
			: ''
		: value;

	const isMutate = typeof mutate === 'function';

	return (
		<>
			{/* mutate section */}
			<Hvc
				removeDOM
				view={isMutate}
			>
				<MutateValue
					mutate={mutate}
					mutateType={mutateType}
					mutateValue={mutateValue}
					mutateId={mutateId}
					mutateMax={mutateMax}
					mutateMin={mutateMin}
					mutatePostTxt={mutatePostTxt}
				/>
			</Hvc>
			{/* dangerously set data */}
			<Hvc
				removeDOM
				view={!!dangerouselySetHtml}
			>
				<div dangerouslySetInnerHTML={{ __html: dangerouselySetHtml }} />
			</Hvc>
			{/* image and text */}
			<Hvc
				removeDOM
				view={!isMutate}
				className='f-row-20 align-items-center'
				onClick={onCopy}
			>
				{/* image url */}
				<Hvc
					removeDOM
					view={typeof imageUrl === 'string'}
					className='border-label'
					style={{
						width: '30px',
						height: '30px',
						borderRadius: '50%',
						overflow: 'hidden',
					}}
				>
					<img
						src={imageUrl}
						alt=''
						style={{ objectFit: 'cover' }}
					/>
				</Hvc>
				{/* text */}
				{isElement ? (
					cellValue
				) : (
					<p className='m-0 d-flex align-items-center text-small'>
						<span
							className={`d-block ${classProps}`}
							onClick={action}
							style={{ width: cellWidth || '', fontSize: '12px' }}
							role='button'
						>
							{summarizeText ? cellValue : value}
						</span>
						{textLength && isSumm ? (
							<span onClick={() => setSummarizeText(!summarizeText)}>
								<i className={`ml-2 table-cell-border p-1 rounded fas fa-angle-${summarizeText ? 'up' : 'down'}`} />
							</span>
						) : null}
					</p>
				)}
				{copy ? <div className='hw-mx cursor-pointer'>{copySuccess ? <CheckSVG /> : <CopySVG />}</div> : null}
			</Hvc>
		</>
	);
};

interface IMutateValue {
	mutateType?: 'number' | 'text';
	mutateValue?: string | number;
	mutate?: (id: string, value: string | number) => void;
	mutateId?: string;
	mutateMax?: number;
	mutateMin?: number;
	mutatePostTxt?: string;
}

const MutateValue = ({ mutateType, mutateValue, mutate, mutateId, mutateMax, mutateMin, mutatePostTxt }: IMutateValue) => {
	const isNumber = mutateType === 'number';

	const onMutate = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = target;
		if (isNumber) {
			if (parseInt(value) >= (mutateMin || 1) && parseInt(value) <= (mutateMax || 1)) {
				mutate?.(id, value);
			}
		} else {
			mutate?.(id, value);
		}
	};

	const onAdd = () => {
		mutate?.(mutateId || '', Math.min(mutateMax || 1, parseInt((mutateValue || '0') as string) + 1));
	};
	const onRemove = () => {
		mutate?.(mutateId || '', Math.max(mutateMin || 1, parseInt((mutateValue || '0') as string) - 1));
	};

	const color = '#9f9f9f';

	return (
		<div className='f-row-5 align-items-center'>
			{isNumber ? (
				<div onClick={onRemove}>
					<MinusSVG color={color} />
				</div>
			) : null}
			<input
				type={mutateType}
				className={`mutate-input ${mutateType || 'text'}`}
				value={mutateValue}
				onChange={onMutate}
				id={mutateId}
				min={mutateMin}
				max={mutateMax}
			/>
			{isNumber ? (
				<div onClick={onAdd}>
					<PlusSVG color={color} />
				</div>
			) : null}
			{mutatePostTxt ? <p className='text-little m-0 pl-4'>&nbsp;&nbsp;&nbsp;{mutatePostTxt}</p> : null}
		</div>
	);
};

interface ICVAC extends ICellAction {
	nomargin?: 'true' | 'false';
}

const CellValueActionComponent: React.FC<ICVAC> = ({
	isLink,
	value,
	url,
	action,
	color,
	buttonType,
	view,
	hide,
	icon,
	actionType,
	options,
	disabled,
}) => (
	<>
		{!actionType || actionType === 'btn' ? (
			<>
				{!hide ? (
					<TypeButton
						buttonSize='small'
						color={color}
						title={view !== 'icon' ? value + '' : ''}
						buttonType={buttonType}
						style={{ height: '35px', fontSize: '11px' }}
						onClick={action}
						className='mr-2'
						icon={icon}
					/>
				) : null}
			</>
		) : null}
		{actionType === 'btn-options' ? (
			<ActionComponent
				actions={options}
				buttonSize='small'
				buttonType={buttonType}
				title={value as string}
			/>
		) : null}
	</>
);

export default Table;

interface ITableActionComponent {
	tableAction: ITableAction | undefined;
	handleTableAction: (() => void) | undefined;
	admin?: boolean;
}

export const TableActionComponent: FC<ITableActionComponent> = ({ tableAction, handleTableAction, admin }) => {
	const isTableAction = !!tableAction?.selectedItems?.[0];
	return (
		<div
			style={{
				borderBottom: !admin ? '1px solid #f1f1f1' : '',
				position: 'sticky',
				left: 0,
			}}
			className={`${!admin ? 'px-3' : ''} pb-3 d-flex align-items-center`}
		>
			<div
				className='d-flex align-items-center'
				style={{ gap: '20px' }}
			>
				<TypeSelect
					initoption={{ label: 'Select action', value: '' }}
					optionsdata={Object.values(tableAction?.actionEnums || {}).map((i, index) => ({
						id: index,
						label: i + '',
						value: i + '',
					}))}
					disabled={!isTableAction}
					value={tableAction?.action || ''}
					style={{
						width: '150px',
						height: '40px',
						fontSize: '13px',
						outline: '0',
					}}
					onChange={({ target }) => {
						const { value } = target;
						tableAction?.setAction?.(value);
					}}
				/>
				<TypeButton
					title='Proceed'
					buttonType={isTableAction ? 'outlined' : 'disabled'}
					onClick={handleTableAction}
					disabled={!isTableAction}
					buttonSize='small'
				/>
			</div>
		</div>
	);
};
