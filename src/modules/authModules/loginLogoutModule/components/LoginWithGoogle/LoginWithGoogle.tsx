import React, { useState } from 'react'
import Image from 'next/image'
import { useGoogleLogin } from '@react-oauth/google'
import googleLogo from '../../../../../../public/icons/googleSvg.svg'
import { NextPageWithLayout } from 'pages/_app'

type ResponseGoogleType = {
	authuser: string
	code: string
	prompt: string
	scope: string
}

const GoogleSignIn: NextPageWithLayout = () => {
	const [code, setCode] = useState<ResponseGoogleType>()

	const login = useGoogleLogin({
		onSuccess: codeResponse => {
			setCode(codeResponse as ResponseGoogleType)
		},
		flow: 'auth-code'
	})

	return (
		<>
			<Image src={googleLogo} onClick={() => login()} alt={'sing in using google account'} />
		</>
	)
}

export default GoogleSignIn
