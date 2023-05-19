import React, { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { NextPageWithLayout } from '@/pages/_app'
import googleLogo from '/public/icons/googleSvg.svg'
import Image from 'next/image'
import axios from 'axios'


const GoogleSignIn: NextPageWithLayout = () => {

	const [user, setUser] = useState<any>([])
	const [profile, setProfile] = useState<any>([])

	const login = useGoogleLogin({
		onSuccess: (codeResponse) => setUser(codeResponse),
		onError: (error) => console.log('Login Failed:', error)
	})

	useEffect(() => {
			if (user) {
				axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
					headers: {
						Authorization: `Bearer ${user.access_token}`,
						Accept: 'application/json'
					}
				})
					.then((res) => {
						setProfile(res.data)
					})
			}
		},
		[user])


	return (
		<Image src={googleLogo} onClick={() => login()} alt={'sing in using google account'} />
	)
}


export default GoogleSignIn