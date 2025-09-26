import './style.scss';

import React from 'react';

import { minStyle } from '../../../constants/global';
import { Hvc, type IRefreshProps, RefreshComponent } from '../hooks';
import TextPrompt from '../text-prompt';
interface ISelect extends React.ComponentPropsWithoutRef<'select'> {
	label?: string;
	error?: string | undefined;
	optionsdata?: {
		id: number | string;
		label: string;
		value: string | number;
		hide?: boolean;
	}[];
	initoption: { label: string; value: string | number };
	customwidth?: string | number;
	load?: boolean;
	disableInit?: boolean;
	cta?: {
		title: string;
		action: () => void;
		icon: string;
	};
	refreshProps?: IRefreshProps;
	minComponent?: boolean;
}

// eslint-disable-next-line react/display-name
export const TypeSelect = React.forwardRef(
	({ label, error, optionsdata, initoption, load, disableInit, cta, refreshProps, minComponent, ...props }: ISelect, ref) => (
		<div
			className='type-select'
			style={{ width: props.customwidth || '' }}
		>
			<div className='form-container f-column-7'>
				<Hvc
					removeDOM
					view={!!label}
					className='f-row-20 align-items-center'
				>
					<label
						className='m-0'
						htmlFor={props.id || props.name}
					>
						{label}
					</label>
					<Hvc
						removeDOM
						view={!!refreshProps}
					>
						<RefreshComponent
							load={refreshProps?.load}
							onRefresh={refreshProps?.onRefresh}
						/>
					</Hvc>
				</Hvc>
				<select
					{...props}
					ref={ref as React.LegacyRef<HTMLSelectElement> | undefined}
					className={error ? 'is-error' : ''}
					style={minStyle(minComponent)}
				>
					<option
						disabled={disableInit}
						value={initoption.value}
					>
						{initoption.label}
					</option>
					{optionsdata
						?.filter((i) => !i.hide)
						?.map((i) => (
							<option
								key={i.id}
								value={i.value}
							>
								{i.label}
							</option>
						))}
				</select>
				{!!error && (
					<>
						<TextPrompt
							prompt={error}
							status={false}
						/>
					</>
				)}
			</div>
		</div>
	)
);
