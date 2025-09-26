import './table.scss';

import type React from 'react';
import { type FC, useMemo, useState } from 'react';

import { ActionComponent, type IOptionAction } from '../action-component';
import { type btnSize, type btnType, TypeButton } from '../button';
import { TypeCheckbox } from '../checkbox';
import { Hvc } from '../hooks';
import { TypeSelect } from '../select';
import { MinusSVG, PlusSVG } from '../svgs';

const PAGE_SIZE = 10;

interface ITableAction {
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
	value?: string | number;
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
	load?: boolean;
}

export interface IMiniTableRecord {
	id: string;
	row: ICell[];
	isSelected?: boolean;
	rowActions?: ICellAction[];
}

interface IResultTable {
	header: string[];
	record: IMiniTableRecord[];
	currentPage?: number;
	hideNumbering?: boolean;
	tableAction?: ITableAction;
	handleTableAction?: () => void;
	lastCardElementRef?: (node: any) => void;
	ctaComponent?: JSX.Element | null;
	hideAction?: boolean;
}

const MiniTable: React.FC<IResultTable> = ({
	header,
	record,
	currentPage,
	hideNumbering,
	tableAction,
	handleTableAction,
	lastCardElementRef,
	ctaComponent,
	hideAction,
}) => {
	const isRecord = record?.length > 0;
	const isCheckedRow = (id: string) => !!tableAction?.selectedItems?.includes?.(id.toString());

	const hideCheck = !Object.keys(tableAction?.actionEnums || {})?.[0] || !record?.[0];

	const selectedAll = useMemo(
		() => tableAction?.selectedItems !== null && tableAction?.selectedItems?.length === record?.length,
		[tableAction?.selectedItems]
	);

	const isCTA = !!ctaComponent;

	const handleSelectAll = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = target;
		if (checked) {
			const ids = record.map((i) => i.id.toString());
			tableAction?.setSelectedItems?.(ids);
		} else {
			tableAction?.setSelectedItems?.(null);
		}
	};

	const handleSelect = ({ target }: React.ChangeEvent<HTMLInputElement>, i: IMiniTableRecord) => {
		const { checked } = target;
		if (checked) {
			const ids = tableAction?.selectedItems || [];
			ids.push(i.id.toString());
			tableAction?.setSelectedItems?.([...ids]);
		} else {
			const ids = tableAction?.selectedItems || [];
			const index = ids.indexOf(i.id.toString());
			if (index >= 0) {
				ids.splice(index, 1);
				tableAction?.setSelectedItems?.([...ids]);
			}
		}
	};

	return (
		<div className='table-container-mini'>
			<Hvc
				removeDOM
				view={!hideCheck && !hideAction}
			>
				<TableActionComponent
					tableAction={tableAction}
					handleTableAction={handleTableAction}
				/>
			</Hvc>
			{!isRecord ? null : (
				<table className='reportTable'>
					<thead className='thead_blue position-relative'>
						<tr
							style={{
								position: 'sticky',
								top: 0,
								background: '#fff',
							}}
						>
							{!hideNumbering && <th></th>}
							{header.map((i, index) => {
								if (index === 0) {
									return (
										<th
											key={index}
											className='f-row'
										>
											<div className='f-row'>
												<Hvc
													removeDOM
													view={!hideCheck}
													style={{ marginRight: 25 }}
												>
													<TypeCheckbox
														onChange={handleSelectAll}
														checked={selectedAll}
													/>
												</Hvc>

												{i}
											</div>
										</th>
									);
								} else {
									return <th key={index}>{i}</th>;
								}
							})}
						</tr>
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
										<td style={{ padding: '10px 0px 10px 10px' }}>
											<p style={{ margin: 0 }}>{jindex + 1 + ((currentPage || 1) - 1) * PAGE_SIZE}</p>
										</td>
									)}
									{i?.row?.map((j, index) => {
										if (index === 0) {
											return (
												<td
													key={index}
													// width={`${100 / header.length}%`}
												>
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
												</td>
											);
										} else {
											return (
												<td
													key={index}
													// width={`${100 / header.length}%`}
												>
													<CellValueComponent {...j} />
												</td>
											);
										}
									})}
									{i?.rowActions?.length ? (
										<td
										// width={`${100 / header.length}%`}
										>
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

export default MiniTable;

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
	/>
);

interface ITDC {
	action: (() => void) | undefined;
	value: string | number | undefined;
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
}) => {
	const [summarizeText, setSummarizeText] = useState<boolean>(() => !!textLength);
	const isSumm = value ? value?.toString().length > textLength : false;
	const cellValue = value
		? textLength
			? value?.toString().substring(0, textLength) + (isSumm ? '...' : '')
			: value?.toString()
		: '';

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
				<p className='m-0 d-flex align-items-center text-little'>
					<span
						className={`d-block ${classProps}`}
						onClick={action}
						style={{ width: cellWidth || '' }}
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
	load,
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
						style={{ fontSize: '10px' }}
						onClick={action}
						className='mr-2'
						icon={icon}
						load={load}
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

interface ITableActionComponent {
	tableAction: ITableAction | undefined;
	handleTableAction: (() => void) | undefined;
	admin?: boolean;
}

const TableActionComponent: FC<ITableActionComponent> = ({ tableAction, handleTableAction, admin }) => {
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
			<div className='f-row-20 align-items-center'>
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
