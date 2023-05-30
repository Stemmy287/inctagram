import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/modules/authModules'
import { ProfileType } from '@/modules/profileModules/profileSettingsModule/createProfile/createProfileApi'

export const profileApi = createApi({
	reducerPath: 'profileApi',
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
		fetchProfile: builder.query<ProfileType, void>({
			query: () => 'users/profile'
		})
	})
})

export const { useFetchProfileQuery } = profileApi
