import axios from 'axios';

import {
	COREAPI,
	encodeData,
	// encodeData,
	getUserData,
	ISADMINLOGGED,
	ISSESSION,
	onLogout,
} from '../../constants/global';
import { globalType } from '../types';

export const header = () => ({
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
	'Authorization': getUserData().token ? `Bearer ${getUserData().token}` : '',
	'PartyId': getUserData().user?.PartyId,
});

export const headerMultipart = () => ({
	Authorization: getUserData().token ? `Bearer ${getUserData().token}` : '',
});

let source: any;

const cancelRequest = () => {
	if (source) {
		source.cancel();
	}
	const CancelToken = axios.CancelToken;
	source = CancelToken.source();
};

const TIMEOUT = 10000 * 30;

type I_API_REQUEST = (
	url: string | undefined,
	headers: Record<string, any>,
	data: any,
	method: 'get' | 'post' | 'put' | 'delete' | 'patch',
	timeout: number | null,
	validateStatus?: (status: number) => boolean,
	dispatch?: any,
	dataError?: string,
	onFailure?: (err: any) => void,
	dataLoading?: string,
	dataAction?: string,
	onSuccess?: (res: any) => void
) => Promise<any>;

const statusFunction = (onStatus?: (res: any) => void, res?: any) => {
	if (typeof onStatus === 'function') onStatus(res);
};

const apiRespond = (dispatch: any, type: any, payload: any, onStatus?: (res: any) => void) => {
	dispatch({ type, payload });
	statusFunction(onStatus, payload);
};

const apiRequest: I_API_REQUEST = async (
	url,
	headers,
	data,
	method,
	timeout,
	validateStatus,
	dispatch,
	dataError,
	onFailure,
	dataLoading,
	dataAction,
	onSuccess
) => {
	cancelRequest();
	try {
		if (!ISSESSION()) {
			// refresh token
			if (!ISADMINLOGGED()) {
				onLogout();
				window.location.reload();
			} else {
				await axios({
					url: `${COREAPI}/api/v1/Auth/extend-session`,
					method: 'post',
					timeout: timeout || 0,
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Authorization': getUserData().refreshToken ? `Bearer ${getUserData().refreshToken}` : '',
					},
				}).then((res) => {
					if (res.status >= 200 && res.status < 300) {
						encodeData(res.data?.data?.token, res.data?.data?.refreshToken);
					}
				});
			}
		} else {
			await axios({
				url,
				method,
				data: data || {},
				timeout: timeout || 0,
				validateStatus,
				headers,
			}).then((res) => {
				if (res.status >= 200 && res.status < 300) {
					apiRespond(dispatch, dataAction, res.data, onSuccess);
				} else {
					if (res.data.message) {
						apiRespond(
							dispatch,
							globalType.notificationGlobal.dataAction,
							{ notice: res.data.message, status: false },
							onFailure
						);
					} else {
						throw new Error(res.data.message);
					}
				}
			});
		}
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log('Request canceled', error.message);
		} else {
			apiRespond(
				dispatch,
				globalType.notificationGlobal.dataAction,
				{
					notice: 'Something went wrong',
					status: false,
				},
				onFailure
			);
		}
	} finally {
		dispatch({ type: dataLoading, payload: false });
	}
};

const apiAuthRequest: I_API_REQUEST = async (
	url,
	headers,
	data,
	method,
	timeout,
	validateStatus,
	dispatch,
	dataError,
	onFailure,
	dataLoading,
	dataAction,
	onSuccess
) => {
	cancelRequest();
	try {
		const res = await axios({
			url,
			method,
			data: data || {},
			timeout: timeout || 0,
			validateStatus,
			headers,
		});
		if (res.status >= 200 && res.status < 300) {
			apiRespond(dispatch, dataAction, res.data, onSuccess);
		} else {
			if (res.data.message) {
				apiRespond(dispatch, globalType.notificationGlobal.dataAction, { notice: res.data.message, status: false }, onFailure);
			} else {
				throw new Error(res.data.message);
			}
		}
	} catch (error) {
		if (axios.isCancel(error)) {
			console.log('Request canceled', error.message);
		} else {
			apiRespond(
				dispatch,
				globalType.notificationGlobal.dataAction,
				{
					notice: 'Something went wrong',
					status: false,
				},
				onFailure
			);
		}
	} finally {
		dispatch({ type: dataLoading, payload: false });
	}
};

export const getErrMsg = (error: any) => {
	if (error != null) {
		const { data } = error.response || {};
		if (typeof data === 'object') {
			const { message } = data || {};
			return message;
		}
		return data;
	}
	return '';
};

export interface I_ACTION_TYPE {
	dataLoading: string;
	dataAction: string;
	dataError: string;
}

interface I_HTTPMETHOD {
	apiData: {
		url: string;
		header: Record<string, any>;
		customurl?: string;
		data?: any;
	};
	actionType: I_ACTION_TYPE;
	onSuccess?: (res: any) => void;
	onFailure?: (err: any) => void;
	auth?: boolean;
}

export const httpGetMethod = ({
	apiData: { url, header, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
	auth,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		const req = auth ? apiAuthRequest : apiRequest;
		await req(
			requesturl,
			header,
			null,
			'get',
			null,
			() => true,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const httpPostMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
	auth,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		const req = auth ? apiAuthRequest : apiRequest;
		await req(
			requesturl,
			header,
			data,
			'post',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const httpUploadMediaMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
	auth,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		const req = auth ? apiAuthRequest : apiRequest;
		await req(
			requesturl,
			header,
			data,
			'post',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const httpPutVideoMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
	auth,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		const req = auth ? apiAuthRequest : apiRequest;
		await req(
			requesturl,
			header,
			data,
			'put',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const httpDeleteMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
	auth,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		const req = auth ? apiAuthRequest : apiRequest;
		await req(
			requesturl,
			header,
			data,
			'delete',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const clearHttp = (type: string) => (dispatch: any) => {
	dispatch({ type: type + 'Loading', payload: false });
	dispatch({ type, payload: [] });
	dispatch({ type: type + 'Error', payload: '' });
};

export const clearHttpByValue =
	({
		actionType: { dataLoading, dataAction, dataError },
		dataActionValue,
	}: {
		actionType: I_ACTION_TYPE;
		dataActionValue: any;
	}) =>
	(dispatch: any) => {
		dispatch({ type: dataLoading, payload: false });
		dispatch({ type: dataAction, payload: dataActionValue });
		dispatch({ type: dataError, payload: '' });
	};

export const httpPutMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		await apiRequest(
			requesturl,
			header,
			data,
			'put',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};

export const httpPatchMethod = ({
	apiData: { url, header, data, customurl },
	actionType: { dataLoading, dataAction, dataError },
	onSuccess,
	onFailure,
}: I_HTTPMETHOD) => {
	const requesturl = customurl != null ? customurl : COREAPI + '' + url;
	return async (dispatch: any) => {
		dispatch({ type: dataLoading, payload: true });
		await apiRequest(
			requesturl,
			header,
			data,
			'patch',
			TIMEOUT,
			undefined,
			dispatch,
			dataError,
			onFailure,
			dataLoading,
			dataAction,
			onSuccess
		);
	};
};
