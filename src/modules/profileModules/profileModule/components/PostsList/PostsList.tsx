import React from 'react'
import s from './PostsList.module.scss'
import { postActions, selectPageNumber, useFetchPostsQuery } from 'modules/postModules'
import { Post } from '../Post/Post'
import { useAppSelector } from 'assets/hooks/useAppSelector'
import { useAppDispatch } from 'assets/hooks/useAppDispatch'
import InfiniteScroll from 'react-infinite-scroll-component'

type PropsType = {
	profileId: number
}

export const PostsList = ({ profileId }: PropsType) => {
	const pageNumber = useAppSelector(selectPageNumber)
	const dispatch = useAppDispatch()

	const { data: posts, isLoading } = useFetchPostsQuery(
		{ userId: profileId, pageNumber: pageNumber },
		{ skip: !profileId }
	)

	return posts?.items.length ? (
		<InfiniteScroll
			next={() => dispatch(postActions.setPageNumber(pageNumber + 1))}
			hasMore={posts.items.length < posts.totalCount}
			loader={isLoading}
			dataLength={posts.items.length}
		>
			<div className={s.container}>
				{posts?.items?.map(post => (
					<div key={post.id}>
						<Post post={post} />
					</div>
				))}
			</div>
		</InfiniteScroll>
	) : (
		<>{'Create your first post!'}</>
	)
}
