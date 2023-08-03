import { Meta } from '@storybook/react'
import {Popup} from '../../../../src/components/Popup/Popup';
import {useState} from 'react';
import {Button} from '../../../../src/components/Button/Button';

export default {
  title: 'Components/Feedback/Popup',
  component: Popup,
  parameters: {
    backgrounds: {default: 'dark'},
    controls: {disable: true}
  }
} as Meta<typeof Popup>

export const Default = {
  render: (args: {onClose: ()=> void}) => {
    const [open, setOpen] = useState(false)
    return <>
      {open ? <Popup {...args} onClose={() => setOpen(!open)}>
        <div style={{margin: '100px'}}><h2 style={{color: 'lightgrey'}}>Test Popup!</h2></div>
      </Popup> : null}
      {!open ? <Button callback={() => setOpen(true)} title={'Popup!'}/> : null}
    </>
  }
}
