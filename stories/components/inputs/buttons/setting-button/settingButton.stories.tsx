import { Meta } from '@storybook/react'
import { SettingButton } from '../../../../../src/components/Button/SettingButton/SettingButton'
import {StoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Components/Data Entry/Buttons/Setting Button',
  component: SettingButton,
} as Meta<typeof SettingButton>


export const Default = {
  render: (args: {title: string}) => {
    return (
        <StoriesWrapper>
          <SettingButton {...args} callback={action('clicked')} />
        </StoriesWrapper>
    )
  },
  args: {
    title: 'setting'
  },
}
