import { createContext, useContext } from 'react';

import type { IComponentState } from '../components/layout/component-state';
import type { IUSH } from '../components/layout/state-hook';
import { initComponentState, type IUseCodeProps } from '../components/pages/upload-result/hooks';
import type { ursType } from '../components/pages/upload-result/utils';
import type { ICopyProps } from '../components/utils/hooks';
import type { IRightSection } from '../components/utils/right-section';
import type { IActions } from '../interface/IAction';
import type { IStates } from '../interface/IReducer';

export type themeType = 'dark' | 'light';

export interface IGlobalContext {
	rsProps?: IRightSection<{}>;
	copyProps?: ICopyProps;
	states?: IStates;
	actions?: IActions;
	global: IUSH<IComponentState>;
	saveAsDraft: () => void;
	restoreDraft: (id: string) => void;
	clearDraft: (id: string) => void;
	clearDraftLocal: () => void;
	isDraft: (code: string) => boolean;
	onStage: (stage: ursType) => void;
	getCodeProps: IUseCodeProps;
}

export const GlobalContext = createContext<IGlobalContext>({
	global: {
		state: initComponentState,
		updateState: () => {},
		clearState: () => {},
		clearAll: () => {},
	},
	saveAsDraft: () => {},
	restoreDraft: () => {},
	clearDraft: () => {},
	clearDraftLocal: () => {},
	isDraft: () => false,
	onStage: () => {},
	getCodeProps: {
		// childCodes: [],
		// clearCodes: () => {},
		handleCodes: () => {},
		load: false,
		// parentCodes: []
	},
});

export const useGlobalContext = (): IGlobalContext => {
	const globalContext = useContext(GlobalContext);

	return {
		...globalContext,
	};
};
