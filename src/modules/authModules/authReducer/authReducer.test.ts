import { authActions, AuthInitialStateType, authReducer } from './authReducer'
import { UserType } from 'modules/authModules/authApi/authApi'

let initialState: AuthInitialStateType

beforeEach(() => {
	initialState = {
		isLoggedIn: false,
		user: {} as UserType
	}
})

test('should handle setUser', () => {
	const user: UserType = { userId: 1, userName: 'John Doe', email: 'emailtest@mail.com' }
	const action = authActions.setUser({ user })

	const newState = authReducer(initialState, action)
	expect(newState.user).toEqual(user)
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
