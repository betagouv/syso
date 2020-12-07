import classNames from 'classnames'
import React from 'react'
import { Trans } from 'react-i18next'
import Explanation from '../Explanation'
import styled from 'styled-components'
import { Mecanism, NodeValuePointer } from './common'
import { parseUnit } from '../../units'

export default function Barème({ nodeValue, explanation, unit }) {
	return (
		<Mecanism name="barème" value={nodeValue} unit={unit}>
			<StyledComponent>
				<ul className="properties">
					<BarèmeAttributes explanation={explanation} />
					<TrancheTable
						tranches={explanation.tranches}
						multiplicateur={explanation.multiplicateur}
					/>
					{/* nous avons remarqué que la notion de taux moyen pour un barème à 2 tranches est moins pertinent pour les règles de calcul des indépendants. Règle empirique à faire évoluer ! */}
					{nodeValue !== null && explanation.tranches.length > 2 && (
						<>
							<b>
								<Trans>Taux moyen</Trans> :{' '}
							</b>
							<NodeValuePointer
								data={(100 * nodeValue) / explanation.assiette.nodeValue}
								unit={parseUnit('%')}
							/>
						</>
					)}
				</ul>
			</StyledComponent>
		</Mecanism>
	)
}

export const BarèmeAttributes = ({ explanation }) => {
	const multiplicateur = explanation.multiplicateur
	return (
		<>
			<li key="assiette">
				<span className="key">
					<Trans>Assiette</Trans> :{' '}
				</span>
				<span className="value">
					<Explanation node={explanation.assiette} />
				</span>
			</li>
			{multiplicateur && !multiplicateur.isDefault && (
				<li key="multiplicateur">
					<span className="key">
						<Trans>Multiplicateur</Trans> :{' '}
					</span>
					<span className="value">
						<Explanation node={multiplicateur} />
					</span>
				</li>
			)}
		</>
	)
}

export const TrancheTable = ({ tranches, multiplicateur }) => {
	const activeTranche = tranches.find(({ isActive }) => isActive)
	return (
		<table className="tranches">
			<thead>
				<tr>
					<th>
						<Trans>Plafonds des tranches</Trans>
					</th>
					{tranches[0].taux && (
						<th>
							<Trans>Taux</Trans>
						</th>
					)}
					{(tranches[0].montant || activeTranche?.nodeValue != null) && (
						<th>
							<Trans>Montant</Trans>
						</th>
					)}
				</tr>
			</thead>
			<tbody>
				{tranches.map((tranche, i) => (
					<Tranche key={i} tranche={tranche} multiplicateur={multiplicateur} />
				))}
			</tbody>
		</table>
	)
}

const Tranche = ({ tranche, multiplicateur }) => {
	const isHighlighted = tranche.isActive
	return (
		<tr className={classNames('tranche', { activated: isHighlighted })}>
			<td key="tranche">
				{tranche.plafond.nodeValue === Infinity ? (
					<Trans>Au-delà du dernier plafond</Trans>
				) : (
					<>
						<Trans>Inférieur à </Trans>
						<Explanation node={tranche.plafond} />
						{multiplicateur && !multiplicateur.isDefault && (
							<>
								{' × '}
								<Explanation node={multiplicateur} />
							</>
						)}
					</>
				)}
			</td>
			{tranche.taux && (
				<td key="taux">
					<Explanation node={tranche.taux} />
				</td>
			)}
			{(tranche.nodeValue != null || tranche.montant) && (
				<td key="value">
					{tranche.montant ? (
						<Explanation node={tranche.montant} />
					) : (
						<NodeValuePointer data={tranche.nodeValue} unit={tranche.unit} />
					)}
				</td>
			)}
		</tr>
	)
}

export const StyledComponent = styled.div`
	table {
		margin: 1em 0;
		width: 100%;
		text-align: left;
		font-weight: 400;
	}
	table td {
		padding: 0.1em 0.4em;
	}
	table th {
		font-weight: 600;
	}
	table th:first-letter {
		text-transform: uppercase;
	}
	.tranche:nth-child(2n) {
		background: var(--lightestColor);
	}
	.tranche.activated {
		background: var(--lighterColor);
		font-weight: bold;
	}
`
