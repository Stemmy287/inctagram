import { createImage } from '@/assets/utils/cropImage/cropImage'

export const setImageFilter = async (
	croppedPics: File,
	urlCroppedPics: string,
	filter: string
): Promise<{ file: Blob; url: string } | null> => {
	const img = await createImage(urlCroppedPics)

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	img.src = URL.createObjectURL(croppedPics)
	const originalWidth = img.naturalWidth
	const originalHeight = img.naturalHeight

	canvas.width = originalWidth
	canvas.height = originalHeight
	ctx.filter = filter

	// ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
	ctx.drawImage(img, 0, 0)

	const data = ctx.getImageData(0, 0, originalWidth, originalHeight)

	canvas.width = originalWidth
	canvas.height = originalHeight

	ctx.putImageData(data, 0, 0)

	return new Promise<{ file: Blob; url: string }>((resolve, reject) => {
		canvas.toBlob(blob => {
			if (!blob) {
				return reject(new Error('Failed to create a blob'))
				// return
			}
			const modifiedFile = new File([blob], 'filtered.jpeg', { type: 'img/jpeg' })
			resolve({ file: modifiedFile, url: canvas.toDataURL() })
			// resolve({ file: modifiedFile, url: URL.createObjectURL(modifiedFile) })
		}, 'image/jpeg')
	})

	// const canvas = document.createElement('canvas')
	// const context = canvas.getContext('2d')
	//
	// if (!context) {
	// 	return Promise.resolve(null)
	// }
	//
	// canvas.width = originalWidth
	// canvas.height = originalHeight
	// context.filter = filter
	//
	// context.drawImage(img, 0, 0, canvas.width, canvas.height)
	//
	// return new Promise<{ file: Blob; url: string }>((resolve, reject) => {
	// 	canvas.toBlob(blob => {
	// 		if (!blob) {
	// 			return reject(new Error('Failed to create a blob'))
	// 			// return
	// 		}
	// 		const modifiedFile = new File([blob], 'filtered.jpeg', { type: blob.type })
	// 		resolve({ file: modifiedFile, url: canvas.toDataURL() })
	// 	}, 'image/jpeg')
	// })
}
