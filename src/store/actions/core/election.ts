import type {
	ICreateElectionCycleState,
	ICreateElectionState,
	IElectionOfficialByQuery,
	IElectionOfficialsByQuery,
	IElectionStates,
	IGetElectionByID,
	IGetElectionOfficial,
} from '../../../interface/state/IElectionState';
import { electionType } from '../../types';
import * as utils from '../utils';

export interface IResponse<T = undefined> {
	onSuccess?: (res: T) => void;
	onFailure?: (err: any) => void;
}

export interface IQuery {
	key: string;
	value: any;
}

export interface IGetQuery<T = undefined> extends IResponse<T> {
	query?: IQuery[];
	paged?: boolean;
}

const handleQuery = (type: 'command' | 'core', paged?: boolean, ...query: IQuery[]) => {
	const pgType = type === 'command' ? 'get-all-paged' : 'paged';
	const pg = paged ? `/${pgType}` : '';
	if (!query?.length) return pg;
	const filteredQuery = query.filter((i) => i.key && i.value);
	const queries = filteredQuery.reduce((t, i, index) => {
		const andSign = index === filteredQuery.length - 1 ? '' : '&';
		t += `${i.key}=${i.value}${andSign}`;
		return t;
	}, '');
	if (!queries) return pg;
	return `${pg}?` + queries;
};

export const getQuery = (paged?: boolean, ...query: IQuery[]) => {
	const q = handleQuery('core', paged, ...query);
	return q || '';
};

export const getCommandQuery = (paged?: boolean, ...query: IQuery[]) => {
	const q = handleQuery('command', paged, ...query);
	return q || '';
};

interface ICreateElectionPollingUnit {
	id: number;
	name: string;
	code: string;
	ward: {
		id: number;
		code: string;
		name: string;
	};
	localGovernment: {
		id: number;
		name: string;
		code: string;
	};
	state: {
		id: number;
		name: string;
	};
}

export interface ICreateElection {
	name: string;
	electionCycleId: number;
	constituencyId: number;
	description: string;
	isForAllPollingUnits: boolean;
	poolingUnits: ICreateElectionPollingUnit[];
	wardCount: number;
	localGovernmentCount: number;
}

export const create_Election = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<ICreateElectionState> & {
	data: ICreateElection;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Election',
			header: utils.header(),
			data,
		},
		actionType: electionType.create_Election,
		onSuccess,
		onFailure,
	});

export const get_ElectionByID = ({ onFailure, onSuccess, id }: IResponse<IGetElectionByID> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Election/${id}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionByID,
		onSuccess,
		onFailure,
	});

export const get_Elections = ({ onFailure, onSuccess, query, paged }: IGetQuery<IElectionStates>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Election${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electionType.get_Elections,
		onSuccess,
		onFailure,
	});

export const getCustom_ElectionData = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Election/ReturnCustumlectionData${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electionType.getCustom_ElectionData,
		onSuccess,
		onFailure,
	});

export const get_ElectionName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Election/name',
			header: utils.header(),
			data: { name },
		},
		actionType: electionType.get_ElectionName,
		onSuccess,
		onFailure,
	});

export const get_ElectionByName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Election/getElectionsByName',
			header: utils.header(),
			data: { electionNames: name },
		},
		actionType: electionType.get_ElectionByName,
		onSuccess,
		onFailure,
	});

export const update_Election = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		name: string;
		electionCycleId: number;
		constituencyId: number;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Election/update',
			header: utils.header(),
			data,
		},
		actionType: electionType.update_Election,
		onSuccess,
		onFailure,
	});

export const delete_Election = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/Election/delete${id}`,
			header: utils.header(),
		},
		actionType: electionType.delete_Election,
		onSuccess,
		onFailure,
	});

// election cycle

export interface ICreateElectionCycle {
	year: string;
	electionTypeId: number;
	name: string;
	startDate: string;
	endDate: string;
}

export const create_ElectionCycle = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<ICreateElectionCycleState> & {
	data: ICreateElectionCycle;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectionCycle',
			header: utils.header(),
			data,
		},
		actionType: electionType.create_ElectionCycle,
		onSuccess,
		onFailure,
	});

export const get_ElectionCycle = ({ onFailure, onSuccess, query, paged }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionCycle${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionCycle,
		onSuccess,
		onFailure,
	});

export const get_ElectionCycleByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionCycle/${id}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionCycleByID,
		onSuccess,
		onFailure,
	});

export const get_ElectionCycleName = ({ onFailure, onSuccess, name }: IResponse & { name: string }) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectionCycle/name',
			header: utils.header(),
			data: { name },
		},
		actionType: electionType.get_ElectionCycleName,
		onSuccess,
		onFailure,
	});

export const update_ElectionCycle = ({
	onFailure,
	onSuccess,
	data,
}: IResponse & {
	data: {
		id: number;
		name: string;
		schedule: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/Election/update',
			header: utils.header(),
			data,
		},
		actionType: electionType.update_ElectionCycle,
		onSuccess,
		onFailure,
	});

export const delete_ElectionCycle = ({
	onFailure,
	onSuccess,
	id,
}: IResponse & {
	id: string;
}) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionCycle/delete${id}`,
			header: utils.header(),
		},
		actionType: electionType.delete_ElectionCycle,
		onSuccess,
		onFailure,
	});

// type

export const create_ElectionType = ({
	data,
	onFailure,
	onSuccess,
}: IResponse<ICreateElectionState> & {
	data: {
		name: string;
	};
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectionType',
			header: utils.header(),
			data,
		},
		actionType: electionType.create_ElectionType,
		onSuccess,
		onFailure,
	});

export const get_ElectionType = ({ onFailure, onSuccess, paged, query }: IGetQuery) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionType${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionType,
		onSuccess,
		onFailure,
	});

export const get_ElectionTypeByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionType/${id}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionTypeByID,
		onSuccess,
		onFailure,
	});

export const update_ElectionTypeByID = ({ onFailure, onSuccess, id, name }: IResponse & { id: string; name: string }) =>
	utils.httpPutMethod({
		apiData: {
			url: `/api/v1/ElectionType/${id}`,
			header: utils.header(),
			data: { name },
		},
		actionType: electionType.update_ElectionTypeByID,
		onSuccess,
		onFailure,
	});

export const delete_ElectionTypeByID = ({ onFailure, onSuccess, id }: IResponse & { id: string }) =>
	utils.httpDeleteMethod({
		apiData: {
			url: `/api/v1/ElectionType/${id}`,
			header: utils.header(),
		},
		actionType: electionType.delete_ElectionTypeByID,
		onSuccess,
		onFailure,
	});

export interface ICreateElectionOfficial {
	userId: number;
	electionId: number;
	lgaCode: string[];
	pollingUnitCode: string[];
	wardCode: string[];
	stateCode: string[];
}

export const create_ElectionOfficial = ({
	data,
	onFailure,
	onSuccess,
}: IResponse & {
	data: ICreateElectionOfficial;
}) =>
	utils.httpPostMethod({
		apiData: {
			url: '/api/v1/ElectionOfficial',
			header: utils.header(),
			data,
		},
		actionType: electionType.create_ElectionOfficial,
		onSuccess,
		onFailure,
	});

export const get_ElectionOfficial = ({ onFailure, onSuccess, paged, query }: IGetQuery<IElectionOfficialsByQuery>) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionOfficial${getQuery(paged, ...(query || []))}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionOfficial,
		onSuccess,
		onFailure,
	});

export const get_ElectionOfficialById = ({ onFailure, onSuccess, id }: IResponse<IGetElectionOfficial> & { id: string }) =>
	utils.httpGetMethod({
		apiData: {
			url: `/api/v1/ElectionOfficial/${id}`,
			header: utils.header(),
		},
		actionType: electionType.get_ElectionOfficialById,
		onSuccess,
		onFailure,
	});
