import { Meta } from '@storybook/react'
import { Input } from '../../../../src/components/Input/Input'
import {useState} from 'react';
import {SoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
  title: 'Components/Data Entry/Text Field',
  component: Input,
} as Meta<typeof Input>

export const Default = {
  render: (args: {}) => {
    const [text, setText] = useState('Text Field')
    return (
        <SoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)}
                 value={text} name={'text'} title={'Text Field'}/>
        </SoriesWrapper>
    )
  }
}

export const DefaultError = {

  render: (args: {}) => {
    const [text, setText] = useState('error')
    return (
        <SoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)}
                 value={text} name={'text'} title={'Text Field'} error={'error'}/>
        </SoriesWrapper>
    )
  }
}

export const Password = {
  render: (args: {title: string, disabled: boolean, error: string, name: string, password: boolean}) => {
    const [text, setText] = useState('password')
    return (
        <SoriesWrapper>
          <Input onChange={e => setText(e.currentTarget.value)} value={text} {...args}/>
        </SoriesWrapper>
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



