import { Meta } from '@storybook/react'
import {LoadingLine} from '../../../../src/components/LoadingLine/LoadingLine';

export default {
  title: 'Components/Feedback/Loading Line',
  component: LoadingLine,
  parameters: {
    backgrounds: { default: 'dark' },
    controls: { disable: true }
  },
} as Meta<typeof LoadingLine>

export const Default = {
}
