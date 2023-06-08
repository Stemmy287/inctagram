import { createApi } from '@reduxjs/toolkit/query/react'
import { AvatarsType } from 'modules/profileModules/createProfile/createProfileApi'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'

export const uploadImageApi = createApi({
	reducerPath: 'uploadImageApi',
	baseQuery: baseQueryWithReauth,
	endpoints: build => ({
		uploadImage: build.mutation<UploadImageType, FormData>({
			query: body => ({
				url: 'users/profile/avatar',
				method: 'POST',
				body
			})
		}),
		deleteImage: build.mutation<void, void>({
			query: () => {
				return {
					url: 'users/profile/avatar',
					method: 'DELETE'
				}
			}
		})
	})
})

export const { useUploadImageMutation } = uploadImageApi

type UploadImageType = {
	avatars: AvatarsType[]
}
