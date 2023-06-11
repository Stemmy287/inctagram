import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../api/baseQueryWithReauth'
import { profileActions } from '../profileReducer/profileReducer'

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		fetchProfile: builder.query<FetchUserResponseType, null>({
			query: () => ({
				url: 'users/profile',
				method: 'GET'
			}),
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				dispatch(profileActions.setUser({ user: res.data }))
			}
		}),
		createProfile: builder.mutation<FetchUserResponseType, ProfileType>({
			query: body => ({
				url: 'users/profile',
				method: 'PUT',
				body
			})
		}),
		uploadImage: builder.mutation<UploadImageType, FormData | File>({
			query: body => ({
				url: 'users/profile/avatar',
				method: 'POST',
				body
			})
		}),
		deleteAvatar: builder.mutation<void, void>({
			query: () => ({
				url: 'users/profile/avatar',
				method: 'DELETE'
			})
		})
	})
})

export const {
	useFetchProfileQuery,
	useCreateProfileMutation,
	useUploadImageMutation,
	useDeleteAvatarMutation
} = profileApi

export type ProfileType = {
	id: number
	userName: string
	firstName: string
	lastName: string
	city: string
	dateOfBirth: string
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
