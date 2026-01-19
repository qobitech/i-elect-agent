import { CheckSVG } from '../../utils/svgs';

export const RequestStatus = () => (
	<div className='f-column-33 py-5'>
		<div
			style={{ maxWidth: '600px' }}
			className='f-column-33 mx-auto w-100 p-5 border-label rounded'
		>
			<div className='f-column-13'>
				<div className='f-row-13 align-items-center'>
					<CheckSVG />
					<h2 className='m-0'>Request Submitted Successfully</h2>
				</div>
				<p className='color-label m-0'>
					Our team will review your request, and you&apos;ll receive a notification once access has been granted.
				</p>
			</div>
			<div className='text-center'>
				<a
					href='/'
					className='font-13'
				>
					Back to Home
				</a>
			</div>
		</div>
	</div>
);
