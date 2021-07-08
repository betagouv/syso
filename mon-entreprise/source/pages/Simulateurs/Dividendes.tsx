import { useContext } from 'react'
import { Condition } from 'Components/EngineValue'
import { SimulationGoals, SimulationGoal } from 'Components/SimulationGoals'
import { ThemeColorsContext } from 'Components/utils/colors'
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
				dottedName="bénéficiaire . dividendes . versés"
			/>

			<Condition expression="bénéficiaire . dividendes . impôt . option barème">
				<SimulationGoal
					small
					appear={false}
					dottedName="dirigeant . rémunération . totale"
				/>
			</Condition>
			<Condition expression="oui">
				{/*  [XXX] pour barème n'afficher qu'après avoir eu le montant des revenus de dirigeant */}
				<SimulationGoal
					appear={false}
					alwaysShow
					dottedName="bénéficiaire . dividendes . nets d'impôt"
				/>
			</Condition>
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
					precision={0.1}
					data={[
						{
							dottedName: "bénéficiaire . dividendes . nets d'impôt",
							title: t('Dividendes nets'),
							color: palettes[0][0],
						},
						{
							dottedName: 'bénéficiaire . dividendes . impôt',
							title: t('Impôt'),
							color: palettes[1][0],
						},
						{
							dottedName:
								'bénéficiaire . dividendes . cotisations et contributions',
							title: t('Cotisations'),
							color: palettes[1][1],
						},
					]}
				/>
			</section>
		</Condition>
	)
}
