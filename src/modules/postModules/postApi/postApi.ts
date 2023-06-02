import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const postApi = createApi({
	reducerPath: 'postApi',
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
		addPostPhoto: builder.mutation<ImagesType, File>({
			query: file => {
				const formData = new FormData()
				formData.append('file', file)

				return {
					method: 'POST',
					url: 'posts/image',
					body: formData
				}
			}
		}),
		addPost: builder.mutation<FetchPostResponseType, PostType>({
			query: data => ({
				url: 'posts',
				method: 'POST',
				body: data
			})
		}),
		deletePost: builder.mutation<void, string>({
			query: postId => ({
				url: `posts/${postId}`,
				method: 'DELETE'
			})
		})
	})
})

export const { useAddPostPhotoMutation, useAddPostMutation, useDeletePostMutation } = postApi
export type PostType = {
	description: string
}

export type FetchPostResponseType = {
	id: number
	description: string
	location: string
	images: ImagesType[]
	createdAt: Date
	updatedAt: string
}
export type ImagesType = {
	url: string
	width: number
	height: number
	fileSize: number
	uploadId: string
}
