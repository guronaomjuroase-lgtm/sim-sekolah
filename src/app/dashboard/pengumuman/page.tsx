import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Pencil, Trash2, AlertCircle, Pin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardAnnouncementsPage() {
    const supabase = await createClient();
    const { data: announcements } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });

    return (
        <div className="container min-h-screen py-12 mx-auto px-4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                        &larr; Kembali ke Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold font-heading">Kelola Pengumuman</h1>
                    <p className="text-muted-foreground">Buat, edit, dan hapus pengumuman sekolah.</p>
                </div>
                <div>
                    <Link href="/dashboard/pengumuman/create" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 shadow-md transition-transform active:scale-95">
                        <Plus className="h-4 w-4" /> Buat Pengumuman
                    </Link>
                </div>
            </div>

            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Judul</th>
                                <th className="px-6 py-4">Prioritas</th>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {announcements && announcements.length > 0 ? (
                                announcements.map((item) => (
                                    <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                                        <td className="px-6 py-4 font-medium">
                                            <div className="line-clamp-1 max-w-sm">{item.title}</div>
                                            <div className="text-xs text-muted-foreground line-clamp-1 max-w-sm mt-1">{item.content}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${item.importance_level === 'high' ? 'bg-destructive/10 text-destructive' :
                                                    item.importance_level === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                                                        'bg-blue-500/10 text-blue-600'
                                                }`}>
                                                {item.importance_level}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                            {new Date(item.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {item.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/dashboard/pengumuman/${item.id}/edit`} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                {/* In a real app, delete would be a server action or client button with confirmation. For MVP, maybe verify later. */}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                                        Belum ada pengumuman.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
