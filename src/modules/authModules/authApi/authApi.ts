import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_URL = 'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/'

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['authApi'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginUpdateResponseType, any>({
			query: (body: LoginParamsType) => ({
				url: 'auth/login',
				method: 'POST',
				body
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: 'auth/logout',
				method: 'POST'
			})
		}),
		me: builder.query<MeResponseType, any>({
			query: () => ({
				url: 'auth/me'
			})
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
		})
	})
})

export const {
	useMeQuery,
	useLogoutMutation,
	useLoginMutation,
	useRecoveryPasswordMutation,
	useResetPasswordMutation
} = authApi

type LoginParamsType = {
	email: string
	password: string
}

type LoginUpdateResponseType = {
	accessToken: string
}

type MeResponseType = {
	userId: number
	userName: string
	email: string
}

export type PasswordRecoveryType = {
	email: string
	recaptcha: string
}

export type ResetPasswordType = {
	newPassword: string
	passwordConfirmation: string
	recoveryCode: string
}
