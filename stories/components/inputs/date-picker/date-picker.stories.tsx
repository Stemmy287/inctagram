import {Meta} from '@storybook/react'

import {DatePick} from '../../../../src/components/DatePicker/DatePicker'
import {VerticalContainer} from '../../../../storybook-utils/components/containers/vertical';
import {action} from "@storybook/addon-actions";
import {ValuePreview} from "../../../../storybook-utils/components/previews/value-preview";
import {useState} from "react";


export default {
    title: 'Components/Data Entry/Date Picker',
    component: DatePick,
} as Meta<typeof DatePick>


export const Default = {
// @ts-ignore
    render: args => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [startDate, setStartDate] = useState<Date>(new Date());
        return (
            <VerticalContainer>
                <DatePick {...args} selected={startDate} onChange={(date: Date) => setStartDate(date)}/>
                <ValuePreview>checked: {String(startDate)}</ValuePreview>
            </VerticalContainer>
        )
    },
    args: {
        showIcon: true
    },
}
