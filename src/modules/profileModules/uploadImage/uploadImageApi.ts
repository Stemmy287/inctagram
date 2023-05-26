import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/modules/authModules'
import { string } from 'yup'
import { uploadImageActions } from './uploadImageReducer'

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
	endpoints: build => {
		return {
			uploadImage: build.mutation<any, File>({
				query: file => {
					const formData = new FormData()
					formData.append('file', file)

					return {
						method: 'POST',
						url: 'users/profile/avatar',
						body: formData
					}
				},
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					const res = await queryFulfilled
					dispatch(uploadImageActions.setAva({ ava: res.data.avatars[0].url }))
				}
			}),
			deleteImage: build.mutation<any, any>({
				query: () => {
					return {
						method: 'DELETE',
						url: 'users/profile/avatar'
					}
				}
			})
		}
	}
})
export const { useUploadImageMutation , useDeleteImageMutation} = uploadImageApi

type avatars = Array<avatarsType>

type avatarsType = {
	url: string
	width: number
	height: number
	fileSize: number
}
