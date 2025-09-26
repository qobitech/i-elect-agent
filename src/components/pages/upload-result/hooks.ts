import { getUserData } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IActions } from '../../../interface/IAction';
import type { IStates } from '../../../interface/IReducer';
import type { ILGAInState } from '../../../interface/state/ILGAState';
import type { IPartyStates } from '../../../interface/state/IParty';
import type { IPollingUnitInWardsState } from '../../../interface/state/IPollingUnitState';
import type { IWardInLGAState } from '../../../interface/state/IWardState';
import type {
	ICreateLGAResult,
	ICreatePUResult,
	ICreateStateResult,
	ICreateWardResult,
	ILGAResultMap,
	IResult,
	IStateResultMap,
	IWardResultMap,
} from '../../../store/actions/query/irev';
// import jwtDecode from 'jwt-decode'
import type { IComponentState } from '../../layout/component-state';
import { type IUSH, useStateHook } from '../../layout/state-hook';
import {
	defaultSummary,
	type IChildCode,
	// IChildCode,
	// ICode,
	type IPartyVotes,
	type IVoteCount,
} from './utils';

export const getResults = (states: IStates | undefined, partyVotes: IPartyVotes[]): IResult[] => {
	const allParties = states?._party.get_Party?.data;
	// Flatten and merge duplicates
	const mergedOutput: IResult[] = partyVotes
		? Array.from(
				partyVotes
					?.flatMap?.((item) =>
						item.votes.map((i) => ({
							...i,
							votes: parseInt(i.votes + '') || 0,
						}))
					)
					?.reduce((acc, curr) => {
						if (acc.has(curr.partyId)) {
							// Merge votes if partyId already exists

							acc.get(curr.partyId)!.votes += parseInt(curr.votes + '');
						} else {
							// Add new entry
							acc.set(curr.partyId, {
								...curr,
								partyName: allParties?.filter((j) => j.id === curr.partyId)?.[0]?.shortName || '',
							});
						}
						return acc;
					}, new Map<number, IResult>())
					.values()
			)
		: [];
	return mergedOutput;
};

const getZoneProps = (states: IStates | undefined) => {
	const zoneProps = states?._geographicalzone?.get_GeographicalZone?.data || [];

	const geoZoneId = states?._countryState?.get_CountryStateByID?.data?.geographicalZoneId || 0;
	return zoneProps.filter((i) => i.id + '' === geoZoneId + '')?.[0];
};

export const useStateResultDataManager = ({ results }: { results: IResult[] }): { data: ICreateStateResult } => {
	const {
		states,
		global: {
			state: { resultSummary, uploadedFiles, partyVotes, electionData, selectedParentCode },
		},
	} = useGlobalContext();
	const geoZoneProps = getZoneProps(states);
	const getStateResultsMap = () => {
		// Flatten and merge duplicates
		const transformedArray: IStateResultMap[] = partyVotes.flatMap((item) =>
			item.votes.map(({ partyId, votes }: IVoteCount) => ({
				lgaId: item.id,
				partyId,
				votes: parseInt(votes + '') || 0,
			}))
		);
		return transformedArray;
	};
	const data: ICreateStateResult = {
		accreditedVoters: resultSummary.DataAccreditedVoters,
		ballotPapersIssuedToPoolingUnit: resultSummary.DataBallotPapersIssuedToPoolingUnit,
		totalUsedBallotPapers: resultSummary.DataTotalUsedBallotPapers,
		totalValidVotes: resultSummary.DataTotalValidVotes,
		unusedBallotPapers: resultSummary.DataUnusedBallotPapers,
		votersOnRegister: resultSummary.DataVotersOnRegister,
		rejectedBallot: resultSummary.DataRejectedBallot,
		documentUrls: uploadedFiles,
		results: results.map((i) => ({
			partyId: i.partyId,
			partyName: i.partyName,
			votes: i.votes,
		})),
		resultMap: getStateResultsMap(),
		createdBy: {
			id: parseInt(getUserData().user?.UserId || ''),
			name: getUserData().user?.FullName || '',
		},
		election: {
			id: electionData?.data?.election?.id || 0,
			name: electionData?.data?.election?.name || '',
		},
		localGovernment: {
			code: selectedParentCode?.code,
			name: selectedParentCode.name,
		},
		presidingOfficer: {
			id: getUserData().user?.UserId || '',
			name: getUserData().user?.FullName || '',
		},
		state: {
			code: states?._countryState?.get_CountryStateByID?.data?.stateCode + '',
			name: states?._countryState?.get_CountryStateByID?.data?.name + '',
		},
		geoZone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.name,
		},
		zone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.zone?.name,
		},
		flags: [],
	};
	return {
		data,
	};
};

export const useLGAResultDataManager = ({ results }: { results: IResult[] }): { data: ICreateLGAResult } => {
	const {
		states,
		global: {
			state: { resultSummary, uploadedFiles, partyVotes, electionData, selectedParentCode },
		},
	} = useGlobalContext();

	const getLGAResultsMap = () => {
		// Flatten and merge duplicates
		const transformedArray: ILGAResultMap[] = partyVotes.flatMap((item) =>
			item.votes.map(({ partyId, votes }: IVoteCount) => ({
				wardId: item.id,
				partyId,
				votes: parseInt(votes + '') || 0,
			}))
		);
		return transformedArray;
	};
	const geoZoneProps = getZoneProps(states);
	const data: ICreateLGAResult = {
		accreditedVoters: resultSummary.DataAccreditedVoters,
		ballotPapersIssuedToPoolingUnit: resultSummary.DataBallotPapersIssuedToPoolingUnit,
		totalUsedBallotPapers: resultSummary.DataTotalUsedBallotPapers,
		totalValidVotes: resultSummary.DataTotalValidVotes,
		unusedBallotPapers: resultSummary.DataUnusedBallotPapers,
		votersOnRegister: resultSummary.DataVotersOnRegister,
		rejectedBallot: resultSummary.DataRejectedBallot,
		documentUrls: uploadedFiles,
		results: results.map((i) => ({
			partyId: i.partyId,
			partyName: i.partyName,
			votes: i.votes,
		})),
		resultMap: getLGAResultsMap(),
		createdBy: {
			id: parseInt(getUserData().user?.UserId || ''),
			name: getUserData().user?.FullName || '',
		},
		election: {
			id: electionData?.data?.election?.id || 0,
			name: electionData?.data?.election?.name || '',
		},
		localGovernment: {
			code: selectedParentCode?.code,
			name: selectedParentCode.name,
		},
		presidingOfficer: {
			id: getUserData().user?.UserId || '',
			name: getUserData().user?.FullName || '',
		},
		state: {
			code: states?._countryState?.get_CountryStateByID?.data?.stateCode + '',
			name: states?._countryState?.get_CountryStateByID?.data?.name + '',
		},
		geoZone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.name,
		},
		zone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.zone?.name,
		},
	};
	return {
		data,
	};
};

export const useWardResultDataManager = ({ results }: { results: IResult[] }): { data: ICreateWardResult } => {
	const {
		states,
		global: {
			state: { resultSummary, uploadedFiles, partyVotes, selectedParentCode, electionData },
		},
	} = useGlobalContext();
	const geoZoneProps = getZoneProps(states);
	const getWardResultsMap = () => {
		// Flatten and merge duplicates
		const transformedArray: IWardResultMap[] = partyVotes.flatMap((item) =>
			item.votes.map(({ partyId, votes }: IVoteCount) => ({
				pollingUnitId: item.id,
				partyId,
				votes: parseInt(votes + '') || 0,
			}))
		);
		return transformedArray;
	};
	const lga = states?._ward?.get_WardByCode?.data?.[0]?.lga;
	const data: ICreateWardResult = {
		accreditedVoters: resultSummary.DataAccreditedVoters,
		ballotPapersIssuedToPoolingUnit: resultSummary.DataBallotPapersIssuedToPoolingUnit,
		totalUsedBallotPapers: resultSummary.DataTotalUsedBallotPapers,
		totalValidVotes: resultSummary.DataTotalValidVotes,
		unusedBallotPapers: resultSummary.DataUnusedBallotPapers,
		votersOnRegister: resultSummary.DataVotersOnRegister,
		rejectedBallot: resultSummary.DataRejectedBallot,
		documentUrls: uploadedFiles,
		results: results.map((i) => ({
			partyId: i.partyId,
			partyName: i.partyName,
			votes: i.votes,
		})),
		resultMap: getWardResultsMap(),
		createdBy: {
			id: parseInt(getUserData().user?.UserId || ''),
			name: getUserData().user?.FullName || '',
		},
		election: {
			id: electionData?.data?.election?.id || 0,
			name: electionData?.data?.election?.name || '',
		},
		ward: {
			code: selectedParentCode?.code,
			name: selectedParentCode.name,
		},
		presidingOfficer: {
			id: getUserData().user?.UserId || '',
			name: getUserData().user?.FullName || '',
		},
		state: {
			code: states?._countryState?.get_CountryStateByID?.data?.stateCode + '',
			name: states?._countryState?.get_CountryStateByID?.data?.name + '',
		},
		geoZone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.name,
		},
		zone: {
			code: geoZoneProps?.code,
			name: geoZoneProps?.zone?.name,
		},
		flags: [],
		localGovernment: {
			code: lga?.lgaCode || '',
			name: lga?.name || '',
		},
	};
	return {
		data,
	};
};

export const usePollingUnitResultDataManager = ({ results }: { results: IResult[] }): { data: ICreatePUResult } => {
	const {
		global: {
			state: { resultSummary, uploadedFiles, electionData, selectedParentCode },
		},
	} = useGlobalContext();
	// const geoZoneProps = getZoneProps(states)
	const data: ICreatePUResult = {
		accreditedVoters: resultSummary.DataAccreditedVoters,
		ballotPapersIssuedToPoolingUnit: resultSummary.DataBallotPapersIssuedToPoolingUnit,
		totalUsedBallotPapers: resultSummary.DataTotalUsedBallotPapers,
		totalValidVotes: resultSummary.DataTotalValidVotes,
		unusedBallotPapers: resultSummary.DataUnusedBallotPapers,
		votersOnRegister: resultSummary.DataVotersOnRegister,
		rejectedBallot: resultSummary.DataRejectedBallot,
		documentUrls: uploadedFiles,
		results: results.map((i) => ({
			partyId: i.partyId,
			partyName: i.partyName,
			votes: i.votes,
		})),
		createdBy: {
			id: parseInt(getUserData().user?.UserId || ''),
			name: getUserData().user?.FullName || '',
		},
		election: {
			id: electionData?.data?.election?.id || 0,
			name: electionData?.data?.election?.name || '',
		},
		poolingUnitCode: selectedParentCode?.code,
		presidingOfficer: {
			id: getUserData().user?.UserId || '',
			name: getUserData().user?.FullName || '',
		},
		flags: [],
	};
	return {
		data,
	};
};

export interface IUseCodeProps {
	handleCodes: () => void;
	load: boolean;
}

export const useGetCodes = ({
	actions,
	states,
	global,
}: {
	actions: IActions | undefined;
	states: IStates | undefined;
	global: IUSH<IComponentState>;
}): IUseCodeProps => {
	const {
		updateState,
		state: { childCodes, selectedParentCode, resultType, partyVotes },
	} = global;

	const getPartyVotes = (id: number, parties: IPartyStates): IPartyVotes => {
		const pv = partyVotes.filter((i) => i.id === id)[0];
		if (!pv)
			return {
				id: selectedParentCode.codeId,
				votes: parties.data.map((vote) => ({
					partyId: vote.id,
					votes: 0,
					label: vote.shortName,
					logo: vote.logo,
				})),
			};
		return pv;
	};

	type ccDataType = IPollingUnitInWardsState | IWardInLGAState | ILGAInState;

	const getChildCodes = (data: ccDataType, code: string, parent: number): IChildCode => {
		const cc = childCodes.filter((i) => i.codeId === data.id)[0];
		if (!cc)
			return {
				code,
				parent,
				codeId: data.id,
				name: data.name,
				status: false,
			};
		return cc;
	};

	const handleDetail = () => {
		const id = [selectedParentCode.codeId];

		if (resultType === 'EC8A') {
			actions?.get_PoolingUnitByCode({
				poolingUnitCode: selectedParentCode?.code,
				onSuccess: (res) => {
					actions?.get_LGAById({
						id: res.data?.[0]?.ward?.lgaId + '',
					});
					actions?.get_Party({
						onSuccess: (parties) => {
							updateState('partyVotes', [
								{
									...getPartyVotes(selectedParentCode.codeId, parties),
								},
							]);
						},
					});
				},
			});
		}
		if (resultType === 'EC8B') {
			actions?.get_PoolingUnitInWard({
				data: {
					wardIds: id,
				},
				onSuccess: (res) => {
					if (!childCodes.length || childCodes.length !== res.data.length) {
						updateState(
							'childCodes',
							res.data.map((i) => ({
								// code: i.poolingUnitCode,
								// parent: i.wardId,
								// codeId: i.id,
								// name: i.name,
								// status: false
								...getChildCodes(i, i.poolingUnitCode, i.wardId),
							}))
						);
						actions?.get_Party({
							onSuccess: (parties) => {
								updateState(
									'partyVotes',
									res.data.map((i) => ({
										// id: i.id,
										// votes: parties.data.map((vote) => ({
										//   partyId: vote.id,
										//   votes: 0,
										//   label: vote.shortName,
										//   logo: vote.logo
										// }))
										...getPartyVotes(i.id, parties),
									}))
								);
							},
						});
					}
				},
			});
		}
		if (resultType === 'EC8C') {
			actions?.get_WardInLGA({
				lgaIds: id,
				onSuccess: (res) => {
					if (!childCodes.length || childCodes.length !== res.data.length) {
						updateState(
							'childCodes',
							res.data.map((i) => ({
								// code: i.wardCode,
								// parent: i.lgaId,
								// name: i.name,
								// codeId: i.id,
								// status: false
								...getChildCodes(i, i.wardCode, i.lgaId),
							}))
						);
						actions?.get_Party({
							onSuccess: (parties) => {
								updateState(
									'partyVotes',
									res.data.map((i) => ({
										// id: i.id,
										// votes: parties.data.map((vote) => ({
										//   partyId: vote.id,
										//   votes: 0,
										//   label: vote.shortName,
										//   logo: vote.logo
										// }))
										...getPartyVotes(i.id, parties),
									}))
								);
							},
						});
					}
				},
			});
		}
		if (resultType === 'EC8D') {
			actions?.get_LGAInState({
				stateIds: id,
				onSuccess: (res) => {
					if (!childCodes.length || childCodes.length !== res.data.length) {
						updateState(
							'childCodes',
							res.data.map((i) => ({
								// code: i.lgaCode,
								// parent: i.stateId,
								// codeId: i.id,
								// name: i.name,
								// status: false
								...getChildCodes(i, i.lgaCode, i.stateId),
							}))
						);
						actions?.get_Party({
							onSuccess: (parties) => {
								updateState(
									'partyVotes',
									res.data.map((i) => ({
										// id: i.id,
										// votes: parties.data.map((vote) => ({
										//   partyId: vote.id,
										//   votes: 0,
										//   label: vote.shortName,
										//   logo: vote.logo
										// }))
										...getPartyVotes(i.id, parties),
									}))
								);
							},
						});
					}
				},
			});
		}
	};

	const handleCodes = () => {
		if (selectedParentCode) {
			handleDetail();
			actions?.get_Zone({});
			actions?.get_GeographicalZone({});
		}
	};

	return {
		handleCodes,
		load:
			states?._poolingUnit?.get_PoolingUnitByCodeLoading ||
			states?._ward?.get_WardByCodeLoading ||
			states?._poolingUnit?.get_PoolingUnitInWardLoading ||
			states?._ward?.get_WardInLGALoading ||
			states?._party?.get_PartyLoading ||
			states?._party?.get_PartyLoading ||
			states?._lga?.get_LGAInStateLoading ||
			false,
	};
};

export const defaultParentCode = {
	code: '',
	name: '',
	codeId: 0,
	status: false,
};

export const defaultChildCode = {
	code: '',
	name: '',
	codeId: 0,
	parent: 0,
	status: false,
};

export const defaultReportIssues = {
	userId: '',
	report: {
		title: '',
		body: '',
	},
	phoneNumber: '',
	email: '',
};

export const defaultElectionData = {
	isSuccessful: false,
	message: '',
	statusCode: 0,
	data: {
		election: {
			id: 0,
			isSpecialElection: false,
			name: '',
		},
		id: '',
		localGovernments: [],
		pollingUnits: [],
		states: [],
		user: {
			id: 0,
			name: '',
		},
		wards: [],
	},
};

export const initComponentState = {
	draftStatus: false,
	stage: 'Electoral Division',
	isPreview: false,
	partyVotes: [],
	resultSummary: defaultSummary,
	files: [],
	uploadedFiles: [],
	isUpdate: false,
	selectedParentCode: defaultParentCode,
	partyVoteStage: 'Party Votes',
	selectedChildCode: defaultChildCode,
	parentCodes: [],
	childCodes: [],
	reportIssues: defaultReportIssues,
	resultType: '',
	electionData: defaultElectionData,
	load: false,
	onExtract: false,
} as IComponentState;

interface IDraft {
	id: string;
	data: IComponentState;
}

export const useAppData = (
	actions: IActions | undefined,
	states: IStates | undefined
): {
	global: IUSH<IComponentState>;
	saveAsDraft: () => void;
	restoreDraft: (id: string) => void;
	clearDraft: (id: string) => void;
	clearDraftLocal: () => void;
	isDraft: (code: string) => boolean;
} => {
	const global = useStateHook<IComponentState>(initComponentState);

	const id = global.state.selectedParentCode?.code;

	const DRAFTID = 'APP_DRAFT';

	const getDrafts = () => {
		const draft = localStorage.getItem(DRAFTID) ?? states?._draft?.get_Draft?.data?.[0]?.token;
		const parsedDraft = draft ? (JSON.parse(draft) as IDraft[]) : [];
		return parsedDraft;
	};

	const getToken = () => {
		const currentDrafts = getDrafts() || [];
		if (!id) return null;
		let newDraft: IDraft[] = [];
		if (!currentDrafts?.map((i) => i.id).includes(id)) {
			newDraft = [...currentDrafts, { id, data: { ...global.state } }];
		} else {
			newDraft = currentDrafts.map((i) => ({
				...i,
				data: i.id === id ? { ...global.state } : i.data,
			}));
		}
		return JSON.stringify(newDraft);
	};

	const createUpdateDraft = (token: string) => {
		actions?.create_Draft({
			data: {
				token,
				userId: parseInt(getUserData().user?.UserId || ''),
				referenceId: getUserData().user?.UserId || '',
				id: getUserData().user?.UserId || '',
			},
			onSuccess: () => {
				global.updateState('draftStatus', false);
				localStorage.setItem(DRAFTID, token);
			},
			onFailure: () => {
				global.updateState('draftStatus', false);
				localStorage.setItem(DRAFTID, token);
			},
		});
	};

	const deleteDraft = () => {
		actions?.delete_Draft({
			id: states?._draft?.get_Draft?.data?.[0]?.id || '',
			onSuccess: () => {
				global.updateState('draftStatus', false);
				localStorage.removeItem(DRAFTID);
			},
			onFailure: () => {
				global.updateState('draftStatus', false);
			},
		});
	};

	const saveAsDraft = () => {
		global.updateState('draftStatus', true);
		const token = getToken();
		if (!token) {
			global.updateState('draftStatus', false);
		} else {
			createUpdateDraft(token);
		}
	};

	const updateStateWithDraft = (draft: IComponentState) => {
		// resultType: '',
		// electionData: defaultElectionData,
		// load: false
		const {
			state: {
				childCodes,
				draftStatus,
				files,
				isPreview,
				isUpdate,
				parentCodes,
				partyVoteStage,
				partyVotes,
				resultSummary,
				selectedChildCode,
				selectedParentCode,
				stage,
				uploadedFiles,
				reportIssues,
			},
		} = global;
		global.updateState('reportIssues', draft.reportIssues || reportIssues);
		global.updateState('childCodes', draft.childCodes || childCodes);
		global.updateState('parentCodes', draft.parentCodes || parentCodes);
		global.updateState('draftStatus', draft.draftStatus || draftStatus);
		global.updateState('partyVotes', draft.partyVotes || partyVotes);
		global.updateState('selectedChildCode', draft.selectedChildCode || selectedChildCode);
		global.updateState('stage', draft.stage || stage);
		global.updateState('isPreview', draft.isPreview || isPreview);
		global.updateState('resultSummary', draft.resultSummary || resultSummary);
		global.updateState('files', draft.files || files);
		global.updateState('uploadedFiles', draft.uploadedFiles || uploadedFiles);
		global.updateState('isUpdate', draft.isUpdate || isUpdate);
		global.updateState('selectedParentCode', draft.selectedParentCode || selectedParentCode || defaultParentCode);
		global.updateState('partyVoteStage', draft.partyVoteStage || partyVoteStage);
	};

	const isDraft = (id: string) =>
		getDrafts()
			.map((i) => i.id)
			.includes(id) || false;

	const restoreDraft = (id: string) => {
		const drafts = getDrafts();
		localStorage.setItem(DRAFTID, JSON.stringify(drafts));
		const draft: IDraft = drafts.filter((i) => i.id === id)?.[0];
		if (draft?.data) {
			updateStateWithDraft(draft.data);
		}
	};

	const clearDraftLocal = () => {
		localStorage.removeItem(DRAFTID);
	};

	const clearDraft = (id: string) => {
		global.updateState('draftStatus', true);
		const drafts = getDrafts();
		const filteredDraft = drafts.filter((i) => i.id !== id);
		if (!filteredDraft.length) {
			deleteDraft();
		} else {
			const token = JSON.stringify(filteredDraft);
			createUpdateDraft(token);
		}
	};

	return {
		global,
		saveAsDraft,
		restoreDraft,
		clearDraft,
		clearDraftLocal,
		isDraft,
	};
};
