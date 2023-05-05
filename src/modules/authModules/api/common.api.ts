import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const API_URL = 'https://inctagram-api-git-main-shuliakleonid.vercel.app/api/'

export const api = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: API_URL, prepareHeaders: (headers) => {

			const token = localStorage.getItem('token');

			if (token) {
				// Добавляем токен в заголовок Authorization
				headers.set('Authorization', `Bearer ${token}`);
			}

			return headers;
		} }),
	tagTypes: ['API'],

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

export const { login, logout, me } = api.endpoints

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


