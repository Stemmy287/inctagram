import { createApi } from '@reduxjs/toolkit/query/react'
import { createProfileActions } from 'modules/profileModules/createProfile/createProfileReducer'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'

export const createProfileApi = createApi({
	reducerPath: 'createProfileApi',
	baseQuery: baseQueryWithReauth,
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
				query: body => {
					return {
						url: 'users/profile',
						method: 'PUT',
						body
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
	dateOfBirth: string
	aboutMe: string
	avatars: AvatarsType[]
}
export type AvatarsType = {
	url: string
	width: number
	height: number
	fileSize: number
}
