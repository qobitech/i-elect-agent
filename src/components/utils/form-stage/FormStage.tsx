import { type IFormStage } from './FormStage.helpers';

const FormStage = ({ children, hide }: IFormStage) => {
	if (hide) return <></>;

	return <div>{children}</div>;
};

export default FormStage;
