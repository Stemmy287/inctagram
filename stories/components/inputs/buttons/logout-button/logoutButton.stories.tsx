import { Meta } from '@storybook/react'
import { LogoutButton } from '../../../../../src/components/Button/LogoutButton/LogoutButton'
import {StoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {Provider} from 'react-redux';
import { store } from 'store/store'

export default {
  title: 'Components/Data Entry/Buttons/Logout Button',
  component: LogoutButton,
    decorators: [(Story) => <Provider store={store}><StoriesWrapper><Story/></StoriesWrapper></Provider>],
    parameters: {
        backgrounds: {default: 'dark'},
        controls: {disable: true}
    }
} as Meta<typeof LogoutButton>

export const Default = {
}
