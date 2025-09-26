import './style.scss';

import React from 'react';

import { ISADMINLOGGED } from '../../constants/global';

const ChildWrapper = ({ children }: { children?: any }) => {
	const notlogged = ISADMINLOGGED() ? '' : 'notlogged';
	return (
		<div className={`child-wrapper-container ${notlogged}`}>
			<div className='child-wrapper'>{children}</div>
			{/* <div className="side-content">
        <SideContent />
      </div> */}
		</div>
	);
};

export default ChildWrapper;

// const SideContent = () => {
//   return (
//     <div className="f-column-33">
//       <div className="f-column-7">
//         <p className="text-tiny m-0">Notification</p>
//         <div className="border rounded py-5"></div>
//       </div>
//       <div className="f-column-7">
//         <p className="text-tiny m-0">Election Update</p>
//         <div className="border rounded py-5"></div>
//       </div>
//     </div>
//   )
// }
