import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import type React from 'react';
import ReactFC from 'react-fusioncharts';
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const chart = {
	caption: 'Election Results',
	subcaption: '',
	xaxisname: 'Political Parties',
	yaxisname: 'Total votes',
	formatnumberscale: '1',
	plottooltext: '<b>$dataValue</b> votes <b>$seriesName</b> for $label',
	theme: 'fusion',
	drawcrossline: '1',
};

interface IChart {
	categories: {
		category: {
			label: string;
		}[];
	}[];
	dataset: {
		seriesname: string;
		data: {
			value: string;
		}[];
	}[];
}

const Chart: React.FC<IChart> = ({ dataset, categories }) => {
	const ds = { chart, dataset, categories };

	return (
		<div className='position-relative'>
			<div
				className='position-absolute bg-white'
				style={{
					width: '160px',
					height: '30px',
					zIndex: 403,
					bottom: 0,
					left: 0,
				}}
			/>
			{/* // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error */}
			{/* @ts-ignore */}
			<ReactFC
				type='mscolumn2d'
				width='100%'
				height='407'
				dataFormat='JSON'
				dataSource={ds}
			/>
		</div>
	);
};

export default Chart;
