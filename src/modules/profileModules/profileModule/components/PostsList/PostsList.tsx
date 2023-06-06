import React, {useEffect, useState} from 'react'
import s from './PostsList.module.scss'
import {useFetchPostsQuery} from '@/modules/postModules/postApi/postApi'
import Image from 'next/image';

type PropsType = {
    profileId: number
}

export const PostsList = ({profileId}: PropsType) => {
    const [skip, setSkip] = useState(true)

    const {data: posts} = useFetchPostsQuery(profileId, {skip})

    useEffect(() => {
        if (profileId) {
            setSkip(false)
        }
    }, [profileId])

    console.log(posts)

    return <>
        {posts?.items.length
            ? <div className={s.container}>
                {posts?.items?.map(post =>
                    <div key={post.id} className={s.post}>
                        <Image src={post.images[0].url} alt='post img' width={230} height={230}/>
                    </div>
                )}
            </div>
            : 'Create your new post!'
        }
    </>
}
