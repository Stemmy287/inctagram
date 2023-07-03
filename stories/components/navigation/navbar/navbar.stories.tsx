import { Meta } from '@storybook/react'
import {Navbar} from '../../../../src/components/Navbar/Navbar';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'store/store';


export default {
  title: 'Components/Navigation/Navbar',
  component: Navbar,
  decorators: [(Story) => <Provider store={store}><Story /></Provider>],
} as Meta<typeof Navbar>

export const Primary = {
  args: {}
}