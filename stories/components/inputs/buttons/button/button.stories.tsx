import { Meta } from '@storybook/react'

import { Button } from '../../../../../src/components/Button/Button'
import {VerticalContainer} from '../../../../../storybook-utils/components/containers/vertical';
import {action, actions} from '@storybook/addon-actions';


export default {
  title: 'Components/Data Entry/Buttons/Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<typeof Button>

export const Default = {
// @ts-ignore
  render: args => {
    return (
        <VerticalContainer>
         <Button {...args} callback={action('clicked')} />
        </VerticalContainer>
    )
  },
  args: {
    title: 'Button',
    disabled: false,
  },
}
