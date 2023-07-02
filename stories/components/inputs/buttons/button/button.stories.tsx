import { Meta } from '@storybook/react'
import { Button } from '../../../../../src/components/Button/Button'
import {SoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Components/Data Entry/Buttons/Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta<typeof Button>

export const Default = {
  render: (args: {title: string, disabled: boolean}) => {
    return (
        <SoriesWrapper>
         <Button {...args} callback={action('clicked')} />
        </SoriesWrapper>
    )
  },
  args: {
    title: 'Button',
    disabled: false,
  },
}
