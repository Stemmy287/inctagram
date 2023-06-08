import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'
import { profileActions } from '../profileReducer/profileReducer'

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithReauth,
	endpoints: build => {
		return {
			getUser: build.query<FetchUserResponseType, void>({
				query: () => 'users/profile',
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					const res = await queryFulfilled
					dispatch(profileActions.setAva({ ava: res.data.avatars[0].url }))
				}
			}),
			createProfile: build.mutation<FetchUserResponseType, ProfileType>({
				query: body => ({
					url: 'users/profile',
					method: 'PUT',
					body
				})
			}),
			uploadImage: build.mutation<UploadImageType, FormData | File>({
				query: body => ({
					url: 'users/profile/avatar',
					method: 'POST',
					body
				})
			}),
			deleteImage: build.mutation<void, void>({
				query: () => ({
					url: 'users/profile/avatar',
					method: 'DELETE'
				})
			})
		}
	}
})

export const {
	useGetUserQuery,
	useCreateProfileMutation,
	useDeleteImageMutation,
	useUploadImageMutation
} = profileApi

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

type UploadImageType = {
	avatars: AvatarsType[]
}
