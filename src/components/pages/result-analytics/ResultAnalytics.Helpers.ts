import { type ReactNode } from 'react';

import { type ResultType } from '../../../constants/global';
import { type IStates } from '../../../interface/IReducer';
import {
	type IElectionOfficialByQuery,
	type IElectionResultStatsData,
	type IElectionResultStatsDataValue,
} from '../../../interface/state/IElectionState';
import { type IGetResultAnalyticsData } from '../../../interface/state/IResultState';
import { type IIrevAnalyticsResponseVoteSummary } from '../../../interface/state/IRev';
import { type IRightSection } from '../../utils/right-section';
import { type ITableRecord } from '../../utils/table';

export const tableHeader = ['UPLOADED', '% Complete', 'Last Update', ''];

export type ResultAnalyticsStage = 'locked-election' | 'stats' | 'count-down';

export const getElectoralDivisionByResultType = (resultType: ResultType) => {
	const obj: Partial<Record<ResultType, string>> = {
		EC8D: 'State',
		EC8C: 'Local Government',
		EC8B: 'Ward',
		EC8A: 'Polling Unit',
	};

	return obj[resultType] ?? '';
};

export const analyticsElectoralDivisionTabObject = {
	UPLOADED: 'Uploaded Results',
	REMAINING: 'Remaining Results',
};

export interface IResultAnalyticsElectoralDivision {
	resultType: ResultType | null;
	handlePreviousStage: () => void;
	constituencyId: number;
}

export interface IGetResultAnalyticsStatsElectoralDivision {
	totalCount: number;
	uploadedCount: number;
}

interface IElectoralDivisionStats {
	lga: IGetResultAnalyticsStatsElectoralDivision;
	ward: IGetResultAnalyticsStatsElectoralDivision;
	pollingUnit: IGetResultAnalyticsStatsElectoralDivision;
	state: IGetResultAnalyticsStatsElectoralDivision;
}

export const getResultAnalyticsElectoralDivisionStats = (data: IElectoralDivisionStats, resultType: ResultType) => {
	const obj: Partial<Record<ResultType, IGetResultAnalyticsStatsElectoralDivision>> = {
		EC8D: data.state,
		EC8C: data.lga,
		EC8B: data.ward,
		EC8A: data.pollingUnit,
	};

	return obj[resultType];
};

export interface IResultAnalyticsTableData {
	name: string;
	id: number;
	code: string;
}

export const getTableData = (resultType: ResultType, states: IStates): IResultAnalyticsTableData[] => {
	const obj: Partial<Record<ResultType, IResultAnalyticsTableData[]>> = {
		EC8A: states?._poolingUnit?.get_PoolingUnitInWard?.data?.map((i) => ({
			name: i?.name,
			code: i?.poolingUnitCode,
			id: i?.id,
		})),
		EC8B: [
			{
				name: '',
				code: '',
				id: 0,
			},
		],
		EC8C: [
			{
				name: '',
				code: '',
				id: 0,
			},
		],
		EC8D: [
			{
				name: '',
				code: '',
				id: 0,
			},
		],
	};
	return obj[resultType] ?? [];
};

export const mapUploadedResultTableData = (resultType: ResultType) => (data: IGetResultAnalyticsData) => {
	const obj: Partial<Record<ResultType, number>> = {
		EC8A: data.pollingUnitId,
		EC8B: data.wardId,
		EC8C: data.lgaId,
		EC8D: data.stateId,
	};
	return {
		code: data.code,
		id: obj[resultType] ?? '',
		resultId: data.resultId,
	};
};

export interface IUploadedResult {
	electionOfficialData?: IElectionOfficialByQuery;
}

export interface IResultTable {
	load?: boolean;
	refresh?: () => void;
	name: string;
	tableBody: ITableRecord[];
	currentPage?: number;
	totalPages?: number;
	handlePagination?: (selectedItem: { selected: number }) => void;
}

export type sourceWrapperTemplateType = Partial<
	Record<
		ResultType,
		{
			tabs: Record<string, string>;
			description: Record<string, string>;
			source: Record<string, string>;
		}
	>
>;

export const sourceWrapperTemplate: sourceWrapperTemplateType = {
	EC8B: {
		tabs: {
			SRC1: 'Source A',
			SRC2: 'Source B',
		},
		description: {
			'Source A':
				'These are the EC8A results submitted from the Polling Units. They represent the figures directly uploaded by field agents before collation.',
			'Source B':
				'These are the results compiled at the RA/Ward level. They represent the officially tallied figures based on all incoming reports',
		},
		source: {
			'Source A': 'sourceA',
			'Source B': 'sourceB',
		},
	},
	EC8C: {
		tabs: {
			SRC1: 'Source A',
			SRC2: 'Source B',
		},
		description: {
			'Source A':
				'These are the EC8B results submitted from the RA/Wards. They represent the figures directly uploaded by field agents before collation.',
			'Source B':
				'These are the results compiled at the Local Government level. They represent the officially tallied figures based on all incoming reports',
		},
		source: {
			'Source A': 'sourceA',
			'Source B': 'sourceB',
		},
	},
	EC8D: {
		tabs: {
			SRC1: 'Source A',
			SRC2: 'Source B',
		},
		description: {
			'Source A':
				'These are the EC8C results submitted from the Local Governments. They represent the figures directly uploaded by field agents before collation.',
			'Source B':
				'These are the results compiled at the State level. They represent the officially tallied figures based on all incoming reports',
		},
		source: {
			'Source A': 'sourceA',
			'Source B': 'sourceB',
		},
	},
};

export interface IResultSourceWrapperSection {
	children?: (source: 'sourceA' | 'sourceB') => ReactNode;
	resultType: ResultType;
}

export const sampleTableDataSummary = {
	sourceA: {
		registeredVoters: 750,
		accreditedVoters: 520,
		validVotes: 500,
		rejectedVotes: 20,
		totalVotes: 520,
	},
	sourceB: {
		registeredVoters: 790,
		accreditedVoters: 515,
		validVotes: 495,
		rejectedVotes: 20,
		totalVotes: 515,
	},
};

export const sampleTableData = [
	{
		entityName: 'PU 001',
		code: 'PU001',
		sourceA: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 5 },
				{ partyName: 'AA', voteCount: 3 },
				{ partyName: 'AAC', voteCount: 4 },
				{ partyName: 'ADC', voteCount: 12 },
				{ partyName: 'ADP', voteCount: 6 },
				{ partyName: 'APC', voteCount: 180 },
				{ partyName: 'APGA', voteCount: 22 },
				{ partyName: 'APM', voteCount: 3 },
				{ partyName: 'APP', voteCount: 2 },
				{ partyName: 'BP', voteCount: 1 },
				{ partyName: 'LP', voteCount: 140 },
				{ partyName: 'NNPP', voteCount: 16 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 94 },
				{ partyName: 'PRP', voteCount: 2 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 3 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
		sourceB: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 4 },
				{ partyName: 'AA', voteCount: 3 },
				{ partyName: 'AAC', voteCount: 4 },
				{ partyName: 'ADC', voteCount: 10 },
				{ partyName: 'ADP', voteCount: 5 },
				{ partyName: 'APC', voteCount: 178 },
				{ partyName: 'APGA', voteCount: 20 },
				{ partyName: 'APM', voteCount: 2 },
				{ partyName: 'APP', voteCount: 2 },
				{ partyName: 'BP', voteCount: 1 },
				{ partyName: 'LP', voteCount: 138 },
				{ partyName: 'NNPP', voteCount: 15 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 93 },
				{ partyName: 'PRP', voteCount: 2 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 3 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
	},
	{
		entityName: 'PU 002',
		code: 'PU002',
		sourceA: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 3 },
				{ partyName: 'AA', voteCount: 4 },
				{ partyName: 'AAC', voteCount: 3 },
				{ partyName: 'ADC', voteCount: 14 },
				{ partyName: 'ADP', voteCount: 7 },
				{ partyName: 'APC', voteCount: 160 },
				{ partyName: 'APGA', voteCount: 18 },
				{ partyName: 'APM', voteCount: 3 },
				{ partyName: 'APP', voteCount: 2 },
				{ partyName: 'BP', voteCount: 1 },
				{ partyName: 'LP', voteCount: 130 },
				{ partyName: 'NNPP', voteCount: 14 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 84 },
				{ partyName: 'PRP', voteCount: 2 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 3 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
		sourceB: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 3 },
				{ partyName: 'AA', voteCount: 4 },
				{ partyName: 'AAC', voteCount: 3 },
				{ partyName: 'ADC', voteCount: 13 },
				{ partyName: 'ADP', voteCount: 7 },
				{ partyName: 'APC', voteCount: 158 },
				{ partyName: 'APGA', voteCount: 17 },
				{ partyName: 'APM', voteCount: 3 },
				{ partyName: 'APP', voteCount: 2 },
				{ partyName: 'BP', voteCount: 1 },
				{ partyName: 'LP', voteCount: 129 },
				{ partyName: 'NNPP', voteCount: 14 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 83 },
				{ partyName: 'PRP', voteCount: 2 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 3 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
	},
	{
		entityName: 'PU 003',
		code: 'PU003',
		sourceA: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 6 },
				{ partyName: 'AA', voteCount: 5 },
				{ partyName: 'AAC', voteCount: 2 },
				{ partyName: 'ADC', voteCount: 20 },
				{ partyName: 'ADP', voteCount: 8 },
				{ partyName: 'APC', voteCount: 210 },
				{ partyName: 'APGA', voteCount: 25 },
				{ partyName: 'APM', voteCount: 4 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 160 },
				{ partyName: 'NNPP', voteCount: 20 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 110 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 4 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
		sourceB: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 5 },
				{ partyName: 'AA', voteCount: 5 },
				{ partyName: 'AAC', voteCount: 4 },
				{ partyName: 'ADC', voteCount: 18 },
				{ partyName: 'ADP', voteCount: 7 },
				{ partyName: 'APC', voteCount: 208 },
				{ partyName: 'APGA', voteCount: 24 },
				{ partyName: 'APM', voteCount: 3 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 158 },
				{ partyName: 'NNPP', voteCount: 19 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 108 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 4 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
	},
	{
		entityName: 'PU 004',
		code: 'PU004',
		sourceA: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 8 },
				{ partyName: 'AA', voteCount: 6 },
				{ partyName: 'AAC', voteCount: 6 },
				{ partyName: 'ADC', voteCount: 24 },
				{ partyName: 'ADP', voteCount: 10 },
				{ partyName: 'APC', voteCount: 240 },
				{ partyName: 'APGA', voteCount: 30 },
				{ partyName: 'APM', voteCount: 5 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 190 },
				{ partyName: 'NNPP', voteCount: 22 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 120 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 4 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
		sourceB: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 7 },
				{ partyName: 'AA', voteCount: 6 },
				{ partyName: 'AAC', voteCount: 6 },
				{ partyName: 'ADC', voteCount: 22 },
				{ partyName: 'ADP', voteCount: 9 },
				{ partyName: 'APC', voteCount: 238 },
				{ partyName: 'APGA', voteCount: 29 },
				{ partyName: 'APM', voteCount: 5 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 188 },
				{ partyName: 'NNPP', voteCount: 22 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 118 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 4 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
	},
	{
		entityName: 'PU 005',
		code: 'PU005',
		sourceA: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 5 },
				{ partyName: 'AA', voteCount: 4 },
				{ partyName: 'AAC', voteCount: 4 },
				{ partyName: 'ADC', voteCount: 16 },
				{ partyName: 'ADP', voteCount: 7 },
				{ partyName: 'APC', voteCount: 190 },
				{ partyName: 'APGA', voteCount: 24 },
				{ partyName: 'APM', voteCount: 4 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 155 },
				{ partyName: 'NNPP', voteCount: 18 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 105 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 4 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
		sourceB: {
			resultId: '',
			voteCount: [
				{ partyName: 'A', voteCount: 4 },
				{ partyName: 'AA', voteCount: 4 },
				{ partyName: 'AAC', voteCount: 4 },
				{ partyName: 'ADC', voteCount: 14 },
				{ partyName: 'ADP', voteCount: 7 },
				{ partyName: 'APC', voteCount: 188 },
				{ partyName: 'APGA', voteCount: 24 },
				{ partyName: 'APM', voteCount: 4 },
				{ partyName: 'APP', voteCount: 3 },
				{ partyName: 'BP', voteCount: 2 },
				{ partyName: 'LP', voteCount: 153 },
				{ partyName: 'NNPP', voteCount: 18 },
				{ partyName: 'NRM', voteCount: 1 },
				{ partyName: 'PDP', voteCount: 103 },
				{ partyName: 'PRP', voteCount: 3 },
				{ partyName: 'SDP', voteCount: 5 },
				{ partyName: 'YPP', voteCount: 3 },
				{ partyName: 'ZLP', voteCount: 1 },
			],
		},
	},
];

export const getStatsResultType = (resultType: ResultType, data: IElectionResultStatsData) => {
	const obj: Partial<
		Record<
			ResultType,
			{
				sourceA: { resultType: ResultType; name: string; stats: IElectionResultStatsDataValue };
				sourceB: { resultType: ResultType; name: string; stats: IElectionResultStatsDataValue };
			}
		>
	> = {
		EC8B: {
			sourceA: { resultType: 'EC8A', name: 'Polling Unit', stats: data?.pollingUnit },
			sourceB: { resultType: 'EC8B', name: 'Ward', stats: data?.ward },
		},
		EC8C: {
			sourceA: { resultType: 'EC8B', name: 'Ward', stats: data?.ward },
			sourceB: { resultType: 'EC8C', name: 'Local Government', stats: data?.lga },
		},
		EC8D: {
			sourceA: { resultType: 'EC8C', name: 'Local Government', stats: data?.lga },
			sourceB: { resultType: 'EC8D', name: 'State', stats: data?.state },
		},
	};

	return obj[resultType];
};

export interface IIndicator {
	isValid?: boolean;
	onClick?: () => void;
	value: number;
	position: 'up' | 'down';
}

export interface IResultAnalyticsKPICard {
	label: string;
	expected?: number;
	uploaded?: number;
	onClick?: () => void;
}

export interface IResultAnalyticsSummary {
	registeredVoters: number;
	accreditedVoters: number;
	validVotes: number;
	rejectedVotes: number;
	totalVotes: number;
}

export interface IResultAnalyticsSummaryCard {
	data: IIrevAnalyticsResponseVoteSummary | undefined;
	source: 'sourceA' | 'sourceB';
}
