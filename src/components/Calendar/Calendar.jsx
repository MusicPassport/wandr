import React from 'react'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import '../../css/Calendar.css';

const Calendar = () => {
    const dateValue = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			10
		);
		const minDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			6
		);
		const maxDate = new Date(
			new Date().getFullYear(),
			new Date().getMonth(),
			25
		);
	const handleClick = (event) => {
		console.log(event)
		let startDate = event.target.title
		let date = startDate.split(' ')
		console.log(date)
		let weekday = date.splice(0,1)
		let month = (date.splice(0,1)).toString();
		console.log(month)
		console.log(date)
		let months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		]
		let monthNum = months.indexOf(month) +1
		console.log(monthNum)
	}
    return (
			<div>
				<div>
					<h1>Calendar</h1>
					{/* <CalendarComponent value={} min={} max={maxDate}></CalendarComponent> */}
					<CalendarComponent
						value={dateValue}
						min={minDate}
						max={maxDate}
						isMultiSelection={true} onClick={handleClick}></CalendarComponent>
				</div>
				<div>
					<h2>Display Events</h2>
				</div>
			</div>
		);
}

export default Calendar
