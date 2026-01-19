import type { GenerateReducerTypes } from '../IReducer';
import type { ISearchElectionStates } from '../state/ISearch';

export type ISearchReducer = GenerateReducerTypes<'get_SearchElection', ISearchElectionStates>;
