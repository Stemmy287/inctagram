import { Meta } from '@storybook/react'

import { Button } from '../../../../../src/components/Button/Button'
import {VerticalContainer} from '../../../../../storybook-utils/components/containers/vertical';


export default {
  title: 'Components/Data Entry/Buttons/Button',
  component: Button,
} as Meta<typeof Button>




export const Default = {
// @ts-ignore
  render: args => {
    return (
        <VerticalContainer>
         <Button {...args}  />
        </VerticalContainer>
    )
  },
  args: {
    title: 'Button',
    disabled: false
  },
}
