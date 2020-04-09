import { ScrollToTop } from 'Components/utils/Scroll'
import React from 'react'
import emoji from 'react-easy-emoji'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'
import * as data from '../../../../data/stats.json'
import * as uniq_visitors from '../../../../data/total_visits.json'

export default function Stats() {
	let d202004 = data[11].values
	console.log('data202004', d202004)
	return (
		<>
			<ScrollToTop />
			<h1>
				Statistiques <>{emoji('📊')}</>
			</h1>
			<section>
				<h2>Nombre de visites par mois</h2>
				<LineChart
					width={700}
					height={300}
					data={uniq_visitors.slice()}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="year" padding={{ right: 30 }} />
					<YAxis />
					<Line
						type="monotone"
						dataKey="nb_uniq_visitors"
						stroke="#8884d8"
						strokeWidth={3}
					/>
				</LineChart>
				<div id="visits-indicators"></div>
			</section>

			<section>
				<h2> Nombre d'utilisation des simulateurs</h2>
				<BarChart
					width={700}
					height={300}
					data={d202004}
					layout="vertical"
					margin={{
						top: 20,
						right: 30,
						left: 20,
						bottom: 5
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis type="number" dataKey="value" />
					<YAxis type="category" dateKey="key" />
					<Tooltip />
					<Bar dataKey="value" fill="#8884d8" label="value" />
				</BarChart>
				<div id="simulteurs-indicators"></div>
			</section>
		</>
	)
}