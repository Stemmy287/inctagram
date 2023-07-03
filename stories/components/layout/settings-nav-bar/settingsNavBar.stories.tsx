import { Meta } from '@storybook/react'
import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {SettingsNavBar} from '../../../../src/components/SettingsNavBar/SettingsNavBar';


export default {
    title: 'Components/Layout/Settings Navbar',
    component: SettingsNavBar,
    // decorators: [(Story) => <Provider store={store}><Story /></Provider>],
} as Meta<typeof SettingsNavBar>

export const Primary = {
    args: {

    }
}