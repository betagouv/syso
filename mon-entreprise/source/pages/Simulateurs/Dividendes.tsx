import { useContext } from 'react'
import { SimulationConfig } from 'Reducers/rootReducer'
import { Condition } from 'Components/EngineValue'
import { SimulationGoals, SimulationGoal } from 'Components/SimulationGoals'
import { ThemeColorsContext } from 'Components/utils/colors'
import useSimulationConfig from 'Components/utils/useSimulationConfig'
import SimulateurWarning from 'Components/SimulateurWarning'
import Notifications from 'Components/Notifications'
import Simulation from 'Components/Simulation'
import { Trans, useTranslation } from 'react-i18next'
import StackedBarChart from 'Components/StackedBarChart'

export default function DividendesSimulation() {
	return (
		<>
			{/* [XXX] Seems useless */}
			<SimulateurWarning simulateur="dividendes" />
			<Notifications />
			<Simulation explanations={<DividendesExplanation />}>
				<DividendesSimulationGoals />
			</Simulation>
		</>
	)
}

const DividendesSimulationGoals = () => (
	<SimulationGoals className="plain">
		<Condition expression="entreprise . imposition = 'IS'">
			<SimulationGoal
				appear={false}
				alwaysShow
				dottedName="entreprise . solde exercice précédent"
			/>
			<SimulationGoal
				small
				appear={false}
				dottedName="entreprise . mise en réserve"
			/>
			<SimulationGoal
				appear={false}
				alwaysShow
				dottedName="entreprise . dividendes"
			/>
			{/* [XXX] */}
			{/* <Condition expression="bénéficiaire . dividendes . option barème">
				<SimulationGoal
					small
					appear={false}
					dottedName="contrat salarié . rémunération . net imposable"
				/>
			</Condition>
			<Condition expression="bénéficiaire . dividendes . option barème">
				<SimulationGoal dottedName="dirigeant . rémunération . totale" />
			</Condition> */}
		</Condition>
	</SimulationGoals>
)

const DividendesExplanation = () => {
	const { t } = useTranslation()
	const { palettes } = useContext(ThemeColorsContext)

	return (
		<Condition expression="bénéficiaire . dividendes . versés > 0">
			<section>
				<div
					css={`
						display: flex;
						align-items: baseline;
					`}
				>
					<h2
						css={`
							flex: 1;
						`}
					>
						<Trans i18nKey="payslip.repartition">
							Répartition du total chargé
						</Trans>
					</h2>
				</div>
				<StackedBarChart
					data={[
						{
							dottedName: 'bénéficiaire . dividendes . net',
							title: t('Dividendes nets'),
							color: palettes[0][0],
						},
						{
							dottedName: 'bénéficiaire . dividendes . impôt',
							title: t('impôt'),
							color: palettes[1][0],
						},
						{
							dottedName:
								'bénéficiaire . dividendes . cotisations et contributions',
							color: palettes[1][1],
						},
					]}
				/>
			</section>
		</Condition>
	)
}
