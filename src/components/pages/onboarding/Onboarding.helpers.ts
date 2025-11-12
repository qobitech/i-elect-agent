import * as yup from 'yup';

import { type ResultType } from '../../../constants/global';

export interface IVolunteer {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	gender: string;
	dateOfBirth: string;
	hasSmartPhoneWithInternet: boolean;
	isAvailableAllDay: boolean;
	hasPartyAgentExperience: boolean;
	isNativeSpeaker: boolean;
	hasPowerBank: boolean;
	nin: string;
	partyId: number;
	electionId: number;
	wardOfResidence: number;
	resultType: Uppercase<ResultType>;
	entityCode: string;
	dateCreated: string;
	isApproved: boolean;
	score: string;
	approvedAt: string;
	approvedBy: number;
	isQualified: boolean;
	accountName: string | null;
	accountNumber: string | null;
	bankName: string | null;
	governmentDocument: string | null;
	volunteerStatusId: number;
}

export interface IOnboardingHK {
	accountName: string | null;
	accountNumber: string | null;
	bankName: string | null;
	governmentDocument: FileList | null;
	profilePhoto: FileList | null;
	votersCardId: string | null;
}

const fileValidation = (message: string, size: number) =>
	yup
		.mixed()
		.required(message)
		.test('fileType', 'Only images or PDFs are allowed', (value) => {
			if (!value) return false;
			const supportedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
			return supportedTypes.includes(value.type);
		})
		.test('fileSize', `File size is too large (max ${size}MB)`, (value) => {
			if (!value) return false;
			return value.size <= size * 1024 * 1024; // 5 MB
		});

export const onboardingSchema = {
	accountName: yup.string().required('Account name is required.'),
	accountNumber: yup.string().required('Account number is required.'),
	bankName: yup.string().required('Bank name is required.'),
	governmentDocument: fileValidation('A valid Government ID is required.', 5),
	profilePhoto: fileValidation('Your Face Photo is required.', 5),
	votersCardId: yup.string().required('Voters Card ID is required.'),
};

export const nigerianBanks = [
	'Access Bank',
	'Citibank Nigeria',
	'Ecobank Nigeria',
	'Fidelity Bank',
	'First Bank of Nigeria',
	'First City Monument Bank (FCMB)',
	'Globus Bank',
	'Guaranty Trust Holding Company (GTCO / GTBank)',
	'Heritage Bank',
	'Keystone Bank',
	'Optimus Bank',
	'Parallex Bank',
	'Polaris Bank',
	'Premium Trust Bank',
	'Providus Bank',
	'Stanbic IBTC Bank',
	'Standard Chartered Bank',
	'Sterling Bank',
	'SunTrust Bank',
	'Titan Trust Bank',
	'Union Bank of Nigeria',
	'United Bank for Africa (UBA)',
	'Unity Bank',
	'Wema Bank',
	'Zenith Bank',
];
