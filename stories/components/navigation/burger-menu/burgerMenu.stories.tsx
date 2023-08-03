import { Meta } from '@storybook/react'
import {BurgerMenu} from '../../../../src/components/BurgerMenu/BurgerMenu';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Components/Navigation/Burger menu',
  component: BurgerMenu,
  decorators: [(Story) => <StoriesWrapper><Story /></StoriesWrapper>],
  parameters: {
    backgrounds: {default: 'dark'},
    controls: {disable: true}
  }
} as Meta<typeof BurgerMenu>

export const Primary = {
  args: {
    onEditClick: action('onEditClick'),
    onDeleteClick: action('onDeleteClick')
  }
}