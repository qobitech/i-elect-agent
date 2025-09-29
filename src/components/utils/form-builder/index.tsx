import type React from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { TypeCheckbox } from '../checkbox';
import { Hvc, type IRefreshProps } from '../hooks';
import { TypeInput } from '../input';
import { TypeInputSearch } from '../input-search-new';
import type { IInputSearchProps, IInputSearchResult } from '../input-search-new/utils';
import OTPInput from '../otp';
import { TypeSelect } from '../select';
import { TypeTextArea } from '../text-area';
import { MediaUploadComponent } from '../upload-document';

export type typecomponent =
	| 'input'
	| 'input-search'
	| 'select'
	| 'text-area'
	| 'radio'
	| 'check-box'
	| 'password'
	| 'otp'
	| 'file';

interface ISelectOptions {
	id: number;
	label: string;
	value: string | number;
}

export interface IFormComponent {
	id: string;
	label?: string;
	placeHolder?: string;
	type?: string;
	component: typecomponent;
	initOptions?: ISelectOptions;
	optionData?: ISelectOptions[];
	isonlyview?: boolean;
	disabled?: boolean;
	hide?: boolean;
	text?: string;
	cta?: {
		text: string;
		link: string;
		type: 'external' | 'internal';
	};
	refreshProps?: IRefreshProps;
	className?: string;
	min?: string;
	value?: string | number | readonly string[];
	name?: string;
	onPauseChange?: (callBack: () => void) => void;
	// input search
	inputSearchProps?: IInputSearchProps;
	inputSearchValue?: string | number | readonly string[];
	inputSearchSelectedItems?: IInputSearchResult[];
	setInputSearchSelectedItems?: (selectedItems: IInputSearchResult[]) => void;
	inputSearchMultiSelect?: boolean;
	inputSearchOnChange?: React.ChangeEventHandler<HTMLInputElement>;
	inputSearchClear?: () => void;
}

interface IFormBuilder<T extends FieldValues> {
	formComponent: IFormComponent[];
	hookForm: UseFormReturn<T, any>;
	min?: boolean;
}

const FormBuilder = <T extends FieldValues>({ formComponent, hookForm, min }: IFormBuilder<T>) => (
	<>
		{formComponent.map((i) => (
			<Hvc
				removeDOM
				view={!i.hide}
				key={i.id}
				className={i.className}
			>
				{i.component === 'input' && (
					<TypeInput
						{...hookForm.register(i.id as Path<T>)}
						label={i.label}
						placeholder={i.placeHolder}
						type={i.type}
						error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
						isonlyview={i.isonlyview}
						disabled={i.disabled || i.isonlyview}
						className={i.className}
						min={i.min}
						minComponent={min}
					/>
				)}
				{i.component === 'otp' && (
					<OTPInput
						onChange={(otp) => {
							hookForm.setValue(i.id as Path<T>, otp as any);
						}}
						label={i.label}
						error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
					/>
				)}
				{i.component === 'select' && (
					<TypeSelect
						initoption={i.initOptions!}
						optionsdata={i.optionData}
						customwidth='100%'
						label={i.label}
						refreshProps={i.refreshProps}
						error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
						onChange={(e) => {
							const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
								hookForm.setError(i.id as Path<T>, {
									message: '',
								});
								if (!e.target.value) {
									hookForm.setError(i.id as Path<T>, {
										message: i.id + ' is missing',
									});
								}
								hookForm.setValue(i.id as Path<T>, e.target.value as any);
							};
							if (typeof i.onPauseChange === 'function') {
								i?.onPauseChange?.(() => {
									handleChange(e);
								});
							} else {
								handleChange(e);
							}
						}}
						value={hookForm.watch(i.id as Path<T>)}
						className={i.className ?? ''}
						minComponent={min}
					/>
				)}

				{i.component === 'file' && (
					<div>
						<label>{i.label}</label>
						<MediaUploadComponent
							title=''
							fileName=''
							setMediaFile={(file) => {
								hookForm.setValue(i.id as Path<T>, file as any);
							}}
							loadedFile={hookForm.watch(i.id as Path<T>)}
						/>
					</div>
				)}

				{i.component === 'input-search' && (
					<TypeInputSearch
						{...hookForm.register(i.id as Path<T>)}
						searchProps={i.inputSearchProps}
						label={i.label}
						placeholder={i.placeHolder}
						value={i.inputSearchValue}
						refreshProps={i.refreshProps}
						selectedItems={i.inputSearchSelectedItems}
						setSelectedItems={i.setInputSearchSelectedItems}
						min={i.min}
						minComponent={min}
						multiSelect={i.inputSearchMultiSelect}
						onChange={i.inputSearchOnChange}
						clear={i.inputSearchClear}
					/>
				)}
				{i.component === 'text-area' && (
					<TypeTextArea
						{...hookForm.register(i.id as Path<T>)}
						placeholder={i.placeHolder}
						label={i.label}
						error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
						className={i.className}
					/>
				)}
				{i.component === 'check-box' && (
					<div className='f-row-10 align-items-center'>
						<TypeCheckbox
							{...hookForm.register(i.id as Path<T>)}
							error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
						/>
						<label className='m-0 text-little color-label'>{i.label}</label>
					</div>
				)}
				{i.component === 'radio' && (
					<div className='f-row-10 align-items-center'>
						<TypeInput
							type='radio'
							{...hookForm.register(i.name as Path<T>)}
							value={i.value}
							error={hookForm.formState.errors?.[i.id as Path<T>]?.message as string}
							minComponent={min}
						/>
						<label className='m-0 text-little color-label'>{i.label}</label>
					</div>
				)}
			</Hvc>
		))}
	</>
);

export default FormBuilder;
