import { Meta } from '@storybook/react'
import {useState} from 'react';
import {Button} from '../../../../src/components/Button/Button';
import {TitlePopup} from '../../../../src/components/TitlePopup/TitlePopup';

export default {
  title: 'Components/Feedback/Title Popup',
  component: TitlePopup,
  parameters: {
    backgrounds: {default: 'dark'}
  }
} as Meta<typeof TitlePopup>

export const Default = {
  render: (args: {title: string, onClose: () => void}) => {
    const [open, setOpen] = useState(false)
    return <>
      {open ? <TitlePopup {...args} title={'Title popup!'} onClose={() => setOpen(!open)}/> : null}
      {!open ? <Button callback={() => setOpen(true)} title={'Popup!'}/> : null}
    </>
  }
}
