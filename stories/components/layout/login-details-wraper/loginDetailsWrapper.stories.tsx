import { Meta } from '@storybook/react'
import {LoginDetailsWrapper} from '../../../../src/components/LoginDetailsWrapper/LoginDetailsWrapper';

export default {
    title: 'Components/Layout/Login Details Wrapper',
    component: LoginDetailsWrapper,
} as Meta<typeof LoginDetailsWrapper>

export const Default = {
    render: (args: {}) => {
        return <LoginDetailsWrapper >
            <h1 style={{color: '#b4b4b4'}}>Login Form</h1>
            <h3 style={{color: '#b4b4b4'}}>Login Form</h3>
        </LoginDetailsWrapper>
    },
}

