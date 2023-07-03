import {Meta} from '@storybook/react'
import {Input} from '../../../../src/components/Input/Input'
import {useState} from 'react';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
    title: 'Components/Data Entry/Text Field',
    component: Input,
    parameters: {
        backgrounds: {default: 'dark'}
    },
    argTypes: {
        title: {
            options: ['Password Field', 'Text Field'],
            control: {type: 'radio'},
        },
        error: {
            options: ['Some error occurred', null],
            control: {type: 'radio'},
        },
        disabled: {
            options: [true, false],
            control: {type: 'radio'},
        },
        password: {
            options: [true, null],
            control: {type: 'radio'},
        },
    },
    decorators: [(Story) => <StoriesWrapper><Story/></StoriesWrapper>]
} as Meta<typeof Input>

export const Default = {
    render: (args: { title: string, disabled: boolean, error: string, name: string, password: boolean }) => {
        const [text, setText] = useState('Text Field')
        return <Input onChange={e => setText(e.currentTarget.value)} value={text} {...args}/>
    },
    args: {
        title: 'Text Field',
        disabled: false,
        error: '',
        name: 'Need for ...register in react-hook form',
        password: null
    }
}



