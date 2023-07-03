import { Meta } from '@storybook/react'
import { Header } from '../../../../src/components/Header/Header'
import {Provider} from 'react-redux';
import { store } from 'store/store'
export default {
  title: 'Components/Layout/header',
  component: Header,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>],
  parameters: {
    backgrounds: {default: 'dark'},
    controls: {disable: true}
  }
} as Meta<typeof Header>

export const Default = {

}