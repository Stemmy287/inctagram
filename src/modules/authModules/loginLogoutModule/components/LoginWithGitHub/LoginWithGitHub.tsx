import React, { useEffect } from 'react'
import Image from 'next/image'
import gitHubLogo from '../../../../../../public/icons/github-icon.svg'
import { NextPageWithLayout } from 'pages/_app'

const CLIENT_ID = '0438b7c9f52d8d95fe3f'

const GitHubSignIn: NextPageWithLayout = () => {
	useEffect(() => {
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		const codeParam = urlParams.get('code')
		console.log(codeParam)
	}, [])

	function loginWithGithub() {
		window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
	}

	return (
		<>
			<Image
				src={gitHubLogo}
				onClick={() => loginWithGithub()}
				alt={'sing in using github account'}
			/>
		</>
	)
}

export default GitHubSignIn
