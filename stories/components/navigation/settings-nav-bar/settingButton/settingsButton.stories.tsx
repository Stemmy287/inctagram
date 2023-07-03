import { Meta } from '@storybook/react'
import {StoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';
import {SettingButton} from '../../../../../src/components/Button/SettingButton/SettingButton';

export default {
  title: 'Components/Navigation/Settings Navbar/Settings Button',
  component: SettingButton,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  decorators: [(Story) => <StoriesWrapper><Story /></StoriesWrapper>],
  argTypes: {
    title: {
      options: ['General information', 'Devices', 'Account Management', 'My payments'],
      control: { type: 'radio' }
    }
  }
} as Meta<typeof SettingButton>

export const Default = {
  render: (args: {title: string, disabled: boolean}) => {
    return <SettingButton {...args} callback={action('clicked')}   />
  },
  args: {
    title: 'General information'
  }
}


