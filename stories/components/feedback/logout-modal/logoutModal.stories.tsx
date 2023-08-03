import { Meta } from '@storybook/react'
import {LogoutModal} from '../../../../src/modules/authModules';
import {Provider} from 'react-redux';
import {store} from 'store/store';
import {useState} from 'react';
import {Button} from '../../../../src/components/Button/Button'

export default {
  title: 'Components/Feedback/Logout Modal',
  component: LogoutModal,
  decorators: [(Story) => <Provider store={store}><Story/></Provider>],
    parameters: {
        backgrounds: { default: 'dark' },
        controls: { disable: true }
    },

} as Meta<typeof LogoutModal>

export const Default = {
  render: (args: {setIsActive: (isActive: boolean) => void}) => {
      const [open, setOpen] = useState(false)
    return <>
              {open? <LogoutModal {...args} setIsActive={()=>setOpen(!open)}  /> : ''}
              <Button callback={()=> setOpen(true)} title={'Open logout Modal'}/>
        </>
  }
}
