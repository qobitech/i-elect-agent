import type { GenerateReducerTypes } from '../IReducer';
import type { IIRevResultStates, IUploadIrevState } from '../state/IRev';

export type IIrevReducer = GenerateReducerTypes<'push_IRevDataModel', any> &
	GenerateReducerTypes<'push_IRevWardDataModel', any> &
	GenerateReducerTypes<'get_IRevWardDataModel', IIRevResultStates> &
	GenerateReducerTypes<'get_IRevStateDataModel', IIRevResultStates> &
	GenerateReducerTypes<'get_IRevLGADataModel', IIRevResultStates> &
	GenerateReducerTypes<'upload_IRevResult', IUploadIrevState> &
	GenerateReducerTypes<'push_IRevLGADataModel', any> &
	GenerateReducerTypes<'push_IRevStateDataModel', any> &
	GenerateReducerTypes<'push_IRevPollingUnitDataModel', any> &
	GenerateReducerTypes<'delete_IRevWardDataModel', any> &
	GenerateReducerTypes<'approve_IRevWardDataModel', any> &
	GenerateReducerTypes<'addNotes_IRevWardDataModel', any> &
	GenerateReducerTypes<'push_IRevPollingUnitDataExcelResult', any> &
	GenerateReducerTypes<'addNote_IRevPollingUnitDataModel', any> &
	GenerateReducerTypes<'addFlag_IRevPollingUnitDataModel', any> &
	GenerateReducerTypes<'addNote_IRevWardDataModel', any> &
	GenerateReducerTypes<'addFlag_IRevWardDataModel', any> &
	GenerateReducerTypes<'addNote_IRevLGADataModel', any> &
	GenerateReducerTypes<'addFlag_IRevLGADataModel', any> &
	GenerateReducerTypes<'addNote_IRevStateDataModel', any> &
	GenerateReducerTypes<'addFlag_IRevStateDataModel', any> &
	GenerateReducerTypes<'deleteRequest_IRevPollingUnitDataModel', any> &
	GenerateReducerTypes<'approveDeleteRequest_IRevPollingUnitDataModel', any> &
	GenerateReducerTypes<'deleteRequest_IRevWardDataModel', any> &
	GenerateReducerTypes<'approveDeleteRequest_IRevWardDataModel', any> &
	GenerateReducerTypes<'deleteRequest_IRevLGADataModel', any> &
	GenerateReducerTypes<'approveDeleteRequest_IRevLGADataModel', any> &
	GenerateReducerTypes<'deleteRequest_IRevStateDataModel', any> &
	GenerateReducerTypes<'approveDeleteRequest_IRevStateDataModel', any> &
	GenerateReducerTypes<'get_IRevPollingUnitDataModel', IIRevResultStates>;
