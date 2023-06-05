export const setImageFilter = async (
	croppedPics: File,
	filter: string
): Promise<{ file: Blob; url: string } | null> => {
	const img = new Image()
	img.src = URL.createObjectURL(croppedPics)
	await new Promise(resolve => {
		img.onload = resolve
	})

	const originalWidth = img.naturalWidth
	const originalHeight = img.naturalHeight

	const canvas = document.createElement('canvas')

	const context = canvas.getContext('2d')

	canvas.width = originalWidth
	canvas.height = originalHeight

	if (context) {
		context.filter = filter

		context.drawImage(img, 0, 0, canvas.width, canvas.height)

		return new Promise<{ file: Blob; url: string }>((resolve, reject) => {
			canvas.toBlob(blob => {
				if (!blob) {
					return reject(new Error('Failed to create a blob'))
				}
				const modifiedFile = new File([blob], 'filtered.jpeg', { type: blob.type })
				resolve({ file: modifiedFile, url: canvas.toDataURL() })
			}, 'image/jpeg')
		})
	} else {
		return null
	}
}
