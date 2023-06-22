import { Meta } from '@storybook/react'
import { SettingButton } from '../../../../../src/components/Button/SettingButton/SettingButton'
import {VerticalContainer} from '../../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Components/Data Entry/Buttons/Setting Button',
  component: SettingButton,
} as Meta<typeof SettingButton>


export const Default = {
  // @ts-ignore
  render: args => {
    return (
        <VerticalContainer>
          <SettingButton {...args} callback={action('clicked')} />
        </VerticalContainer>
    )
  },
  args: {
    title: 'setting'
  },
}
