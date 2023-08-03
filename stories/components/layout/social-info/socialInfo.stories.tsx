import { Meta } from '@storybook/react'
import {SocialInfo} from '../../../../src/components/SocialInfo/SocialInfo';
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';

export default {
    title: 'Components/Layout/Social info',
    component: SocialInfo,
    decorators: [(Story)=> <StoriesWrapper><Story/></StoriesWrapper>],
    parameters: {
        backgrounds: {default: 'dark'},
        controls: {disable: true}
    }
} as Meta<typeof SocialInfo>

export const Default = {
    render: (args: {count: string, title: string}) => {
        return <SocialInfo {...args}/>
    },
    args: {
        count: 'Social',
        title: 'info'
    }
}