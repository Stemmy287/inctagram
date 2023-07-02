import { Meta } from '@storybook/react'
import {TextArea} from '../../../../src/components/TextArea/TextArea';
import {SoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
  title: 'Components/Data Entry/Textarea',
  component: TextArea,
  decorators: [(Story) => <SoriesWrapper><Story /></SoriesWrapper>],
} as Meta<typeof TextArea>

export const Primary = {
  args: {
    title: 'Text Area',
    error: ''
  },
}

export const Invalid = {
  args: {
    title: 'Text Area With Error',
    error: 'Error'
  },
}
