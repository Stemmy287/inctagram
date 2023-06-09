import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {baseQueryWithReauth} from 'modules/api/baseQueryWithReauth'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Posts'],
    endpoints: builder => ({
        fetchPosts: builder.query<ResponseType<FetchPostResponseType[]>, { userId:number, pageNumber: number }>({
            query: ({ userId, pageNumber }) => `posts/${userId}?pageNumber=${pageNumber}&pageSize=9`,
            providesTags: ['Posts']
        }),
        addPostPhoto: builder.mutation<{ images: ImagesType[] }, File>({
            query: file => {
                const formData = new FormData()
                formData.append('file', file)

                return {
                    method: 'POST',
                    url: 'posts/image',
                    body: formData
                }
            },
        }),
        addPost: builder.mutation<FetchPostResponseType, PostType>({
            query: body => ({
                url: 'posts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Posts']
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
