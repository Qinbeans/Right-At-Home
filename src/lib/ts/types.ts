export interface CalendarEvent {
	id: string; //uuid
	title: string; //Event title
	description: string; //Event description
	start: Date;
	end: Date;
	color: "#ffffff";
}
//sort by start date
export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
	return events.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function getEventsByDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
	let day = new Date(date);
	//get events for the day
	//00:00:00.000 - hour:minute:second.millisecond
	day.setHours(0, 0, 0, 0);
	let dayEnd = new Date(day);
	//23:59:59.999
	dayEnd.setHours(23, 59, 59, 999);
	return events.filter((event) => {
		return event.start >= day && event.start <= dayEnd;
	});
}