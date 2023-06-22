import { Meta } from '@storybook/react'
import { LogoutButton } from '../../../../../src/components/Button/LogoutButton/LogoutButton'
import {VerticalContainer} from '../../../../../storybook-utils/components/containers/vertical';
import {Provider} from 'react-redux';
import { store } from 'store/store'


export default {
  title: 'Components/Data Entry/Buttons/Logout Button',
  component: LogoutButton,
} as Meta<typeof LogoutButton>


export const Default = {
  // @ts-ignore
  render: args => {
    return (
        <VerticalContainer>
          <Provider store={store}>
            <LogoutButton {...args}  />
          </Provider>
        </VerticalContainer>
    )
  },
  args: {
  },
}
