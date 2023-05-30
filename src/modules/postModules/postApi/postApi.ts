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
		fetchPosts: builder.query<ResponseType, number>({
			query: userId => `posts/${userId}`
		})
	})
})

export type ResponseType<D = PostType[]> = {
	totalCount: number
	pagesCount: number
	page: number
	pageSize: number
	items: D
}

export type PostType = {
	id: number
	description: string
	location: string
	images: ImagesType[]
	createdAt: string
	updatedAt: string
}

export type ImagesType = {
	url: string
	width: number
	height: number
	fileSize: number
	uploadId: string
}

export const { useFetchPostsQuery } = postApi
