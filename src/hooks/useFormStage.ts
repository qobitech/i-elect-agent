import { useCallback, useRef, useState } from 'react';

interface IUseFormStage<T extends string> {
	stage: T;
	navigator: {
		next: () => void;
		prev: () => void;
		reset: () => void;
		goTo: (i: number | T) => () => void;
		historyBack: () => void;
		historyForward: () => void;
	};
	isStageInactive: (stageArg: T) => boolean;
	isStageActive: (stageArg: T) => boolean;
	stageTitle: string | Record<T, string>[T];
	history: T[];
}

export const useFormStage = <T extends string>(initStage: T, stages: T[], stageTitles?: Record<T, string>): IUseFormStage<T> => {
	const [stage, setStage] = useState<T>(initStage);
	const indexRef = useRef(stages.includes(initStage) ? stages.indexOf(initStage) : 0);

	const [history, setHistory] = useState<T[]>([initStage]);
	const historyIndexRef = useRef(0);

	const get = useCallback(() => stages[indexRef.current], [stages]);

	const pushHistory = (newStage: T) => {
		setHistory((prev) => {
			const nextHistory = prev.slice(0, historyIndexRef.current + 1);

			if (!nextHistory.includes(newStage)) {
				nextHistory.push(newStage);
				historyIndexRef.current = nextHistory.length - 1;
			}

			return nextHistory;
		});

		setStage(newStage);
	};

	const navigator = {
		next: () => {
			if (indexRef.current < stages.length - 1) indexRef.current += 1;
			const val = get();
			pushHistory(val);
			return val;
		},
		prev: () => {
			if (indexRef.current > 0) indexRef.current -= 1;
			const val = get();
			pushHistory(val);
			return val;
		},
		reset: () => {
			indexRef.current = 0;
			setHistory([]);
		},
		goTo: (i: number | T) => () => {
			if (typeof i === 'number' && i >= 0 && i < stages.length) {
				indexRef.current = i;
			} else if (typeof i === 'string') {
				const idx = stages.indexOf(i);
				if (idx >= 0) indexRef.current = idx;
			}
			const val = get();
			pushHistory(val);
			return val;
		},
		historyBack: () => {
			setHistory((prev) => {
				if (prev.length > 1) {
					const nextHistory = prev.slice(0, -1);
					const prevStage = nextHistory[nextHistory.length - 1];
					historyIndexRef.current = nextHistory.length - 1;
					indexRef.current = stages.indexOf(prevStage);
					setStage(prevStage);
					return nextHistory;
				} else {
					return prev;
				}
			});
			return stage;
		},
		historyForward: () => {
			if (historyIndexRef.current < history.length - 1) {
				historyIndexRef.current += 1;
				const nextStage = history[historyIndexRef.current];
				setStage(nextStage);
				indexRef.current = stages.indexOf(nextStage);
				return nextStage;
			}
			return stage;
		},
	};

	const isStageInactive = (stageArg: T) => stage !== stageArg;
	const isStageActive = (stageArg: T) => stage === stageArg;
	const stageTitle = stageTitles?.[stage] ?? '';

	return {
		stage,
		navigator,
		isStageInactive,
		isStageActive,
		stageTitle,
		history,
	};
};
