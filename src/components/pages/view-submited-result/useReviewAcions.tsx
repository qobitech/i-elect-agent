import type { UseFormReturn } from 'react-hook-form';

import { getUserData, type ResultType } from '../../../constants/global';
import { useGlobalContext } from '../../../context/global';
import type { IIRevResultState } from '../../../interface/state/IRev';
import { type IUSH } from '../../layout/state-hook';
import { type IEditElectionResultState, type IHF } from './helpers';

export interface IURAArgs {
	global: IUSH<IEditElectionResultState>;
	result: IIRevResultState;
	hookForm: UseFormReturn<IHF, any>;
	resultType: ResultType | null | undefined;
	onRefresh: () => void;
}

interface IURA {
	deleteResultRequest: () => void;
	// flagResult: (newFlag?: IResultFlag) => void
	approveDeleteResult: () => void;
	addNotes: () => void;
}

export const useReviewActions = ({ global, result, hookForm, resultType, onRefresh }: IURAArgs): IURA => {
	const { updateState, state } = global;
	const { comment } = state;
	const { actions } = useGlobalContext();

	const onSuccess = () => {
		updateState('loading', false);
		updateState('success', true);
		hookForm.reset();
		onRefresh();
	};

	const onFailure = () => {
		updateState('loading', false);
	};

	const addNotes = () => {
		updateState('error', '');

		if (!comment) {
			updateState('error', 'Please add note');
			return;
		}

		const performAction = () => {
			if (resultType === 'EC8A') {
				return actions?.addNote_IRevPollingUnitDataModel;
			}
			if (resultType === 'EC8B') {
				return actions?.addNote_IRevWardDataModel;
			}
			if (resultType === 'EC8C') {
				return actions?.addNote_IRevLGADataModel;
			}
			if (resultType === 'EC8D') {
				return actions?.addNote_IRevStateDataModel;
			}
			return undefined;
		};

		updateState('loading', true);

		performAction()?.({
			data: {
				id: result.id,
				appUser: {
					id: parseInt(getUserData()?.user?.UserId || ''),
					name: `${getUserData()?.user?.FullName}`,
				},
				notes: [
					{
						message: comment,
						createdAt: new Date().toISOString(),
						createdBy: {
							id: parseInt(getUserData()?.user?.UserId || ''),
							name: getUserData()?.user?.FullName || '',
						},
					},
				],
			},
			onSuccess,
			onFailure,
		});
	};

	// const flagResult = (newFlag?: IResultFlag) => {
	//   updateState('error', '')
	//   const allFlags: IHF = hookForm.watch("")

	//   if (!allFlags && !newFlag) {
	//     updateState('error', 'Please select flags')
	//     return
	//   }

	//   const allFlagReq = Object.keys(allFlags).reduce<string[]>((t, i) => {
	//     if (allFlags[i as any]) t.push(i)
	//     return t
	//   }, [])
	//   const newFlagReq = newFlag
	//     ? Object.keys(newFlag).reduce<string[]>((t, i) => {
	//         if (allFlags[i as keyof IHF]) t.push(i)
	//         return t
	//       }, [])
	//     : []

	//   const flags = newFlag ? newFlagReq : allFlagReq

	//   if (!flags.length) {
	//     updateState('error', 'please select at least one')
	//     return
	//   }

	//   const performAction = () => {
	//     if (resultType === 'EC8A') {
	//       return actions?.addFlag_IRevPollingUnitDataModel
	//     }
	//     if (resultType === 'EC8B') {
	//       return actions?.addFlag_IRevWardDataModel
	//     }
	//     if (resultType === 'EC8C') {
	//       return actions?.addFlag_IRevLGADataModel
	//     }
	//     if (resultType === 'EC8D') {
	//       return actions?.addFlag_IRevStateDataModel
	//     }
	//   }

	//   updateState('loading', true)

	//   performAction()?.({
	//     data: {
	//       appUser: {
	//         id: parseInt(getUserData()?.user?.UserId || ''),
	//         name: getUserData()?.user?.FullName + ''
	//       },
	//       flags,
	//       id: result.id
	//     },
	//     onSuccess,
	//     onFailure
	//   })
	// }

	const approveDeleteResult = () => {
		updateState('loading', true);

		const performAction = () => {
			if (resultType === 'EC8A') {
				return actions?.approveDeleteRequest_IRevPollingUnitDataModel;
			}
			if (resultType === 'EC8B') {
				return actions?.approveDeleteRequest_IRevWardDataModel;
			}
			if (resultType === 'EC8C') {
				return actions?.approveDeleteRequest_IRevLGADataModel;
			}
			if (resultType === 'EC8D') {
				return actions?.approveDeleteRequest_IRevStateDataModel;
			}
			return undefined;
		};

		performAction()?.({
			data: {
				approvedBy: {
					id: parseInt(getUserData()?.user?.UserId || ''),
					name: `${getUserData()?.user?.FullName}`,
				},
				id: result.id,
				isApproved: true,
			},
			onSuccess,
			onFailure,
		});
	};

	const deleteResultRequest = () => {
		updateState('loading', true);

		const performAction = () => {
			if (resultType === 'EC8A') {
				return actions?.deleteRequest_IRevPollingUnitDataModel;
			}
			if (resultType === 'EC8B') {
				return actions?.deleteRequest_IRevWardDataModel;
			}
			if (resultType === 'EC8C') {
				return actions?.deleteRequest_IRevLGADataModel;
			}
			if (resultType === 'EC8D') {
				return actions?.deleteRequest_IRevStateDataModel;
			}
			return undefined;
		};

		// performAction()?.({
		// 	data: {
		// 		id: result.id,
		// 		approvedBy: {
		// 			id: parseInt(getUserData()?.user?.UserId || ''),
		// 			name: `${getUserData()?.user?.FullName}`,
		// 		},
		// 		isApproved: true,
		// 	},
		// 	onSuccess,
		// 	onFailure,
		// });
	};

	return {
		deleteResultRequest,
		// flagResult,
		approveDeleteResult,
		addNotes,
	};
};
