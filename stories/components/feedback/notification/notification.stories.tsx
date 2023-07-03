import { Meta } from '@storybook/react'
import {Notification} from '../../../../src/components/Notification/Notification'
import {useState} from 'react';
import {Button} from '../../../../src/components/Button/Button';

export default {
  title: 'Components/Feedback/Notification',
  component: Notification,
  parameters: {
    backgrounds: {default: 'dark'}
  }
} as Meta<typeof Notification>

export const Default = {
  render: (args: {title: string, buttonTitle: string, message: string, onClose: () => void}) => {
    const [open, setOpen] = useState(false)
    return <>
      {open? <Notification {...args} onClose={()=> setOpen(!open)}/> : null}
      {!open? <Button callback={()=> setOpen(true)} title={'Notify'}/>: null}
    </>
  },
  args: {
    title: 'Notify',
    buttonTitle: 'OK',
    message: 'Lorem ipsum dolor sit amet. Sit iure deleniti ' +
        'et rerum modi ut molestias excepturi et dolorum saepe in' +
        ' pariatur illum sed dolore voluptas? Et sequi animi et voluptas itaque ' +
        'ut suscipit optio sit labore voluptas quo rerum exercitationem. ' +
        'In harum vero a dolores exercitationem est odio rerum. '
  }
}