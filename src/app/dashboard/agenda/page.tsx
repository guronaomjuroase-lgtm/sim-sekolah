import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Upload, Calendar, MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardAgendaPage() {
    const supabase = await createClient();
    const { data: agendas } = await supabase.from('agendas').select('*').order('event_date', { ascending: false });

    return (
        <div className="container min-h-screen py-12 mx-auto">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                        &larr; Kembali ke Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold font-heading">Kelola Agenda</h1>
                    <p className="text-muted-foreground">Daftar agenda kegiatan sekolah.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard/agenda/upload" className="inline-flex items-center gap-2 px-4 py-2 bg-white border shadow-sm rounded-full text-sm font-bold hover:bg-muted transition-colors">
                        <Upload className="h-4 w-4" /> Import CSV
                    </Link>
                    <Link href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 shadow-md">
                        <Plus className="h-4 w-4" /> Tambah Manual
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agendas?.map((agenda) => (
                    <div key={agenda.id} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-2 bg-primary/10 text-primary rounded-lg text-center min-w-[3.5rem]">
                                <span className="block text-xl font-bold leading-none">{new Date(agenda.event_date).getDate()}</span>
                                <span className="text-[10px] uppercase font-bold">{new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(agenda.event_date))}</span>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${new Date(agenda.event_date) < new Date() ? 'bg-muted text-muted-foreground' : 'bg-green-100 text-green-700'}`}>
                                {new Date(agenda.event_date) < new Date() ? 'Selesai' : 'Akan Datang'}
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{agenda.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{agenda.description}</p>

                        <div className="space-y-2 text-xs text-muted-foreground border-t pt-3">
                            <div className="flex items-center gap-2">
                                <Clock className="h-3.5 w-3.5" /> {agenda.start_time || '-'}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5" /> {agenda.location || '-'}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
