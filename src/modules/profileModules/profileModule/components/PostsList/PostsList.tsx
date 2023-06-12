import React, { useEffect, useState } from 'react'
import s from './PostsList.module.scss'
import { useFetchPostsQuery } from 'modules/postModules'
import { Post } from '../Post/Post'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectPageNumber } from 'modules/postModules'

type PropsType = {
	profileId: number
}

export const PostsList = ({ profileId }: PropsType) => {
	const [skip, setSkip] = useState(true)

	const pageNumber = useAppSelector(selectPageNumber)

	const { data: posts } = useFetchPostsQuery({ userId: profileId, pageNumber: pageNumber }, { skip })

	useEffect(() => {

		if (profileId) {
			setSkip(false)
		}
	}, [profileId])

	return (
		<div className={s.container}>
			{posts?.items.length
				? posts?.items?.map(post => <Post key={post.id} post={post} />)
				: 'Create your first post!'}
		</div>
	)
}
