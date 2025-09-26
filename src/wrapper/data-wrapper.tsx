import React, { memo } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../components/layout';
import type { IActions } from '../interface/IAction';
import type { IStates } from '../interface/IReducer';
import { actions } from '../store/actions';

interface IDataWrapper {
	children: any;
	props?: any;
	nowrapper?: string;
	adminRoute?: boolean;
	authRoute?: boolean;
	generalRoute?: boolean;
	publicRoute?: boolean;
}

const DataWrapper = memo(({ children, ...props }: IDataWrapper) => (
	<Dashboard {...props}>{React.cloneElement(children, props)}</Dashboard>
));

DataWrapper.displayName = 'DataWrapper';

type mapStateProps = (state: IStates) => { states: IStates };

const mapStateToProps: mapStateProps = (states: IStates) => ({ states });
const mapDispatchToProps: IActions = actions;

export default connect(mapStateToProps, mapDispatchToProps)(DataWrapper);
