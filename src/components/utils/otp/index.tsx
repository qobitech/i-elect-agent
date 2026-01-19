import './index.scss';

import type React from 'react';
import { useState } from 'react';

import TextPrompt from '../text-prompt';

interface OTPInputProps {
	onChange: (otp: string) => void;
	label?: string;
	error?: string | undefined;
}

const OTPInput: React.FC<OTPInputProps> = ({ onChange, label, error }) => {
	const [otp, setOtp] = useState<string[]>(['', '', '', '']);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value;
		if (/^\d?$/.test(value)) {
			// Ensure only digits are entered
			const newOtp = [...otp];
			newOtp[index] = value;
			setOtp(newOtp);
			onChange(newOtp.join(''));

			// Focus next input if current is not empty and it's not the last input
			if (value && index < 3) {
				const nextInput = document.getElementById(`otp-input-${index + 1}`);
				nextInput?.focus();
			}
		}
	};

	const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' && !otp[index] && index > 0) {
			const prevInput = document.getElementById(`otp-input-${index - 1}`);
			prevInput?.focus();
		}
	};

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		const pasteData = e.clipboardData.getData('text');
		if (/^\d{4}$/.test(pasteData)) {
			const newOtp = pasteData.split('');
			setOtp(newOtp);
			onChange(pasteData);
			// Focus the last input
			const lastInput = document.getElementById('otp-input-3');
			lastInput?.focus();
		}
		e.preventDefault(); // Prevent the default paste behavior
	};

	return (
		<div className='f-column-7'>
			{label && <label>{label}</label>}
			<div className='type-input-otp f-row-10 justify-content-center'>
				{otp.map((digit, index) => (
					<input
						key={index}
						id={`otp-input-${index}`}
						type='number'
						value={digit}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleBackspace(e, index)}
						onPaste={handlePaste} // Add paste handler
						maxLength={1}
						style={{ height: '70px' }}
					/>
				))}
			</div>
			{!!error && (
				<>
					<TextPrompt
						prompt={error}
						status={false}
					/>
				</>
			)}
		</div>
	);
};

export default OTPInput;
