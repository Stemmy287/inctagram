import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginFormData } from '@/pages/login'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['authApi'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL
	}),
	endpoints: builder => ({
		login: builder.mutation<LoginUpdateResponseType, any>({
			query: (body: LoginFormData) => ({
				url: 'auth/login',
				method: 'POST',
				body: body
			})
		}),
		logout: builder.mutation({
			query: () => ({
				url: 'auth/logout',
				method: 'POST'
			})
		}),
		me: builder.query<MeResponseType, any>({
			query: () => 'auth/me'
		})
	})
})


export const { useMeQuery, useLogoutMutation, useLoginMutation } = authApi

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

// , prepareHeaders: (headers) => {
//
// 	const token = localStorage.getItem('token')
//
// 	if (token) {
// 		// Добавляем токен в заголовок Authorization
// 		headers.set('Authorization', `Bearer ${token}`)
// 	}
//
// 	return headers
// }