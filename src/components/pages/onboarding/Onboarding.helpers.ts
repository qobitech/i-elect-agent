import { type ResultType } from '@constants/global';
import * as yup from 'yup';

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
	governmentDocument: string | null;
}

export const onboardingSchema = {
	accountName: yup.string().required('Account name is required.'),
	accountNumber: yup.string().required('Account number is required.'),
	bankName: yup.string().required('Bank name is required.'),
	governmentDocument: yup.string(),
};
