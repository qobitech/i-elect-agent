import type { ReactNode } from 'react';

const sizeHeight = {
	small: '8px',
	medium: '16px',
	large: '24px',
} as const;

const backgroundColors = {
	primary: '#dbeafe',
	success: '#dcfce7',
	warning: '#fef3c7',
	danger: '#fee2e2',
	info: '#cffafe',
} as const;

const fillColors = {
	primary: '#3b82f6',
	success: '#10b981',
	warning: '#f59e0b',
	danger: '#ef4444',
	info: '#06b6d4',
} as const;

type sizeHeightType = keyof typeof sizeHeight;
type backgroundColorsType = keyof typeof backgroundColors;
type fillColorsType = keyof typeof fillColors;

interface ProgressBarProps {
	children?: ReactNode;
	className?: string;
	show?: boolean;
	percentage?: number;
	variant?: backgroundColorsType;
	size?: sizeHeightType;
	fillColorsVariant?: fillColorsType;
	value?: number;
	max?: number;
	showLabel?: boolean;
	showPercentage?: boolean;
	label?: string;
}

const ProgressContainer = ({ children, className = '' }: ProgressBarProps) => (
	<div
		className={`progress-container ${className}`}
		style={{
			width: '100%',
		}}
	>
		{children}
		<style>{`
			.progress-container {
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			}
		`}</style>
	</div>
);

const ProgressHeader = ({ children, show }: ProgressBarProps) =>
	show ? (
		<div className='progress-header'>
			{children}
			<style>{`
				.progress-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 8px;
				}
			`}</style>
		</div>
	) : null;

const ProgressLabel = ({ children, show }: ProgressBarProps) =>
	show ? (
		<span className='progress-label'>
			{children}
			<style>{`
				.progress-label {
					font-size: 14px;
					font-weight: 500;
					color: #374151;
				}
			`}</style>
		</span>
	) : null;

const ProgressPercentage = ({ percentage = 0, show }: ProgressBarProps) =>
	show ? (
		<span className='progress-percentage'>
			{isNaN(percentage) ? '0' : Math.round(percentage)}%
			<style>{`
				.progress-percentage {
					font-size: 14px;
					font-weight: 500;
					color: #374151;
				}
			`}</style>
		</span>
	) : null;

const ProgressTrack = ({ children, variant = 'primary', size = 'small' }: ProgressBarProps) => (
	<div className='progress-track'>
		{children}
		<style>{`
				.progress-track {
					width: 100%;
					height: ${sizeHeight[size]};
					background-color: ${backgroundColors[variant]};
					border-radius: 9999px;
					overflow: hidden;
					position: relative;
				}
			`}</style>
	</div>
);

const ProgressFill = ({ percentage, fillColorsVariant = 'primary' }: ProgressBarProps) => (
	<div className='progress-fill'>
		<style>{`
				.progress-fill {
					height: 100%;
					background-color: ${fillColors[fillColorsVariant]};
					border-radius: 9999px;
					width: ${percentage}%;
					transition: width 0.3s ease-out;
					position: relative;
				}
			`}</style>
	</div>
);

const ProgressOverlay = ({ percentage = 0, size, show }: ProgressBarProps) =>
	show && size === 'large' ? (
		<div className='progress-overlay'>
			{Math.round(percentage)}%
			<style>{`
				.progress-overlay {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 12px;
					font-weight: 500;
					color: white;
					text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
					z-index: 10;
				}
			`}</style>
		</div>
	) : null;

export const ProgressBar = ({
	size = 'medium',
	variant = 'primary',
	className = '',
	value = 0,
	max = 100,
	showLabel = true,
	showPercentage = true,
	label = '',
}: ProgressBarProps) => {
	// const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
	const percentage = Number(Math.min(Math.max((value / max) * 100, 0), 100).toFixed(2));

	return (
		<ProgressContainer className={className}>
			<ProgressHeader show={showLabel || showPercentage}>
				<ProgressLabel show={showLabel && !!label}>{label}</ProgressLabel>
				<ProgressPercentage
					percentage={percentage}
					show={showPercentage}
				/>
			</ProgressHeader>

			<ProgressTrack
				variant={variant}
				size={size}
			>
				<ProgressFill
					percentage={percentage}
					variant={variant}
					size={size}
				/>
				<ProgressOverlay
					percentage={percentage}
					size={size}
					show={showPercentage}
				/>
			</ProgressTrack>
		</ProgressContainer>
	);
};
