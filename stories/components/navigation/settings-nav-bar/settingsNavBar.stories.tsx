import {Meta} from '@storybook/react'
import React from 'react';
import {SettingsNavBar} from '../../../../src/components/SettingsNavBar/SettingsNavBar';

export default {
    title: 'Components/Navigation/Settings Navbar',
    component: SettingsNavBar,
    parameters: {
        backgrounds: {default: 'dark'},
        controls: {disable: true}
    }
} as Meta<typeof SettingsNavBar>

export const Primary = {}