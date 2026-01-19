import type { GenerateReducerTypes } from '../IReducer';

export type ICandidateReducer = GenerateReducerTypes<'create_Candidate', any> &
	GenerateReducerTypes<'get_Candidate', any> &
	GenerateReducerTypes<'get_CandidateByID', any> &
	GenerateReducerTypes<'get_CandidateByName', any> &
	GenerateReducerTypes<'update_Candidate', any> &
	GenerateReducerTypes<'delete_Candidate', any>;
