import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '../../api/baseQueryWithReauth'
import { httpMethods } from '../../../assets/utils/httpMethods/httpMethods'

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: baseQueryWithReauth,
	tagTypes: ['Profile'],
	endpoints: builder => ({
		fetchProfile: builder.query<FetchUserResponseType, null>({
			query: () => 'users/profile',
			providesTags: ['Profile']
		}),
		createProfile: builder.mutation<FetchUserResponseType, ProfileType>({
			query: body => ({
				url: 'users/profile',
				method: httpMethods.PUT,
				body
			}),
			invalidatesTags: ['Profile']
		}),
		uploadImage: builder.mutation<UploadImageType, FormData | File>({
			query: body => ({
				url: 'users/profile/avatar',
				method: httpMethods.POST,
				body
			}),
			invalidatesTags: ['Profile']
		}),
		deleteAvatar: builder.mutation<void, void>({
			query: () => ({
				url: 'users/profile/avatar',
				method: httpMethods.DELETE
			}),
			invalidatesTags: ['Profile']
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
