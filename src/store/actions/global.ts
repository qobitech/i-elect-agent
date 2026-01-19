import { globalType } from '../types';
import * as utils from './utils';

export const clearAction = (type: string) => utils.clearHttp(type);

export const notificationGlobal = (notice: string, status: boolean) => (dispatch: any) => {
	dispatch({
		type: globalType.notificationGlobal.dataAction,
		payload: { notice, status },
	});
};

export const sessionTimeoutGlobal = (status: boolean) => (dispatch: any) => {
	dispatch({
		type: globalType.sessionTimeoutGlobal.dataAction,
		payload: { status },
	});
};
