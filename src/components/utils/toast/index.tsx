// import React, { memo, useEffect } from 'react'
// import './index.scss'
// import { CheckSVG } from '../svgs'
// import { IActions } from '../../../interface/IAction'

import type { IActions } from '../../../interface/IAction';

export interface INotifyUser {
	notice: string;
	status: boolean;
	actions: IActions;
}

// const Toast = memo(({ notice, status, actions }: INotifyUser) => {
//   useEffect(() => {
//     if (notice) {
//       let timer: NodeJS.Timeout
//       // eslint-disable-next-line prefer-const
//       timer = setTimeout(() => {
//         actions?.notificationGlobal('', status)
//       }, 1500)
//       return () => {
//         clearTimeout(timer)
//       }
//     }
//   }, [notice])

//   return (
//     <>
//       {notice ? (
//         <div className={`toast-container ${status ? 'success' : ''}`}>
//           <CheckSVG color="#fff" />
//           <p>{notice}</p>
//         </div>
//       ) : null}
//     </>
//   )
// })

// Toast.displayName = 'Toast'

// export default Toast
