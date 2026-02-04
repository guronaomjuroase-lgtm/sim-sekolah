"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";

type AgendaEvent = {
    id: string;
    title: string;
    description: string;
    event_date: string; // ISO Date string
    start_time: string;
    location: string;
};

export function AgendaCalendar({ initialEvents }: { initialEvents: AgendaEvent[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(currentDate);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const today = new Date();

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border-b border-r bg-muted/20" />);
        }

        // Days of month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);

            // Filter events for this day
            const dayEvents = initialEvents.filter(e => {
                const eventDate = new Date(e.event_date);
                return eventDate.getDate() === day &&
                    eventDate.getMonth() === month &&
                    eventDate.getFullYear() === year;
            });

            const isToday = date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            days.push(
                <div key={day} className={`h-24 md:h-32 border-b border-r p-2 relative group hover:bg-muted/30 transition-colors ${isToday ? 'bg-primary/5' : ''}`}>
                    <span className={`text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                        {day}
                    </span>
                    <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-2rem)]">
                        {dayEvents.map(event => (
                            <div key={event.id} className="text-xs bg-primary/10 text-primary p-1 rounded truncate border-l-2 border-primary cursor-pointer hover:bg-primary/20" title={event.title}>
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    // Filter events for list view (current month only)
    const currentMonthEvents = initialEvents.filter(e => {
        const eventDate = new Date(e.event_date);
        return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    }).sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

    return (
        <>
            <div className="max-w-5xl mx-auto bg-card border rounded-xl shadow-sm overflow-hidden mb-12">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-6 border-b bg-card">
                    <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-full transition-colors border">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-bold font-heading">{monthName} {year}</h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-full transition-colors border">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 text-center border-b bg-muted/30">
                    {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map(day => (
                        <div key={day} className="py-3 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-background border-l border-t">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Upcoming Events List */}
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                    <Clock className="text-primary h-6 w-6" />
                    Agenda Bulan Ini
                </h2>
                {currentMonthEvents.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {currentMonthEvents.map((event) => {
                            const date = new Date(event.event_date);
                            return (
                                <div key={event.id} className="flex gap-4 p-5 border rounded-xl items-start bg-card hover:shadow-md transition-all hover:-translate-y-1">
                                    <div className="flex-shrink-0 w-16 text-center bg-primary/10 rounded-lg p-2 text-primary">
                                        <div className="text-2xl font-bold">{date.getDate()}</div>
                                        <div className="text-xs font-bold uppercase">{monthName.substring(0, 3)}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg leading-tight mb-2">{event.title}</h3>
                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3.5 w-3.5 text-primary" /> {event.start_time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3.5 w-3.5 text-secondary-foreground" /> {event.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground">
                        Tidak ada agenda untuk bulan ini.
                    </div>
                )}
            </div>
        </>
    );
}
