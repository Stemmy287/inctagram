import { Meta } from '@storybook/react'
import {SelectLanguage} from '../../../../src/components/SelectLanguage/SelectLanguage';
import {OptionsSelectorType} from '../../../../src/components/SelectLanguage/types';
import unitedKingdom from '../../../../public/icons/FlagUnitedKingdom.svg';
import russia from '../../../../public/icons/FlagRussia.svg';
import {useRouter} from 'next/router';


const options = [
    { value: 'English',img: unitedKingdom },
    { value: 'Russian',img: russia }
]
export default {
    title: 'Components/Disclosure/Select Language',
    component: SelectLanguage,
    argTypes: {
        disabled: {
            options: [true, false],
            control: {type: 'radio'},
            defaultValue: true
        },
        options: {
            options: [options[0].value, options[1].value],
            control: {type: 'radio'},
        },
    }
} as Meta<typeof SelectLanguage>


export const Default = {
    render: (args: {	firstItem: OptionsSelectorType, options: OptionsSelectorType[],
        onChange: (data: OptionsSelectorType) => void, disabled?: boolean}) => {

        const {push, locale} = useRouter()
        const onSelectLanguage = (select: OptionsSelectorType) => {
            const locale = select.value === 'English' ? 'en' : 'ru'
            push('/', '/', { locale })
        }
        return <SelectLanguage {...args} options={options}
                               firstItem={ locale === 'en' ? options[0] : options[1]} onChange={onSelectLanguage}/>
    },
}