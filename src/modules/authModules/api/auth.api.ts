import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authApi = createApi({
	reducerPath: 'authApi',
	tagTypes: ['authApi'],
	baseQuery: fetchBaseQuery({ baseUrl: API_URL, prepareHeaders: (headers) => {

			const token = localStorage.getItem('token');

			if (token) {
				// Добавляем токен в заголовок Authorization
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		} }),

	endpoints: builder => ({
		login: builder.mutation<LoginUpdateResponseType, any>({
			query: (arg: LoginParamsType) => ({
				body: arg,
				url: 'auth/login',
				method: 'POST'
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
		})
	})
})

export const {useMeQuery, useLogoutMutation, useLoginMutation} = authApi

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

