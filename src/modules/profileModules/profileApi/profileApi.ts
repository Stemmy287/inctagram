import { createApi } from '@reduxjs/toolkit/query/react'
import { FetchUserResponseType } from './createProfileApi'
import { baseQueryWithReauth } from '../../api/baseQueryWithReauth'


export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		fetchProfile: builder.query<FetchUserResponseType, void>({
			query: () => 'users/profile'
		})
	})
})

export const { useFetchProfileQuery } = profileApi
