import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react'
import { authActions } from 'modules/authModules'
import { baseQuery } from 'modules/api/baseQuery'

export const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery(
			{
				url: 'auth/update-tokens',
				method: 'POST'
			},
			api,
			extraOptions
		)
		if (refreshResult.data) {
			// @ts-ignore
			api.dispatch(authActions.setToken({ token: refreshResult.data.accessToken }))
			// @ts-ignore
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
			api.dispatch(authActions.setToken({ token: null }))
		}
	}
	return result
}
