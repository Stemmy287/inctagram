import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const googleApi = 'https://www.googleapis.com/oauth2/v1/'

export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['goog'],
	baseQuery: fetchBaseQuery({
		credentials: 'include',
		baseUrl: googleApi, prepareHeaders: (headers) => {
			const token = localStorage.getItem('googleToken')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
				headers.set('Accept', 'application/json')
			}
			return headers
		}
	}),
	endpoints: build => ({
		logg: build.mutation<any, string>({
			query: (access_token) => ({
				url: `userinfo?access_token=${access_token}`,
				method: 'GET'
			}),
			async onQueryStarted(_, { queryFulfilled }) {
				const res = await queryFulfilled
			}
		})
	})
})

export const { useLoggMutation } = api