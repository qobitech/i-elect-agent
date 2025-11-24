import type { IIRevResultState } from '../../../interface/state/IRev';
import { CardItems } from '../../utils/hooks';

const UserNotes = ({ result }: { result: IIRevResultState }) => (
	<div className='f-column-33'>
		<h3 className='m-0'>User Notes</h3>
		<div className='grid-wrapper-30 gap-33'>
			{result?.notes?.map((i, index) => (
				<CardItems
					title={`Notes #${index + 1}`}
					value={i.message}
					key={index}
				/>
			))}
		</div>
	</div>
);

export default UserNotes;
