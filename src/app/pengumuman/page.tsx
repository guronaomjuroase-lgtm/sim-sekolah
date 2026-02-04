import { createClient } from "@/lib/supabase/server";
import { AlertCircle, Calendar, Pin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnnouncementsPage() {
    const supabase = await createClient();

    // Fetch announcements from database
    const { data: announcements, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    // Helper for formatting date
    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(dateString));
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center font-heading">Pengumuman Sekolah</h1>

            <div className="max-w-3xl mx-auto space-y-4">
                {announcements && announcements.length > 0 ? (
                    announcements.map((item) => (
                        <div
                            key={item.id}
                            className={`border rounded-xl p-6 bg-card shadow-sm transition-all hover:shadow-md ${item.importance_level === 'high' ? 'border-l-4 border-l-destructive' :
                                    item.importance_level === 'medium' ? 'border-l-4 border-l-yellow-500' :
                                        'border-l-4 border-l-primary'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-full ${item.importance_level === 'high' ? 'bg-destructive/10 text-destructive' :
                                        item.importance_level === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                            'bg-primary/10 text-primary'
                                    }`}>
                                    {item.importance_level === 'high' ? <AlertCircle className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                                        <h3 className="text-lg font-bold font-heading leading-tight">{item.title}</h3>
                                        <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap bg-muted px-2 py-1 rounded">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {formatDate(item.created_at)}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                        {item.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                        Belum ada pengumuman saat ini.
                    </div>
                )}
            </div>
        </div>
    );
}
