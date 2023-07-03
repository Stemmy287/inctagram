import { Meta } from '@storybook/react'
import {NotificationPage} from '../../../../src/components/NotificationPage/NotificationPage';
import img from '../../../../public/images/defaultPhoto.png'


export default {
  title: 'Components/Feedback/Notification Page',
  component: NotificationPage,
} as Meta<typeof NotificationPage>

export const Default = {
  args: {
    title: 'NotificationPage',
    message: 'Lorem ipsum dolor sit amet. Sit iure deleniti ' +
        'et rerum modi ut molestias excepturi et dolorum saepe in' +
        ' pariatur illum sed dolore voluptas?',
    image: img
  }
}

