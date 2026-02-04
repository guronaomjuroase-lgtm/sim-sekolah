"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";

export default function AgendaPage() {
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

    // Dummy Data
    const events = [
        { id: 1, title: "Ujian Nasional", date: new Date(year, month, 5), time: "07:30 - 12:00", location: "Ruang Kelas" },
        { id: 2, title: "Rapat Guru", date: new Date(year, month, 12), time: "13:00 - 15:00", location: "Ruang Guru" },
        { id: 3, title: "Pentas Seni", date: new Date(year, month, 20), time: "08:00 - 16:00", location: "Lapangan Utama" },
        { id: 4, title: "Upacara Bendera", date: new Date(year, month, 24), time: "07:00 - 08:00", location: "Lapangan Upacara" },
    ];

    const renderCalendarDays = () => {
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Empty cells for previous month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 md:h-32 border bg-muted/20" />);
        }

        // Days of month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const dayEvents = events.filter(e => e.date.getDate() === day && e.date.getMonth() === month && e.date.getFullYear() === year);
            const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();

            days.push(
                <div key={day} className={`h-24 md:h-32 border p-2 relative group hover:bg-muted/30 transition-colors ${isToday ? 'bg-primary/5' : ''}`}>
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

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Agenda Sekolah</h1>

            <div className="max-w-5xl mx-auto bg-card border rounded-lg shadow-sm overflow-hidden">
                {/* Calendar Header */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                    <button onClick={prevMonth} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-xl font-bold">{monthName} {year}</h2>
                    <button onClick={nextMonth} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 text-center border-b bg-muted/10">
                    {['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map(day => (
                        <div key={day} className="py-2 text-sm font-semibold text-muted-foreground">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-background">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Upcoming Events List */}
            <div className="max-w-5xl mx-auto mt-12">
                <h2 className="text-2xl font-bold mb-6">Agenda Bulan Ini</h2>
                <div className="space-y-4">
                    {events.map((event) => (
                        <div key={event.id} className="flex gap-4 p-4 border rounded-lg items-center bg-card hover:bg-muted/20 transition-colors">
                            <div className="flex-shrink-0 w-16 text-center bg-muted/50 rounded p-2">
                                <div className="text-xl font-bold text-primary">{event.date.getDate()}</div>
                                <div className="text-xs uppercase">{monthName.substring(0, 3)}</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">{event.title}</h3>
                                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {event.time}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" /> {event.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
