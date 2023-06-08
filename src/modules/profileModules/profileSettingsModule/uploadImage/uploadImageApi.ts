import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/modules/authModules'
import { AvatarsType } from '@/modules/profileModules/profileSettingsModule/createProfile/createProfileApi'

export const uploadImageApi = createApi({
	reducerPath: 'uploadImageApi',
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
	endpoints: build => ({
		uploadImage: build.mutation<UploadImageType, File | FormData>({
			query: file => ({
				url: 'users/profile/avatar',
				method: 'POST',
				body: file
			})
		}),
		deleteImage: build.mutation<void, void>({
			query: () => {
				return {
					method: 'DELETE',
					url: 'users/profile/avatar'
				}
			}
		})
	})
})
export const { useUploadImageMutation } = uploadImageApi

type UploadImageType = {
	avatars: AvatarsType[]
}
