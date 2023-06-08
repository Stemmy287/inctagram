import React, { ChangeEvent } from 'react'
import { Button } from 'components/Button/Button'
import { useUploadImageMutation } from '../../profileApi/profileApi'

export const UploadImage = () => {
	const [uploadImage] = useUploadImageMutation()
	const inputRef = React.useRef<HTMLInputElement>(null)
	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			uploadImage(file)
		}
	}
	const refClick = () => inputRef.current?.click()
	return (
		<div>
			{/*<Image src='' alt='avatar'/>*/}
			<input
				ref={inputRef}
				accept="image/*"
				type="file"
				onChange={uploadHandler}
				style={{display:'none'}}
			/>
			<Button title='Add Avatar' callback={refClick}/>
		</div>
	)
}
