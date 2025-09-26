import type { ResultType } from '../../constants/global';
import type { IGetElectionOfficial } from '../../interface/state/IElectionState';
import type { IChildCode, ICode, IPartyVotes, IResultSummary, stageEnumType, ursType } from '../pages/upload-result/utils';

export interface IReportIssues {
	userId: string;
	report: {
		title: string;
		body: string;
	};
	phoneNumber: string;
	email: string;
}

export interface IComponentState {
	draftStatus: boolean;
	stage: ursType;
	isPreview: boolean;
	partyVotes: IPartyVotes[];
	resultSummary: IResultSummary;
	files: File[];
	uploadedFiles: string[];
	isUpdate: boolean;
	partyVoteStage: stageEnumType;
	selectedParentCode: ICode;
	selectedChildCode: IChildCode;
	parentCodes: ICode[];
	childCodes: IChildCode[];
	reportIssues: IReportIssues;
	resultType: ResultType | '';
	electionData: IGetElectionOfficial;
	load: boolean;
	onExtract: boolean;
}
