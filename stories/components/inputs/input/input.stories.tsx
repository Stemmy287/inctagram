import { Meta } from '@storybook/react'
import { Input } from '../../../../src/components/Input/Input'
import {useState} from 'react';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
  title: 'Components/Data Entry/Text Field',
  component: Input,
} as Meta<typeof Input>

export const Default = {
  render: (args: {}) => {
    const [text, setText] = useState('Text Field')
    return (
        <StoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)}
                 value={text} name={'text'} title={'Text Field'}/>
        </StoriesWrapper>
    )
  }
}

export const DefaultError = {

  render: (args: {}) => {
    const [text, setText] = useState('error')
    return (
        <StoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)}
                 value={text} name={'text'} title={'Text Field'} error={'error'}/>
        </StoriesWrapper>
    )
  }
}

export const Password = {
  render: (args: {title: string, disabled: boolean, error: string, name: string, password: boolean}) => {
    const [text, setText] = useState('password')
    return (
        <StoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)} value={text} {...args}/>
        </StoriesWrapper>
    )
  },
  args: {
    title: 'Password',
    disabled: false,
    error: '',
    name: 'text',
    password: true
  },
}



