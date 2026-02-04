import { AlertCircle, Calendar, Pin } from "lucide-react";

export default function AnnouncementsPage() {
    const announcements = [
        {
            id: 1,
            title: "Jadwal Ujian Tengah Semester Genap",
            content: "Diberitahukan kepada seluruh siswa bahwa UTS Genap akan dilaksanakan mulai tanggal...",
            date: "05 Feb 2024",
            importance: "high", // low, medium, high
        },
        {
            id: 2,
            title: "Libur Nasional Hari Raya",
            content: "Sehubungan dengan hari raya, maka kegiatan belajar mengajar diliburkan pada...",
            date: "01 Feb 2024",
            importance: "medium",
        },
        {
            id: 3,
            title: "Perubahan Jadwal Ekstrakurikuler Pramuka",
            content: "Jadwal ekstrakurikuler Pramuka minggu ini digeser menjadi hari Sabtu...",
            date: "30 Jan 2024",
            importance: "low",
        }
    ];

    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Pengumuman Sekolah</h1>

            <div className="max-w-3xl mx-auto space-y-4">
                {announcements.map((item) => (
                    <div
                        key={item.id}
                        className={`border rounded-lg p-6 bg-card shadow-sm transition-all hover:shadow-md ${item.importance === 'high' ? 'border-l-4 border-l-destructive' :
                                item.importance === 'medium' ? 'border-l-4 border-l-yellow-500' :
                                    'border-l-4 border-l-primary'
                            }`}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 p-2 rounded-full ${item.importance === 'high' ? 'bg-destructive/10 text-destructive' :
                                    item.importance === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                        'bg-primary/10 text-primary'
                                }`}>
                                {item.importance === 'high' ? <AlertCircle className="h-5 w-5" /> : <Pin className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap ml-4 bg-muted px-2 py-1 rounded">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {item.date}
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-sm">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
