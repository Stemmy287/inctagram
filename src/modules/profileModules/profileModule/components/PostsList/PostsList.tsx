import React, { useEffect, useState } from 'react'
import s from './PostsList.module.scss'
import { useFetchPostsQuery } from '@/modules/postModules/postApi/postApi'
import { Post } from '@/modules/profileModules/profileModule/components/Post/Post'

type PropsType = {
	profileId: number
}

export const PostsList = ({ profileId }: PropsType) => {
	const [skip, setSkip] = useState(true)

	const { data: posts } = useFetchPostsQuery(profileId, { skip })

	useEffect(() => {
		if (profileId) {
			setSkip(false)
		}
	}, [profileId])

	return (
		posts?.items.length
			? <div className={s.container}>
				{posts?.items?.map(post => <Post key={post.id} post={post} />)}
			</div>
			: <>Create your first post!</>
	)
}
