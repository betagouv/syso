import { useContext } from 'react'
import { Condition } from 'Components/EngineValue'
import { SimulationGoals, SimulationGoal } from 'Components/SimulationGoals'
import { ThemeColorsContext } from 'Components/utils/colors'
import Notifications from 'Components/Notifications'
import Simulation from 'Components/Simulation'
import { Trans, useTranslation } from 'react-i18next'
import StackedBarChart from 'Components/StackedBarChart'
import { useDispatch } from 'react-redux'
import { useEngine } from 'Components/utils/EngineContext'
import { updateSituation } from 'Actions/actions'
import { DottedName } from 'modele-social'
import { HiddenOptionContext } from 'Components/conversation/Question'

export default function DividendesSimulation() {
	return (
		// [XXX] Add warnings? cf. SimulateurWarning
		<>
			<Notifications />
			<HiddenOptionContext.Provider value={['dirigeant . auto-entrepreneur']}>
				<Simulation explanations={<DividendesExplanation />}>
					<div
						css={`
							display: flex;
							flex-wrap: wrap-reverse;
							> * {
								margin-top: 0.6rem;
							}
							justify-content: center;

							@media (min-width: 590px) {
								justify-content: space-between;
							}
						`}
					>
						<OptionBarèmeSwitch />
					</div>
					<DividendesSimulationGoals />
				</Simulation>
			</HiddenOptionContext.Provider>
		</>
	)
}

function OptionBarèmeSwitch() {
	const dispatch = useDispatch()
	const engine = useEngine()
	const dottedName = 'impôt . méthode de calcul' as DottedName
	const currentOptionPFU = engine.evaluate(dottedName + ' . PFU').nodeValue
	const currentOptionBarème = engine.evaluate(
		dottedName + ' . barème standard'
	).nodeValue

	return (
		<span className="base ui__ small radio toggle">
			<label>
				<input
					name={dottedName}
					type="radio"
					value="non"
					onChange={() => dispatch(updateSituation(dottedName, "'PFU'"))}
					checked={!!currentOptionPFU}
				/>
				<span>
					<Trans>
						PFU (<i>"flat tax"</i>)
					</Trans>
				</span>
			</label>
			<label>
				<input
					name={dottedName}
					type="radio"
					value="oui"
					onChange={() =>
						dispatch(updateSituation(dottedName, "'barème standard'"))
					}
					checked={!!currentOptionBarème}
				/>
				<span>
					<Trans>Impôt au barème</Trans>
				</span>
			</label>
		</span>
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

			<Condition expression="impôt . méthode de calcul . barème standard">
				{/* [XXX] Default at 0 €/an if not yet defined */}
				<SimulationGoal
					small
					appear={false}
					dottedName="impôt . foyer fiscal . revenu imposable . autres revenus imposables"
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
							dottedName: 'impôt . dividendes',
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
