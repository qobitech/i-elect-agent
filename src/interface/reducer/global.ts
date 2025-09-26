import type { INotifyUser } from '../../components/utils/toast';

export interface IGlobalReducer {
	notificationGlobal: INotifyUser;
	sessionTimeoutGlobal: { status: boolean };
}
