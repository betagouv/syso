import { NavLink, Route, Switch } from 'Components/router-adapter'
import { SitePathsContext } from 'Components/utils/SitePathsContext'
import { useContext } from 'react'
import { Trans } from 'react-i18next'
import { TrackChapter } from '../../../ATInternetTracking'
import Activité from './Activité'
import ActivitésSelection from './ActivitésSelection'
import reducer from './reducer'
import { StoreProvider } from './StoreContext'
import VotreSituation from './VotreSituation'

export default function ÉconomieCollaborative() {
	const sitePaths = useContext(SitePathsContext)
	return (
		<>
			<TrackChapter chapter1="simulateurs" chapter2="economie_collaborative" />
			<div css="transform: translateY(2rem)">
				<NavLink
					to={sitePaths.simulateurs.économieCollaborative.index}
					exact
					activeClassName="ui__ hide"
					className="ui__ simple small push-left button "
				>
					←{' '}
					<Trans i18nKey="économieCollaborative.retourAccueil">
						Retour à la selection d'activités
					</Trans>
				</NavLink>
			</div>
			<StoreProvider
				reducer={reducer}
				localStorageKey="app::économie-collaborative:v1"
			>
				<Switch>
					<Route
						exact
						path={sitePaths.simulateurs.économieCollaborative.index}
						component={ActivitésSelection}
					/>
					<Route
						path={sitePaths.simulateurs.économieCollaborative.votreSituation}
						component={VotreSituation}
					/>
					<Route
						path={sitePaths.simulateurs.économieCollaborative.index + '/:title'}
						component={Activité}
					/>
				</Switch>
			</StoreProvider>
		</>
	)
}
