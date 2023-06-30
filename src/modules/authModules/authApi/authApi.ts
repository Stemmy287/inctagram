import { createApi } from '@reduxjs/toolkit/query/react'
import { appActions } from 'modules/appModules/appReducer'
import { authActions } from 'modules/authModules/authReducer/authReducer'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'
import { httpMethods } from '../../../assets/utils/httpMethods/httpMethods'

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		login: builder.mutation<LoginResponseType, LoginFormData>({
			query: body => ({
				url: 'auth/login',
				method: httpMethods.POST,
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
				method: httpMethods.POST
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				await queryFulfilled
				dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
				dispatch(authActions.setToken({ token: null }))
			}
		}),
		me: builder.query<UserType, void>({
			query: () => 'auth/me',
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled
					dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
				} finally {
					dispatch(appActions.setAppInitialized({ isInitialized: true }))
				}
			}
		}),
		recoveryPassword: builder.mutation<void, PasswordRecoveryType>({
			query: body => ({
				url: 'auth/password-recovery',
				method: httpMethods.POST,
				body
			})
		}),
		resetPassword: builder.mutation<void, Omit<ResetPasswordType, 'passwordConfirmation'>>({
			query: body => ({
				url: 'auth/new-password',
				method: httpMethods.POST,
				body
			})
		}),
		registration: builder.mutation<string, RegisterParamsType>({
			query: body => ({
				url: 'auth/registration',
				method: httpMethods.POST,
				body
			})
		}),
		regConfirmation: builder.mutation<void, ConfirmationType>({
			query: body => ({
				url: 'auth/registration-confirmation',
				method: httpMethods.POST,
				body
			})
		}),
		regEmailResending: builder.mutation<void, regEmailResendingType>({
			query: body => ({
				url: 'auth/registration-email-resending',
				method: httpMethods.POST,
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
	useRegEmailResendingMutation
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
