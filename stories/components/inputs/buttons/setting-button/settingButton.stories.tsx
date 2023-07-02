import { Meta } from '@storybook/react'
import { SettingButton } from '../../../../../src/components/Button/SettingButton/SettingButton'
import {SoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Components/Data Entry/Buttons/Setting Button',
  component: SettingButton,
} as Meta<typeof SettingButton>


export const Default = {
  render: (args: {title: string}) => {
    return (
        <SoriesWrapper>
          <SettingButton {...args} callback={action('clicked')} />
        </SoriesWrapper>
    )
  },
  args: {
    title: 'setting'
  },
}
