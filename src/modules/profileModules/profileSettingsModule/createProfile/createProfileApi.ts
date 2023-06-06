import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/modules/authModules'
import { createProfileActions } from '@/modules/profileModules/createProfile/createProfileReducer'

export const createProfileApi = createApi({
	reducerPath: 'createProfileApi',
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
	endpoints: build => {
		return {
			getUser: build.query<FetchUserResponseType, void>({
				query: () => 'users/profile',
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					const res = await queryFulfilled
					dispatch(createProfileActions.setAva({ ava: res.data.avatars[0].url }))
				}
			}),
			createProfile: build.mutation<FetchUserResponseType, ProfileType>({
				query: profileInfo => {
					return {
						method: 'PUT',
						url: 'users/profile',
						body: {
							profileInfo
						}
					}
				}
			})
		}
	}
})
export const { useGetUserQuery, useCreateProfileMutation } = createProfileApi

export type ProfileType = {
	id: number
	userName: string
	firstName: string
	lastName: string
	city: string
	dateOfBirth: Date
	aboutMe?: string
}
export type FetchUserResponseType = {
	id: number
	userName: string
	firstName: string
	lastName: string
	city: string
	dateOfBirth: Date
	aboutMe: string
	avatars: AvatarsType[]
}
export type AvatarsType = {
	url: string
	width: number
	height: number
	fileSize: number
}
