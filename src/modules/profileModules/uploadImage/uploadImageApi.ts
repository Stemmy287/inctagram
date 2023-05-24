import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/modules/authModules'

export const uploadImageApi = createApi({
	reducerPath: 'uploadImageApi',
	baseQuery: fetchBaseQuery({
		credentials: 'include',
		baseUrl: API_URL, prepareHeaders: (headers) => {
			const token = localStorage.getItem('token')
			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}
			return headers
		}
	}),
	endpoints: (build) => {
		return {
			uploadImage: build.mutation<any, File>({
				query: (file) => {
					const formData = new FormData()
					formData.append('file', file)

					return {
						method: 'POST',
						url: 'users/profile/avatar',
						body: formData
					}
				}
			})
		}
	}
})
export const { useUploadImageMutation } = uploadImageApi
