export interface ICode {
	code: string;
	name: string;
	codeId: number;
	status: boolean;
}
export interface IChildCode {
	code: string;
	name: string;
	codeId: number;
	parent: number;
	status: boolean;
}

export interface IVoteCount {
	partyId: number;
	partyName: string;
	votes: number;
	label: string;
	logo: string;
}
export interface IPartyVotes {
	id: number;
	name: string;
	code: string;
	votes: IVoteCount[];
}

export type ursType =
	| 'Electoral Division'
	| 'Upload Result'
	| 'Upload Result Status'
	| 'Result Summary'
	| 'Party Vote Count'
	| 'Preview'
	| 'Party Vote Summary'
	| 'Election Result Submission Status';

export type stageEnumType = 'Child' | 'Party Votes';

export interface IResultSummary {
	DataVotersOnRegister: number; // done
	DataAccreditedVoters: number; // done
	DataBallotPapersIssuedToPoolingUnit: number; // done
	DataUnusedBallotPapers: number; // done
	DataRejectedBallot: number; // done
	DataTotalValidVotes: number; // done
	DataTotalUsedBallotPapers: number; // done
}

export const defaultSummary: IResultSummary = {
	DataVotersOnRegister: 0,
	DataAccreditedVoters: 0, // done
	DataBallotPapersIssuedToPoolingUnit: 0, // done
	DataUnusedBallotPapers: 0, // done
	DataRejectedBallot: 0, // done
	DataTotalValidVotes: 0, // done
	DataTotalUsedBallotPapers: 0, // done
};
