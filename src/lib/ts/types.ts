export interface CalendarEvent {
	color: string | null;
    created_at: string;
    description: string;
    end: string;
    id: string;
    start: string;
    title: string;
}

export interface BoardPost {
    id: string;
    subject: string;
    description: string;
    created_at: string;
    render_date: string;
}