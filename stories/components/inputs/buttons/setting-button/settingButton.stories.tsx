import { Meta } from '@storybook/react'
import { SettingButton } from '../../../../../src/components/Button/SettingButton/SettingButton'
import {VerticalContainer} from '../../../../../storybook-utils/components/containers/vertical';

export default {
  title: 'Components/Data Entry/Buttons/Setting Button',
  component: SettingButton,
} as Meta<typeof SettingButton>


export const Default = {
  // @ts-ignore
  render: args => {
    return (
        <VerticalContainer>
          <SettingButton {...args}  />
        </VerticalContainer>
    )
  },
  args: {
    title: 'setting'
  },
}
