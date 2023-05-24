import React, { ChangeEvent } from 'react'
import { useUploadImageMutation } from '@/modules/profileModules/uploadImage/uploadImageApi'

export const UploadImage = () => {
	const [uploadImage] = useUploadImageMutation()

	const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0]
			uploadImage(file)
		}
	}

	return (
		<div>
			<input
				type="file"
				onChange={uploadHandler}
			/>
		</div>
	)
}
