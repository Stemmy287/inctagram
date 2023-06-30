import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		fetchPosts: builder.query<
			ResponseType<FetchPostResponseType[]>,
			{ userId: number; pageNumber: number }
		>({
			query: ({ userId, pageNumber }) => `posts/${userId}?pageNumber=${pageNumber}&pageSize=12`,
			serializeQueryArgs: ({ endpointName}) => {
				return endpointName
			},
			merge: (currentCache, newItems) => {

				if (currentCache.page !== newItems.page) {
					currentCache.page = newItems.page
					currentCache.items.push(...newItems.items)
				}

			},
			forceRefetch({ currentArg, previousArg}) {
				return !(previousArg?.pageNumber === currentArg?.pageNumber)
			},
		}),
		addPostPhoto: builder.mutation<AddPostPhotoResponseType, FormData>({
			query: body => ({
				url: 'posts/image',
				method: 'POST',
				body
			})
		}),
		addPost: builder.mutation<FetchPostResponseType, PostType>({
			query: body => ({
				url: 'posts',
				method: 'POST',
				body
			}),
		}),
		editPost: builder.mutation<void, EditPostType>({
			query: body => ({
				url: `posts/${body.postId}`,
				method: 'PUT',
				body: {
					description: body.description
				},
			})
		}),
		deletePost: builder.mutation<void, string>({
			query: postId => ({
				url: `posts/${postId}`,
				method: 'DELETE'
			}),
		})
	})
})

export const {
	useAddPostPhotoMutation,
	useAddPostMutation,
	useEditPostMutation,
	useDeletePostMutation,
	useFetchPostsQuery
} = postApi

export type AddPostPhotoResponseType = {
	images: ImagesType[]
}

export type PostType = {
	description: string
	childrenMetadata: ChildrenMetadata[]
}

type ChildrenMetadata = {
	uploadId: string
}

export type FetchPostResponseType = {
	id: number
	description: string
	location: string
	images: ImagesType[]
	createdAt: Date
	updatedAt: string
}

type ImagesType = {
	url: string
	width: number
	height: number
	fileSize: number
	uploadId: string
}

export type ResponseType<D> = {
	totalCount: number
	pagesCount: number
	page: number
	pageSize: number
	items: D
}

export type EditPostType = {
	postId: string
	description: string
}
