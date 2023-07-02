import {Meta} from '@storybook/react'
import {DatePick} from '../../../../src/components/DatePicker/DatePicker'
import {StoriesWrapper} from '../../../../storybook-utils/components/containers/vertical';
import {ValuePreview} from '../../../../storybook-utils/components/previews/value-preview';
import {useState} from 'react';

export default {
    title: 'Components/Data Entry/Date Picker',
    component: DatePick,
} as Meta<typeof DatePick>

export const Default = {
    render: (args: any) => {
        const [startDate, setStartDate] = useState<Date>(new Date());
        return (
            <StoriesWrapper>
                <DatePick {...args} selected={startDate} onChange={(date: Date) => setStartDate(date)}/>
                <ValuePreview>checked: {String(startDate)}</ValuePreview>
            </StoriesWrapper>
        )
    },
    args: {
    },
}
