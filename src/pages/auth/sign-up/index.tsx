import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/BaseLayout/BaseLayout'
import { SignUp } from '@/modules/authModules/signUp/registration/SignUp'

const SignUpPage: NextPageWithLayout = () => <SignUp />

SignUpPage.getLayout = getLayout
export default SignUpPage
