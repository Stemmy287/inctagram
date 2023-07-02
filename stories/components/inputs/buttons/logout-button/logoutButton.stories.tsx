import { Meta } from '@storybook/react'
import { LogoutButton } from '../../../../../src/components/Button/LogoutButton/LogoutButton'
import {SoriesWrapper} from '../../../../../storybook-utils/components/containers/vertical';
import {Provider} from 'react-redux';
import { store } from 'store/store'

export default {
  title: 'Components/Data Entry/Buttons/Logout Button',
  component: LogoutButton,
} as Meta<typeof LogoutButton>

export const Default = {
  render: (args: {}) => {
      return (
        <SoriesWrapper>
          <Provider store={store}>
            <LogoutButton {...args}  />
          </Provider>
        </SoriesWrapper>
    )
  },
  args: {

  },
}
