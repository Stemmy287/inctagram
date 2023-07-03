import { Meta } from '@storybook/react'
import {TextArea} from '../../../../src/components/TextArea/TextArea';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';
import {useState} from 'react';

export default {
  title: 'Components/Data Entry/Textarea',
  component: TextArea,
  decorators: [(Story) => <StoriesWrapper><Story /></StoriesWrapper>],
  parameters: {
    backgrounds: {default: 'dark'}
  },
  argTypes: {
    error: {
      options: ['Some error was occurred', null],
      control: {type: 'radio'}
    }
  }
} as Meta<typeof TextArea>

export const Default = {
  render: (args: { title: string, disabled: boolean, error: string, name: string, password: boolean }) => {
    const [text, setText] = useState('Text Area')
    return <TextArea onChange={e => setText(e.currentTarget.value)} value={text} {...args}/>
  },
  args: {
    title: 'Text Field',
    error: ''
  }
}
