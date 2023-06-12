import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'

type PropsType = {
	onClose: () => void
}
export const DatePick = () => {
	const [startDate, setStartDate] = useState<Date>(new Date())
	return (
		<>
			<DatePicker showIcon selected={startDate} onChange={(date: Date) => setStartDate(date)} />
		</>
	)
}
