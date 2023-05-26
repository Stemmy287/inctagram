import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { appActions } from '@/modules/appModules/appReducer'
import { authActions } from '@/modules/authModules/authReducer/authReducer'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['login', 'logout', 'me'],
	baseQuery: fetchBaseQuery({
		credentials: 'include',
		baseUrl: API_URL,
		prepareHeaders: headers => {
			const token = localStorage.getItem('token')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginResponseType, LoginFormData>({
			query: body => ({
				url: 'auth/login',
				method: 'POST',
				body
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(appActions.setAppStatus({ status: 'loading' }))
				try {
					await queryFulfilled
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
					dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
				} catch (e) {
					dispatch(appActions.setAppStatus({ status: 'failed' }))
				}
			}
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(appActions.setAppStatus({ status: 'loading' }))
				try {
					await queryFulfilled
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
					dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
					localStorage.removeItem('token')
				} catch (e) {
					dispatch(appActions.setAppStatus({ status: 'failed' }))
				}
			}
		}),
		me: builder.query<UserType, void>({
			query: () => 'auth/me',
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				dispatch(appActions.setAppStatus({ status: 'loading' }))
				try {
					const res = await queryFulfilled
					dispatch(appActions.setAppStatus({ status: 'succeeded' }))
					dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
					dispatch(authActions.setUser({ user: res.data }))
				} catch (e) {
					dispatch(appActions.setAppStatus({ status: 'failed' }))
				} finally {
					dispatch(appActions.setAppInitialized({ isInitialized: true }))
				}
			}
		}),
		recoveryPassword: builder.mutation<any, PasswordRecoveryType>({
			query: body => ({
				url: 'auth/password-recovery',
				method: 'POST',
				body
			})
		}),
		resetPassword: builder.mutation<any, Omit<ResetPasswordType, 'passwordConfirmation'>>({
			query: body => ({
				url: 'auth/new-password',
				method: 'POST',
				body
			})
		}),

		// registration
		registration: builder.mutation<string, RegisterParamsType>({
			query: body => ({
				url: 'auth/registration',
				method: 'POST',
				body
			})
		}),
		regConfirmation: builder.mutation<void, ConfirmationType>({
			query: body => ({
				url: 'auth/registration-confirmation',
				method: 'POST',
				body
			})
		})
	})
})

export const {
	useMeQuery,
	useLogoutMutation,
	useLoginMutation,
	useRecoveryPasswordMutation,
	useResetPasswordMutation,
	useRegistrationMutation,
	useRegConfirmationMutation
} = authApi

export type ConfirmationType = {
	confirmationCode: any
}

type LoginResponseType = {
	accessToken: string
}

export type RegisterParamsType = {
	userName: string
	email: string
	password: string
}

export type UserType = {
	userId: number
	userName: string
	email: string
}

export type LoginFormData = {
	email: string
	password: string
}

export type PasswordRecoveryType = {
	email: string
	recaptcha?: string
}

export type ResetPasswordType = {
	newPassword: string
	passwordConfirmation: string
	recoveryCode: string
}
