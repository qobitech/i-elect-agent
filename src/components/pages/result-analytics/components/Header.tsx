interface Props {
	electionName: string;
}

const ResultAnalyticsHeader = ({ electionName }: Props) => (
	<div>
		<h1 className='font-20'>
			Election Result Analytics for <span className='text-success'>{electionName}</span>
		</h1>
	</div>
);

export default ResultAnalyticsHeader;
