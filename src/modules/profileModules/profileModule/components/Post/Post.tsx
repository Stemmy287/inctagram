import React from 'react';
import s from './Post.module.scss'
import Image from 'next/image';
import {FetchPostResponseType} from '@/modules/postModules/postApi/postApi';

type PropsType = {
    post: FetchPostResponseType
}

export const Post = ({post}: PropsType) => {
    return (
        <div className={s.container}>
            <Image
                src={post?.images[0].url}
                alt='post img'
                width={post.images[0].width}
                height={post.images[0].height}
            />
        </div>
    );
};

