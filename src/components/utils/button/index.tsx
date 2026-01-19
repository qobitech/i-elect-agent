import './index.scss';

import React from 'react';

import { CloseSVG } from '../svgs';
import ButtonLoader from './button-loader';

export type btnType = 'outlined' | 'bold' | 'disabled' | 'danger' | 'active' | undefined;

export type btnSize = 'little' | 'small' | 'medium' | 'large' | 'table' | undefined;

interface IButton extends React.ComponentPropsWithoutRef<'button'> {
	buttonType?: btnType;
	buttonSize?: btnSize;
	title: string;
	load?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	close?: boolean;
	status?: boolean;
	icon?: string | JSX.Element;
}

export const TypeButton = React.forwardRef(
	({ buttonType, buttonSize, title, load, onClick, close, icon, ...props }: IButton, ref) => {
		const isIconSTR = typeof icon === 'string';
		return (
			<div className={`type-button ${props.className}`}>
				<button
					{...props}
					className={`${buttonType} ${buttonSize} ${props.className}`}
					ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
					onClick={load ? undefined : onClick}
				>
					{!load ? (
						<span className='d-flex align-items-center gap-10'>
							{close ? <CloseSVG /> : title}
							{isIconSTR ? <i className={icon} /> : icon}
						</span>
					) : (
						<ButtonLoader className={buttonType === 'outlined' ? 'bg-dark' : ''} />
					)}
				</button>
			</div>
		);
	}
);

TypeButton.displayName = 'TypeButton';

// export const TypeSmallButton = React.forwardRef(
//   (
//     {
//       buttonType,
//       buttonSize,
//       title,
//       load,
//       onClick,
//       close,
//       status,
//       ...props
//     }: IButton,
//     ref
//   ) => {
//     return (
//       <div className="type-small-button">
//         <button
//           {...props}
//           className={`${buttonType} ${buttonSize || ""} ${
//             props.className || ""
//           } ${status ? "status" : ""}`}
//           ref={ref as React.LegacyRef<HTMLButtonElement> | undefined}
//           onClick={load || status ? undefined : onClick}
//           disabled={status || props.disabled}
//         >
//           {!load ? (
//             <span>{close ? <CloseSVG /> : title}</span>
//           ) : (
//             <ButtonLoader
//               className={buttonType === "outlined" ? "bg-dark" : ""}
//             />
//           )}
//         </button>
//       </div>
//     )
//   }
// )
