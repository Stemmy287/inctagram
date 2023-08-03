import { Meta } from '@storybook/react'
import {Preloader} from '../../../../src/components/Preloader/Preloader';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
  title: 'Components/Feedback/Preloader',
  component: Preloader,
  decorators: [(Story) => <StoriesWrapper><Story/></StoriesWrapper>],
  parameters: {
    backgrounds: {default: 'dark'},
    controls: {disable: true}
  }
} as Meta<typeof Preloader>
export const Default = {
}
