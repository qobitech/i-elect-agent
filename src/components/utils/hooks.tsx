import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import queryString from 'query-string';
import type React from 'react';
import { type ReactNode, type RefObject, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
	type DefaultValues,
	type FieldValues,
	type Path,
	useForm,
	type UseFormReturn,
	type UseFormSetError,
	type UseFormSetValue,
} from 'react-hook-form';
import { useLocation } from 'react-router';
import * as yup from 'yup';

import { ISADMINLOGGED, ISSESSION, PRIMARY_COLOR_LIGHT } from '../../constants/global';
import { useGlobalContext } from '../../context/global';
import type { IStates } from '../../interface/IReducer';
import { TypeButton } from './button';
import { AlertSVG, CheckSVG, CopySVG, PulseSVG, RefreshSVG } from './svgs';

export const useLocationHook = () => {
	const location = useLocation();
	const { search } = location;
	const values = queryString.parse(search);
	const { p } = values || {};
	return [p];
};

export const useQueryValuesHook = () => {
	const location = useLocation();
	const { search } = location;
	const values = queryString.parse(search) as Record<string, string>;
	return values;
};

type dragType = React.DragEvent<HTMLInputElement>;

export const useUploadFileHook = <T extends HTMLElement, S extends FieldValues>(
	setError: UseFormSetError<S>,
	setValue: UseFormSetValue<S>,
	fileName: Path<S>,
	fileType: string,
	fileSize: number
): [
	onDragEnter: (e: dragType) => void,
	onDragLeave: (e: dragType) => void,
	onDrop: (e: dragType) => void,
	onFileChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
	imgRef: React.RefObject<T>,
	isFileAdd: boolean,
	addedFileName: string,
] => {
	const imgRef = useRef<T>(null);

	const [isFileAdd, setIsFileAdd] = useState<boolean>(false);
	const [addedFileName, setAddedFileName] = useState<string>('');

	const onDragEnter = (e: dragType) => {
		e.preventDefault();
		e.stopPropagation();
		if (imgRef.current) {
			imgRef.current.style.backgroundColor = PRIMARY_COLOR_LIGHT;
			setIsFileAdd(true);
		}
	};

	const onDragLeave = (e: dragType) => {
		e.preventDefault();
		e.stopPropagation();
		if (imgRef.current) {
			imgRef.current.style.backgroundColor = '#fff';
			setIsFileAdd(false);
		}
	};

	const onDrop = (e: dragType) => {
		const errorMessage = verifyInputFile(e?.dataTransfer?.files[0]);
		setError(fileName, { message: errorMessage });
		if (!errorMessage) setValue(fileName, e?.dataTransfer?.files[0] as any);
		if (imgRef.current) {
			imgRef.current.style.backgroundColor = '#fff';
			setIsFileAdd(false);
		}
	};

	const onFileChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = target;
		if (files) {
			const errorMessage = verifyInputFile(files[0]);
			setError(fileName, { message: errorMessage });
			if (!errorMessage) setValue(fileName, files[0] as any);
		}
	};

	const verifyInputFile = (file: File) => {
		const { type, size, name } = file;
		if (!type.includes(fileType)) {
			return `Must be ${fileType}`;
		}

		if (size > fileSize) {
			return 'File size not allowed';
		}
		setAddedFileName(name);
	};

	return [onDragEnter, onDragLeave, onDrop, onFileChange, imgRef, isFileAdd, addedFileName];
};

export const useFormHook = <T extends {}>(objSchema: {}, defaultValues?: DefaultValues<T>): [UseFormReturn<T, any>] => {
	const schema = yup.object().shape(objSchema);
	const formMethods = useForm<T>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues,
	});

	return [formMethods];
};

export const useToggler = (defaultCategory: string) => {
	const [category, setCategory] = useState<string>(defaultCategory);

	const handleCategory = (category: string) => {
		setCategory(category);
	};

	return { category, handleCategory };
};

export interface IModalProps {
	openModal: boolean;
	title: string;
	url: string;
	description: string;
	closeFunction: () => void;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setUrl: React.Dispatch<React.SetStateAction<string>>;
	medium: boolean;
	size?: 'medium' | 'wide';
}

export const useShare = () => {
	const [modal, setModal] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [url, setUrl] = useState<string>('');

	const modalProps: IModalProps = {
		openModal: modal,
		title,
		url,
		description,
		setDescription,
		setTitle,
		setUrl,
		closeFunction: () => {
			setModal(false);
		},
		setOpenModal: setModal,
		medium: true,
		size: 'medium',
	};
	return { modalProps };
};

export interface ICopyProps {
	copySuccess: boolean;
	copy: (text: string) => void;
	setAction: React.Dispatch<React.SetStateAction<string>>;
	action: string;
}

export const useCopy = (): ICopyProps => {
	const [copySuccess, setCopySuccess] = useState<boolean>(false);
	const [action, setAction] = useState<string>('');

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (copySuccess) {
			timer = setTimeout(() => {
				setCopySuccess(() => false);
				setAction('');
			}, 1500);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [copySuccess]);

	function copyToClipboard(text: string) {
		// Create a new ClipboardItem object with the text
		const clipboardItem = new ClipboardItem({
			'text/plain': new Blob([text], { type: 'text/plain' }),
		});

		// Use the Clipboard API to write the ClipboardItem to the clipboard
		navigator.clipboard.write([clipboardItem]).then(
			() => {
				setCopySuccess(true);
			},
			() => {
				setCopySuccess(false);
			}
		);
	}

	return {
		copySuccess,
		copy: copyToClipboard,
		setAction,
		action,
	};
};

export const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
	const [status, setStatus] = useState(false);

	useEffect(() => {
		if (!ref?.current) return;
		const isBackgroundImg = ref.current.style.backgroundImage.length !== 0;
		const updateStatus = (images: HTMLImageElement[]) => {
			setStatus(images.map((image) => image.complete).every((item) => item) && isBackgroundImg);
		};

		const imagesLoaded = Array.from(ref.current.querySelectorAll('img'));

		if (imagesLoaded.length === 0 && !isBackgroundImg) {
			setStatus(true);
			return;
		}

		imagesLoaded.forEach((image) => {
			image.addEventListener('load', () => updateStatus(imagesLoaded), {
				once: true,
			});
			image.addEventListener('error', () => updateStatus(imagesLoaded), {
				once: true,
			});
		});
	}, [ref]);

	return status;
};

export const reducer = <T extends {}, A extends keyof T>(state: T, action: { type: A; payload: any }) => {
	if (action.type in state) {
		if (state[action.type] === action.payload) return state;
		return { ...state, [action.type]: action.payload };
	}
	return state;
};

export const useStateHook = <T extends Record<string, any>, A extends keyof T>(
	initState: T
): [T, (type: A, payload: any) => void] => {
	const [state, dispatch] = useReducer(reducer<T, A>, initState);

	const updateState = (type: A, payload: any) => {
		dispatch({ type, payload });
	};

	return [state, updateState];
};

export const useInfiniteScroll = (load: boolean, hasmore: boolean, getData?: () => void): [elementRef: (node: any) => void] => {
	const observer = useRef<IntersectionObserver | null>(null);
	const elementRef = useCallback(
		(node: any) => {
			if (load) return;
			if (observer?.current) observer?.current?.disconnect?.();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasmore) {
					getData?.();
				}
			});
			if (node) observer?.current?.observe(node);
		},
		[load, getData, hasmore]
	);

	useEffect(
		() => () => {
			observer?.current?.disconnect();
		},
		[]
	);

	return [elementRef];
};

interface IHVC extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	view: boolean;
	children?: any;
	removeDOM?: boolean;
	load?: boolean;
	auth?: boolean;
	errorFallBack?: ReactNode;
}

export const Hvc: React.FC<IHVC> = ({ view, children, className, removeDOM, load, auth, errorFallBack, ...props }) => {
	if (load) return <PulseSVG />;

	if (removeDOM)
		return (
			<>
				{view && (
					<div
						className={`${className}`}
						{...props}
					>
						{children}
					</div>
				)}

				{!view && auth ? <AuthorizedPage /> : null}
			</>
		);

	return (
		<>
			<div
				className={`${view ? '' : 'd-none'} ${className}`}
				{...props}
			>
				{children}
			</div>
			{!view && errorFallBack}
		</>
	);
};

interface IHVCLoad extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	view?: boolean;
	children?: any;
	removeDOM?: boolean;
	load?: boolean;
	loadTxt?: string;
	onRefresh?: () => void;
}
export const HvcLoad: React.FC<IHVCLoad> = ({ view, children, className, removeDOM, load, loadTxt, onRefresh, ...props }) => {
	if (load)
		return (
			<div className='f-row-10 aic hw-mx'>
				<PulseSVG />
				{loadTxt ? <p className='m-0 text-little'>{loadTxt}</p> : null}
			</div>
		);

	if (removeDOM)
		return (
			<>
				{view ? (
					<div
						className={`${className}`}
						{...props}
					>
						{children}
					</div>
				) : null}
			</>
		);

	return (
		<>
			{onRefresh && (
				<div className='pb-2 f-row justify-content-end'>
					<RefreshComponent
						onRefresh={onRefresh}
						loadTxt={load ? 'Fetching data...' : 'Refresh'}
					/>
				</div>
			)}
			<div
				className={`${view ? '' : 'd-none'} ${className}`}
				{...props}
			>
				{children}
			</div>
		</>
	);
};

const AuthorizedPage = () => (
	<div className='f-row-10 align-items-center'>
		<AlertSVG />
		<p className='m-0 text-danger'>You are not authorized to view this page</p>
	</div>
);

export const OverViewHeader = ({
	title,
	moreInfo,
	onMoreInfo,
	isInfo,
}: {
	title: string;
	moreInfo?: boolean;
	isInfo?: boolean;
	onMoreInfo?: () => void;
}) => (
	<p
		className='text-little mb-2 color-label'
		style={{ color: '#616161' }}
	>
		{title}{' '}
		{moreInfo ? (
			<span onClick={onMoreInfo}>
				<i className={`fas fa-${isInfo ? 'minus' : 'info'}-circle ml-2`} />
			</span>
		) : null}
	</p>
);

export interface ICardItem {
	title: string;
	value: string | number;
	url?: boolean;
	onUrlClick?: () => void;
	copy?: boolean;
}

export const CardItems = ({ title, value, url, onUrlClick, copy }: ICardItem) => {
	const copyProps = useCopy();
	const onCopy = () => {
		copyProps.copy(value as string);
	};
	function isValidURL(str: string) {
		try {
			new URL(str);
			return true;
		} catch (e) {
			return false;
		}
	}
	const valueToURL = () => {
		if (typeof value === 'string' && isValidURL(value)) return value.replace(/www./g, 'https://');
		return `https://google.com/search?q=${value}`;
	};
	return (
		<>
			<div className='bet-chnnel-item-wrapper'>
				<OverViewHeader title={title} />
				<div className='f-row-7 align-items-center item-value gap-7'>
					{!url ? (
						<p className='font-16 m-0'>{value}</p>
					) : (
						<p
							className='font-16 cursor-pointer m-0'
							onClick={() => {
								onUrlClick?.();
								window.open(valueToURL(), '_blank');
							}}
							style={{ textDecoration: 'none', color: 'inherit' }}
						>
							{value}
						</p>
					)}
					{copy ? (
						<div
							className='hw-max cursor-pointer'
							onClick={onCopy}
						>
							{copyProps?.copySuccess ? <CheckSVG color='green' /> : <CopySVG />}
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

export interface IDropDownItem {
	title: string;
	action: () => void;
	icon?: string;
	disabled?: boolean;
	hidden?: boolean;
}

export const DropDownMenu = ({
	id,
	items,
	dropDownIcon,
	children,
}: {
	id: string;
	items: IDropDownItem[];
	dropDownIcon?: string;
	children?: any;
}) => (
	<div className='dropdown'>
		<div
			className='dropdown-toggle cursor-pointer'
			id={id}
			data-toggle='dropdown'
			aria-haspopup='true'
			aria-expanded='false'
		>
			{children}
			{!children && <i className={`${dropDownIcon || 'fas fa-angle-down'} color-primary`} />}
		</div>
		<ul
			className='dropdown-menu dm-menu'
			aria-labelledby={id}
		>
			{items.map((i, index) => (
				<li
					className='dropdown-item d-flex py-2 text-little'
					onClick={i.disabled ? undefined : i.action}
					key={index}
					style={{
						color: i.disabled ? '#a1a1a1' : '',
						cursor: i.disabled ? 'not-allowed' : 'pointer',
					}}
				>
					{i?.icon && (
						<span
							style={{ width: '25px' }}
							className='d-block'
						>
							<i className={i?.icon} />
						</span>
					)}
					{i.title}
				</li>
			))}
		</ul>
	</div>
);

export const SeparatorComponent = () => <div style={{ width: '1px', height: '10px', background: '#cacaca' }} />;

export const useCallAPI = (getData: () => void, data: boolean) => {
	useEffect(() => {
		if (data) getData();
	}, []);
};

export interface IRefreshProps {
	load?: boolean;
	onRefresh?: () => void;
	loadTxt?: string;
}

export const RefreshComponent = ({ load, onRefresh, loadTxt }: IRefreshProps) => (
	<div
		className='text-center f-row-11 align-items-center justify-content-center'
		onClick={onRefresh}
		style={{ width: 'max-content' }}
	>
		{load ? <PulseSVG /> : <RefreshSVG />}
		{loadTxt ? <p className='m-0 font-11 text-decoratIon-underline cursor-pointer'>{loadTxt}</p> : null}
	</div>
);

export interface IGRO {
	ec8aAction?: () => void;
	ec8bAction?: () => void;
	ec8cAction?: () => void;
	ec8dAction?: () => void;
	ec8eAction?: () => void;
	ec4oaAction?: () => void;
	ec4obAction?: () => void;
	ec4ocAction?: () => void;
	ec4ogAction?: () => void;
	ec4ohAction?: () => void;
}

export interface IImgSize {
	width: number;
	height: number;
}

// Function to get image dimensions
const getImageSize = async (url: string): Promise<IImgSize> =>
	await new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({ width: img.width, height: img.height });
		};
		img.onerror = reject;
		img.src = url;
	});

// Function to get image file size
const getFileSize = async (url: string): Promise<number | null> => {
	try {
		const response = await axios.head(url);
		const contentLength = response.headers['content-length'];
		return contentLength ? parseInt(contentLength, 10) : null;
	} catch (error) {
		console.error('Error getting file size:', error);
		return null;
	}
};

export const useImageSize = (imageUrl: string): IImgSize & { size: number | null } => {
	const [imageProps, setImageProps] = useState<IImgSize & { size: number | null }>({ width: 0, height: 0, size: 0 });

	useEffect(() => {
		getImageSize(imageUrl)
			.then((size) => {
				setImageProps((prev) => ({
					...prev,
					width: size.width,
					height: size.height,
				}));
			})
			.catch((error) => {
				console.error('Error loading image:', error);
			});

		getFileSize(imageUrl)
			.then((size) => {
				setImageProps((prev) => ({
					...prev,
					size,
				}));
			})
			.catch((error) => {
				console.error('Error getting file size:', error);
			});
	}, [imageUrl]);

	return imageProps;
};

export function useDebounce<T>(value: T, delay: number): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;

interface IIImgSize {
	width: number;
	height: number;
}

interface IFileDetails extends IIImgSize {
	size: number | null;
	name: string;
	type: string;
	lastModified: Date | null;
}

// Function to get image dimensions
const getIImageSize = async (url: string): Promise<IImgSize> =>
	await new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({ width: img.width, height: img.height });
		};
		img.onerror = reject;
		img.src = url;
	});

// Function to get file details
const getFileDetails = async (url: string): Promise<Omit<IFileDetails, 'width' | 'height'>> => {
	try {
		const response = await axios.head(url);
		const contentLength = response.headers['content-length'];
		const contentType = response.headers['content-type'];
		const lastModified = response.headers['last-modified'];

		const fileName = url.substring(url.lastIndexOf('/') + 1);

		return {
			size: contentLength ? parseInt(contentLength, 10) : null,
			name: fileName,
			type: contentType || '',
			lastModified: lastModified ? new Date(lastModified) : null,
		};
	} catch (error) {
		console.error('Error getting file details:', error);
		return {
			size: null,
			name: '',
			type: '',
			lastModified: null,
		};
	}
};

export const useImageDetails = (imageUrl: string): IFileDetails => {
	const [imageProps, setImageProps] = useState<IFileDetails>({
		width: 0,
		height: 0,
		size: null,
		name: '',
		type: '',
		lastModified: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [size, details] = await Promise.all([getIImageSize(imageUrl), getFileDetails(imageUrl)]);

				setImageProps({ ...size, ...details });
			} catch (error) {
				console.error('Error loading image details:', error);
			}
		};

		fetchData();
	}, [imageUrl]);

	return imageProps;
};

export const useInactivityTimeout = (timeoutDuration: number, onTimeout: () => void, states: IStates) => {
	const [isInactive, setIsInactive] = useState(false);
	let timer: NodeJS.Timeout;

	const sessionTimeOut = states?.global?.sessionTimeoutGlobal?.status;

	const resetTimer = useCallback(() => {
		if (timer) clearTimeout(timer);
		if (ISSESSION()) {
			timer = setTimeout(() => {
				setIsInactive(true);
				onTimeout();
			}, timeoutDuration);
		}
		if (sessionTimeOut) {
			onTimeout();
		}
	}, [timeoutDuration, onTimeout, ISSESSION(), sessionTimeOut]);

	useEffect(() => {
		const handleActivity = () => {
			setIsInactive(false);
			resetTimer();
		};

		window.addEventListener('mousemove', handleActivity);
		window.addEventListener('keydown', handleActivity);
		window.addEventListener('click', handleActivity);

		resetTimer();

		return () => {
			window.removeEventListener('mousemove', handleActivity);
			window.removeEventListener('keydown', handleActivity);
			window.removeEventListener('click', handleActivity);
			if (timer) clearTimeout(timer);
		};
	}, [resetTimer]);

	return isInactive;
};

export interface IUseImage {
	isLoaded: boolean;
	isError: boolean;
	handleError: (error: boolean) => void;
	handleLoad: (load: boolean) => void;
}

export const useImage = (): IUseImage => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleLoad = (load: boolean) => {
		setIsLoaded(load);
	};

	const handleError = (error: boolean) => {
		setIsError(error);
	};

	return {
		isLoaded,
		isError,
		handleError,
		handleLoad,
	};
};

interface IMediaURL {
	mediaUrl: {
		type: 'doc' | 'image' | null;
		url: string;
		load: boolean;
	};
}

const isImageExist = async (url: string, imgProps: IUseImage): Promise<boolean> =>
	await new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			imgProps.handleLoad(true);
			resolve(true);
			cleanup();
		};
		img.onerror = () => {
			imgProps.handleError(true);
			resolve(false);
			cleanup();
		};
		img.src = url;

		// Cleanup function to remove event listeners and clear the src attribute
		const cleanup = () => {
			img.onload = null;
			img.onerror = null;
			img.src = '';
			imgProps.handleLoad(false);
			imgProps.handleError(false);
		};
	});

const useGetMediaUrl = (url: string, imgProps: IUseImage): IMediaURL => {
	const getMediaUrl = async (): Promise<{
		type: 'doc' | 'image' | null;
		url: string;
		load: boolean;
	}> => {
		if (url) {
			const isImage = await isImageExist(url, imgProps);
			return {
				type: isImage ? 'image' : 'doc',
				url,
				load: false,
			};
		} else {
			return { type: 'image', url: '', load: false };
		}
	};
	const [mediaUrl, setMediaUrl] = useState<{
		type: 'doc' | 'image' | null;
		url: string;
		load: boolean;
	}>({ type: 'image', url: '', load: false });

	useEffect(() => {
		setMediaUrl({ load: true, type: null, url: '' });
		getMediaUrl().then((data) => {
			setMediaUrl(data);
		});
	}, [url]);

	return {
		mediaUrl,
	};
};

export const MediaItem = ({ url, isCover }: { url: string; isCover?: boolean }) => {
	const imgProps = useImage();
	const { mediaUrl } = useGetMediaUrl(url, imgProps);

	return (
		<div
			className='w-100 h-100 d-flex justify-content-center'
			style={{
				overflow: isCover ? 'auto' : '',
				alignItems: isCover ? 'start' : 'center',
			}}
		>
			{mediaUrl.load ? (
				<PulseSVG />
			) : mediaUrl.type === 'image' ? (
				mediaUrl.url && (
					<img
						src={mediaUrl.url}
						alt=''
						style={{
							objectFit: isCover ? 'cover' : 'contain',
							height: isCover ? 'auto' : '100%',
						}}
						className='w-100'
					/>
				)
			) : mediaUrl.type === 'doc' ? (
				<iframe
					src={mediaUrl.url.replace('?dl=0', '?raw=1')}
					width='100%'
					height='100%'
					title='firefighter'
					// sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
				/>
			) : null}
		</div>
	);
};

interface IRTI {
	title: string;
	description: string;
	isActive?: boolean;
	onProceed?: () => void;
	onSelect?: () => void;
}

export const SelectItem = ({ title, description, isActive, onProceed, onSelect }: IRTI) => (
	<div
		className={`rounded p-4 f-row-10 align-items-start result-item-type ${isActive ? 'active' : ''}`}
		onClick={!isActive ? onSelect : undefined}
	>
		{/* <div className="f-row-10 align-items-center">
          <ResultSVG />
        </div> */}
		<div className='f-column-15'>
			<h6 className='m-0'>{title}</h6>
			<p className='m-0 text-little'>{description}</p>
			<Hvc
				removeDOM
				view={isActive || false}
				className='mt-3'
			>
				<TypeButton
					title='Proceed'
					buttonSize='small'
					onClick={onProceed}
				/>
			</Hvc>
		</div>
	</div>
);

export const useSaveB4Changes = () => {
	const { saveAsDraft, global } = useGlobalContext();
	// State to track unsaved changes
	const hasUnsavedChanges = true;

	// Function to perform the action, like saving as a draft
	const save = useCallback(() => {
		console.log('Saving as draft...');
		// Logic to save the draft goes here
		if (global.state.selectedParentCode) {
			saveAsDraft(); // Reset state after saving
		}
	}, []);

	// Prompt the user if there are unsaved changes when trying to leave
	const handleBeforeUnload = useCallback(
		(event: BeforeUnloadEvent) => {
			if (hasUnsavedChanges) {
				event.preventDefault();
				event.returnValue = 'You have unsaved changes. Leaving will save changes to your draft.';
				return event.returnValue;
			}
		},
		[hasUnsavedChanges]
	);

	// Perform action on visibility change
	const handleVisibilityChange = useCallback(() => {
		if (document.visibilityState === 'hidden' && hasUnsavedChanges) {
			save();
		}
	}, [hasUnsavedChanges, save]);

	useEffect(() => {
		if (ISADMINLOGGED()) {
			// Attach the event listeners
			window.addEventListener('beforeunload', handleBeforeUnload);
			document.addEventListener('visibilitychange', handleVisibilityChange);

			// Cleanup function
			return () => {
				window.removeEventListener('beforeunload', handleBeforeUnload);
				document.removeEventListener('visibilitychange', handleVisibilityChange);
			};
		}
	}, [handleBeforeUnload, handleVisibilityChange]);
};
