import React, { useEffect, useState } from 'react'
import s from './PostsList.module.scss'
import { useFetchPostsQuery } from '../../../../postModules/postApi/postApi'
import { Post } from '../Post/Post'
import { useAppSelector } from '../../../../../assets/hooks/useAppSelector'
import { selectPageNumber } from '../../../../postModules/postReducer/postReducer-selector'
import { postActions } from '../../../../postModules/postReducer/postReducer'
import { useAppDispatch } from '../../../../../assets/hooks/useAppDispatch'


type PropsType = {
	profileId: number
}

export const PostsList = ({ profileId }: PropsType) => {
	const [skip, setSkip] = useState(true)

	const pageNumber = useAppSelector(selectPageNumber)

	const dispatch = useAppDispatch()

	const { data: posts } = useFetchPostsQuery({userId: profileId, pageNumber: pageNumber }, { skip })

	useEffect(() => {
		if (profileId) {
			setSkip(false)
		}
	}, [profileId])

	return (
		posts?.items.length
			?<><div className={s.container}>
				{posts?.items?.map(post => <Post key={post.id} post={post} />)}
			</div><button onClick={() => dispatch(postActions.setPageNumber(pageNumber + 1))}>page+</button> </>
			: <>Create your first post!</>
	)
}
