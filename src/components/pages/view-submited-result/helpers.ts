import { type IIRevResultState, type IIRevResultStates } from '../../../interface/state/IRev';
import { type IRrevDataReq } from '../../../store/actions/query/irev';

export interface IElectoralDivisionCode {
	code: string;
	name: string;
}

export type reviewType =
	| 'approve'
	| 'request delete'
	| 'review delete request'
	| 'cancel delete request'
	| 'approve delete request'
	| 'replace'
	| 'flag'
	| 'add notes'
	| 'edit'
	| undefined;

export interface IEditElectionResultState {
	review: reviewType | undefined;
	error: string;
	comment: string;
	success: boolean;
	loading: boolean;
	resultLoading: boolean;
	navIndex: number;
}

export const defaultElectoralDivisionCode = {
	code: '',
	name: '',
	id: 0,
};

export const defaultResultState: IIRevResultState = {
	id: '',
	election: {
		id: 0,
		name: '',
		electionCycleId: 0,
		constituencyId: 0,
		isSpecialElection: false,
		electionCycle: {
			id: 0,
			electionTypeId: 0,
			name: '',
			year: '',
			startDate: '',
			endDate: '',
		},
		constituency: {
			id: 0,
			name: '',
			code: '',
			alias: '',
			stateId: 0,
			electiveCategoryId: 0,
			isCouncilorship: false,
			lgaCount: 0,
			wardCount: 0,
			pollingUnitCount: 0,
		},
	},
	ward: defaultElectoralDivisionCode,
	localGovernment: defaultElectoralDivisionCode,
	state: defaultElectoralDivisionCode,
	pollingUnit: defaultElectoralDivisionCode,
	geoZone: defaultElectoralDivisionCode,
	zone: defaultElectoralDivisionCode,
	presidingOfficer: {
		id: '',
		name: '',
	},
	referenceId: '',
	votersOnRegister: 0,
	accreditedVoters: 0,
	ballotPapersIssuedToPoolingUnit: 0,
	unusedBallotPapers: 0,
	rejectedBallot: 0,
	totalValidVotes: 0,
	totalUsedBallotPapers: 0,
	status: null,
	documentUrls: [],
	createdAt: '',
	updatedAt: '',
	createdBy: {
		id: 0,
		name: '',
	},
	updatedBy: null,
	approvedBy: {
		id: '',
		name: '',
	},
	approvedAt: '',
	results: [],
	flags: [],
	deleteIsRequested: false,
	isDeleted: false,
	deleteRequestedBy: null,
	deleteRequestedAt: '',
	deleteApprovedBy: null,
	deleteApprovedAt: '',
	hasFlags: false,
	hasNotes: false,
	notes: [],
};

export const tabs = {
	// RESULT: 'Result',
	INFO: 'Info',
	// STATS: 'Stats',
	USERNOTES: 'User Notes',
	FLAGS: 'Flags',
};

export interface IHF {
	ReferenceId: string;
	Election: string;
	PoolingUnit: string;
	Address: string;
	Latitude: string;
	Longitude: string;
	Ward: string;
	LocalGovernment: string;
	State: string;
	PresidinOfficerId: string;
	Name: string;
	VotersOnRegister: string;
	AccreditedVoters: string;
	BallotPapersIssuedToPoolingUnit: string;
	UnusedBallotPapers: string;
	RejectedBallot: string;
	TotalValidVotes: string;
	TotalUsedBallotPapers: string;
	Status: filterValueType;
	DocumentUrl: string;
	PageNumber: string;
	PageSize: string;
	Sort: string;
	Action: pageActionType;
	AdvancedSearch: string;
}

export type pageActionType = 'search' | 'filter' | 'reset-filter' | 'refresh' | 'paginate';

const filterValues = {
	APPROVED: 'Approved',
	REVIEWED: 'Reviewed',
	UNAPPROVED: 'Unreviewed',
	REJECTED: 'Rejected',
} as const;

export type filterValueType = (typeof filterValues)[keyof typeof filterValues];

export const formatINECDate = (value: number | string | Date) =>
	new Date(value)
		.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		})
		.replace(',', '.');

export function _codeSeparator(code: string) {
	const codeArr = code.trim().split('/');
	if (codeArr.length - 1 === 1)
		return {
			state: codeArr[0],
			lga: codeArr[1],
		};
	if (codeArr.length - 1 === 2)
		return {
			state: codeArr[0],
			lga: codeArr[1],
			ward: codeArr[2],
		};
	if (codeArr.length - 1 === 3)
		return {
			state: codeArr[0],
			lga: codeArr[1],
			ward: codeArr[2],
			pollingunit: codeArr[3],
		};
	return {
		state: code,
	};
}

export interface IUGR {
	getResults: (data?: IRrevDataReq) => void;
	response: IIRevResultStates;
}

export interface IUGRefId {
	getResults: (refId: string) => void;
	response: IIRevResultState;
}
