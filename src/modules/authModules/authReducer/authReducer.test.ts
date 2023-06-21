import { authActions, AuthInitialStateType, authReducer } from './authReducer'

let initialState: AuthInitialStateType

beforeEach(() => {
	initialState = {
		token: '',
		isLoggedIn: false
	}
})

test('should handle setIsLoggedIn', () => {
	const isLoggedIn = true
	const action = authActions.setIsLoggedIn({ isLoggedIn })

	const newState = authReducer(initialState, action)
	expect(newState.isLoggedIn).toEqual(isLoggedIn)
})

test('should not modify state if action is not handled', () => {
	const action = { type: 'unknown' }

	const newState = authReducer(initialState, action as any)
	expect(newState).toEqual(initialState)
})
