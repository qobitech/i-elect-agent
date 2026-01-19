import './index.scss';

import React from 'react';

import { minStyle } from '../../../constants/global';
import TextPrompt from '../text-prompt';

interface IInput extends React.ComponentPropsWithoutRef<'input'> {
	label?: string;
	error?: string | undefined;
	isonlyview?: boolean;
	minComponent?: boolean;
	imageUrl?: string;
}

// eslint-disable-next-line react/display-name
export const TypeInput = React.forwardRef(({ label, error, isonlyview, minComponent, imageUrl, ...props }: IInput, ref) => (
	<div className={`type-input ${props.className || ''}`}>
		<div className={`form-container position-relative ${props.className || ''}`}>
			<div className='f-row-17 align-items-center pb-2'>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt='logo'
						style={{ width: '25px', height: '25px', objectFit: 'contain' }}
					/>
				) : null}
				{label && (
					<label
						htmlFor={props.id || props.name}
						className='m-0'
					>
						{label}
					</label>
				)}
			</div>
			<input
				ref={ref as React.LegacyRef<HTMLInputElement> | undefined}
				className={`${error ? 'is-error' : ''} ${isonlyview ? 'isonlyview' : ''}`}
				disabled={props.disabled || isonlyview}
				{...props}
				style={minStyle(minComponent)}
			/>
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
));
