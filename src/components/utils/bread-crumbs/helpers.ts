export const capitalizeFirstLetters = (sentence = '') => {
	const words = sentence.split(' ');
	const capitalizedWords = words.map((word) => word[0].toUpperCase() + word.slice(1));
	const capitalizedSentence = capitalizedWords.join(' ');
	return capitalizedSentence;
};
export const GenerateBreadcrumb = (pathname = '') => {
	const segments = pathname.split('/').filter((segment) => segment);
	const breadcrumb: Breadcrumb[] = segments.map((segment, index) => {
		const segmentPath = `/${segments.slice(0, index + 1).join('/')}`;
		let segmentLabel = capitalizeFirstLetters(segment.replace(/-+/g, ' '));
		segmentLabel = segmentLabel.replace(/\bId\b/g, 'ID');
		return { label: segmentLabel, url: segmentPath };
	});
	return breadcrumb;
};

interface Breadcrumb {
	label: string;
	url: string;
}
