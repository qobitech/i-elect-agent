interface IPropActions {
	dataAction: string;
	dataLoading: string;
	dataError: string;
}

export const generateActionTypes = <K extends string>(action: K[]): Record<K, IPropActions> =>
	action.reduce(
		(acc, i) => {
			acc[i] = {
				dataAction: i,
				dataLoading: i + 'Loading',
				dataError: i + 'Error',
			};
			return acc;
		},
		{} as Record<K, IPropActions>
	);

export const globalType = generateActionTypes(['notificationGlobal', 'sessionTimeoutGlobal']);
export const authType = generateActionTypes([
	'login_Auth',
	'register_Auth',
	'userFacingLogin_Auth',
	'otpLogin_Auth',
	'update_Auth',
	'changePassword_Auth',
	'activityData_Auth',
	'logout_Auth',
]);
export const zoneType = generateActionTypes([
	'create_Zone',
	'get_Zone',
	'get_ZoneById',
	'get_ZoneByName',
	'update_Zone',
	'delete_Zone',
]);
export const countryStateType = generateActionTypes([
	'create_CountryState',
	'get_CountryState',
	'getWardsIn_CountryState',
	'get_CountryStateByID',
	'get_CountryStateByName',
	'update_CountryState',
	'delete_CountryState',
]);
export const lgaType = generateActionTypes([
	'getAll_LGA',
	'get_LGAById',
	'create_LGA',
	'update_LGA',
	'delete_LGA',
	'get_LGAByName',
	'get_LGAInState',
	'get_LGAByCode',
]);

export const electionType = generateActionTypes([
	'create_Election',
	'get_ElectionByID',
	'get_Elections',
	'getCustom_ElectionData',
	'get_ElectionName',
	'get_ElectionByName',
	'update_Election',
	'delete_Election',
	'create_ElectionCycle',
	'get_ElectionCycle',
	'get_ElectionCycleByID',
	'get_ElectionCycleName',
	'update_ElectionCycle',
	'delete_ElectionCycle',
	'create_ElectionType',
	'get_ElectionType',
	'get_ElectionTypeByID',
	'update_ElectionTypeByID',
	'delete_ElectionTypeByID',
	'create_ElectionOfficial',
	'get_ElectionOfficial',
]);

export const electiveCategoryType = generateActionTypes([
	'create_ElectiveCategory',
	'get_ElectiveCategory',
	'get_ElectiveCategoryByID',
	'get_ElectiveCategoryName',
	'update_ElectiveCategory',
	'delete_ElectiveCategory',
]);

export const constituencyType = generateActionTypes([
	'create_Constituency',
	'get_Constituency',
	'get_ConstituencyByID',
	'get_ConstituencyName',
	'update_Constituency',
	'delete_Constituency',
	'create_ConstituencyLGA',
	'get_ConstituencyLGA',
	'getLGAIn_Constituency',
	'create_ConstituencyWard',
	'get_ConstituencyWard',
	'get_ConstituencyWardByID',
	'update_ConstituencyWard',
	'getWardsIn_Constituency',
	'get_ConstituencyByStateID',
]);

export const actionType = generateActionTypes([
	'create_Action',
	'get_Action',
	'update_Action',
	'get_ActionByID',
	'unassign_ActionMultipleForRoles',
	'get_ActionsForRole',
	'create_ActionRole',
	'get_ActionRole',
	'delete_ActionRole',
	'get_ActionsForRoleByID',
	'delete_Action',
	'assignMultipleAction_Role',
	'unassignMultipleAction_Role',
]);

export const candidateType = generateActionTypes([
	'create_Candidate',
	'get_Candidate',
	'get_CandidateByID',
	'get_CandidateByName',
	'update_Candidate',
	'delete_Candidate',
]);

export const volunteerType = generateActionTypes(['create_Volunteer', 'verify_Volunteer_Onboarding', 'onboard_Volunteer']);

export const collationOfficerType = generateActionTypes([
	'create_CollationOfficer',
	'get_CollationOfficer',
	'get_CollationOfficerByID',
	'update_CollationOfficer',
	'delete_CollationOfficer',
]);

export const draftType = generateActionTypes(['create_Draft', 'get_DraftByID', 'get_Draft', 'delete_Draft']);

export const wardType = generateActionTypes([
	'create_Ward',
	'get_Ward',
	'get_WardByID',
	'get_WardByCode',
	'get_WardInLGA',
	'update_Ward',
	'delete_Ward',
]);

export const reportType = generateActionTypes([
	'create_Report',
	'get_Report',
	'get_ReportByID',
	'get_ReportMarkedAsResolved',
	'update_ReportByID',
]);

export const userType = generateActionTypes([
	'get_User',
	'get_UserByEmail',
	'get_UserByPhoneNumber',
	'get_UserRoles',
	'delete_User',
	'add_UserToRole',
	'remove_UserFromRole',
]);

export const roleType = generateActionTypes([
	'get_Role',
	'create_Role',
	'delete_Role',
	'getUserIn_Role',
	'get_RoleByName',
	'update_Role',
	'assignMultipleAction_Role',
	'unassignMultipleAction_Role',
]);

export const presidingOfficerType = generateActionTypes([
	'create_PresidingOfficer',
	'get_PresidingOfficer',
	'get_PresidingOfficerPollingUnit',
	'get_PresidingOfficerByID',
	'update_PresidingOfficer',
	'delete_PresidingOfficer',
]);

export const poolingUnitType = generateActionTypes([
	'create_PoolingUnit',
	'get_PoolingUnit',
	'get_PoolingUnitByID',
	'get_PoolingUnitByName',
	'get_PoolingUnitByCode',
	'update_PoolingUnit',
	'get_PoolingUnitPresidingOfficer',
	'get_PoolingUnitInWard',
	'delete_PoolingUnit',
]);

export const partyType = generateActionTypes([
	'create_Party',
	'get_Party',
	'get_PartyByID',
	'get_PartyByName',
	'update_Party',
	'delete_Party',
]);

export const geozoneType = generateActionTypes([
	'create_GeographicalZone',
	'get_GeographicalZone',
	'get_GeographicalZoneByID',
	'get_GeographicalZoneByName',
	'update_GeographicalZone',
	'delete_GeographicalZone',
]);

export const resultType = generateActionTypes([
	'create_Result',
	'get_Result',
	'upload_Result',
	'push_ResultData',
	'push_ResultDataModel',
	'seed_Results',
	'update_ResultStatus',
	'update_ResultData',
	'extract_ResultFile',
	'extract_ResultUrl',
]);

export const irevType = generateActionTypes([
	'push_IRevDataModel',
	'push_IRevWardDataModel',
	'get_IRevWardDataModel',
	'get_IRevStateDataModel',
	'get_IRevLGADataModel',
	'upload_IRevResult',
	'push_IRevLGADataModel',
	'push_IRevStateDataModel',
	'push_IRevPollingUnitDataModel',
	'approve_IRevWardDataModel',
	'addNotes_IRevWardDataModel',
	'delete_IRevWardDataModel',
	'addFlag_IRevWardDataModel',
	'push_IRevPollingUnitDataExcelResult',
	'addFlag_IRevPollingUnitDataModel',
	'addNote_IRevPollingUnitDataModel',
	'addNote_IRevWardDataModel',
	'addFlag_IRevLGADataModel',
	'addNote_IRevLGADataModel',
	'addNote_IRevStateDataModel',
	'addFlag_IRevStateDataModel',
	'deleteRequest_IRevPollingUnitDataModel',
	'approveDeleteRequest_IRevPollingUnitDataModel',
	'approveDeleteRequest_IRevWardDataModel',
	'deleteRequest_IRevWardDataModel',
	'approveDeleteRequest_IRevLGADataModel',
	'deleteRequest_IRevLGADataModel',
	'deleteRequest_IRevStateDataModel',
	'approveDeleteRequest_IRevStateDataModel',
	'get_IRevStateElectionDownloadRequest',
	'get_IRevLGAElectionDownloadRequest',
	'get_IRevWardElectionDownloadRequest',
	'get_IRevPollingUnitElectionDownloadRequest',
	'get_IRevPollingUnitDataModel',
]);

export const searchType = generateActionTypes(['get_SearchElection']);
