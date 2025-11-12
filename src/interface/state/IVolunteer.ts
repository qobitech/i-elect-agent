import { type ResultType } from '../../constants/global';

export interface IVolunteerResponse {
	message: string;
	isSuccessful: boolean;
	statusCode: number;
	data: {
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
		resultType: ResultType;
		entityCode: string;
		dateCreated: string;
		isApproved: boolean;
		score: string;
		approvedAt: string;
		approvedBy: number;
		isQualified: boolean;
		accountName: null;
		accountNumber: null;
		bankName: null;
		governmentDocument: null;
		volunteerStatusId: number;
		verificationToken: string;
	};
}
