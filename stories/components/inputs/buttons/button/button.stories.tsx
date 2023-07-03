import {Meta} from '@storybook/react'
import {Button} from '../../../../../src/components/Button/Button'
import {StoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
    title: 'Components/Data Entry/Buttons/Button',
    component: Button,
    parameters: {
        backgrounds: {default: 'dark'}
    },
    argTypes: {
        style: {
            options: ['opacity', 'white', null],
            control: { type: 'radio' },
        }
    },
    decorators: [(Sory) => <StoriesWrapper><Sory/></StoriesWrapper>]
} as Meta<typeof Button>

export const Default = {
    render: (args: { title: string, disabled: boolean }) => {
        return <Button {...args}  />
    },
    args: {
        title: 'Button',
        disabled: false,
        callback: action('clicked')
    }
}
