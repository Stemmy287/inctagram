import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { postActions } from 'modules/postModules/postReducer/postReducer'
import { baseQueryWithReauth } from 'modules/api/baseQueryWithReauth'

export const postApi = createApi({
	reducerPath: 'postApi',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({
		addPostPhoto: builder.mutation<ImagesType, File>({
			query: file => {
				const formData = new FormData()
				formData.append('file', file)

				return {
					url: 'posts/image',
					method: 'POST',
					body: formData
				}
			},
			async onQueryStarted(_, { dispatch, queryFulfilled }) {
				const res = await queryFulfilled
				dispatch(postActions.setUploadId({ uploadId: res.data.images[0].uploadId }))
			}
		}),
		addPost: builder.mutation<FetchPostResponseType, PostType>({
			query: body => ({
				url: 'posts',
				method: 'POST',
				body
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

export type ImagesType = {
	images: ImagesTypeImages[]
}

type ImagesTypeImages = {
	url: string
	width: number
	height: number
	fileSize: number
	uploadId: string
}
