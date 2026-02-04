import { createClient } from "@/lib/supabase/server";
import { AgendaCalendar } from "@/components/features/agenda/AgendaCalendar";

export const dynamic = 'force-dynamic';

export default async function AgendaPage() {
    const supabase = await createClient();

    const { data: events, error } = await supabase
        .from('agendas')
        .select('*')
        .order('event_date', { ascending: true });

    if (error) {
        console.error("Error fetching agendas:", error);
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-primary font-bold tracking-wide uppercase text-sm">Kalender Akademik</span>
                <h1 className="text-4xl font-bold font-heading mt-2 mb-4">Agenda Sekolah</h1>
                <p className="text-muted-foreground">
                    Informasi jadwal kegiatan akademik dan non-akademik SMK Teladan Bangsa.
                </p>
            </div>

            <AgendaCalendar initialEvents={events || []} />
        </div>
    );
}
