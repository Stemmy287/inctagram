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
				await queryFulfilled
				dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
			}
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: 'auth/logout',
				method: 'POST'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled
				dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
				localStorage.removeItem('token')
			}
		}),
		me: builder.query<UserType, void>({
			query: () => 'auth/me',
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					const res = await queryFulfilled
					dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
					dispatch(authActions.setUser({ user: res.data }))
				} finally {
					dispatch(appActions.setAppInitialized({ isInitialized: true }))
				}
			}
		}),
		updateTokens: builder.mutation<LoginResponseType, void>({
			query: () => ({
				url: 'auth/update-tokens',
				method: 'POST'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const { data } = await queryFulfilled
				localStorage.setItem('token', data.accessToken)
			}
		}),
		recoveryPassword: builder.mutation<void, PasswordRecoveryType>({
			query: body => ({
				url: 'auth/password-recovery',
				method: 'POST',
				body
			})
		}),
		resetPassword: builder.mutation<void, Omit<ResetPasswordType, 'passwordConfirmation'>>({
			query: body => ({
				url: 'auth/new-password',
				method: 'POST',
				body
			})
		}),
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
		}),
		regEmailResending: builder.mutation<void, regEmailResendingType>({
			query: body => ({
				url: 'auth/registration-email-resending',
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
	useRegConfirmationMutation,
	useRegEmailResendingMutation,
	useUpdateTokensMutation
} = authApi

export type ConfirmationType = {
	confirmationCode: string
}

export type regEmailResendingType = {
	email: string
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
