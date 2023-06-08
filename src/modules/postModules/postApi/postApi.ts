import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { postActions } from 'modules/postModules/postReducer/postReducer'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		fetchPosts: builder.query<ResponseType<FetchPostResponseType[]>, number>({
			query: userId => `posts/${userId}`
		}),
		addPostPhoto: builder.mutation<{images: ImagesType[]}, File>({
			query: file => {
				const formData = new FormData()
				formData.append('file', file)

				return {
					method: 'POST',
					url: 'posts/image',
					body: formData
				}
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				dispatch(postActions.setUploadId({ uploadId: res.data.images[0].uploadId }))
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

export const {useAddPostPhotoMutation, useAddPostMutation, useDeletePostMutation, useFetchPostsQuery} = postApi

export type PostType = {
	description: string
	childrenMetadata: ImagesType[]
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
