import { useEffect, useState } from 'react'
import safeLocalStorage from '../../storage/safeLocalStorage'

export const persistState = key => ([state, changeState]) => {
	useEffect(() => safeLocalStorage.setItem(key, JSON.stringify(state)), [state])
	return [state, changeState]
}
export const getInitialState = key => {
	const value = safeLocalStorage.getItem(key)
	if (!value) {
		return
	}
	try {
		return JSON.parse(safeLocalStorage.getItem(key))
	} catch (e) {
		console.warn(e);
		return null;
	}
}

export const usePersistingState = (key, defaultState) => {
	const initialState = getInitialState(key)
	return persistState(key)(
		useState(initialState != null ? initialState : defaultState)
	)
}
