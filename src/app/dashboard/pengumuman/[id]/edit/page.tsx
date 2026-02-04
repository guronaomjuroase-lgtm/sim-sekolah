"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";

export default function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
    const wrappedParams = use(params);
    const id = wrappedParams.id;

    const [loading, setLoading] = useState(true); // Initial loading for fetching
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [importance, setImportance] = useState("low");
    const [isActive, setIsActive] = useState(true);

    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchAnnouncement = async () => {
            try {
                const { data, error } = await supabase
                    .from('announcements')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) {
                    setTitle(data.title);
                    setContent(data.content);
                    setImportance(data.importance_level);
                    setIsActive(data.is_active);
                }
            } catch (error) {
                console.error(error);
                router.push('/dashboard/pengumuman');
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncement();
    }, [id, router, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase.from('announcements').update({
                title,
                content,
                importance_level: importance,
                is_active: isActive
            }).eq('id', id);

            if (error) throw error;

            router.push('/dashboard/pengumuman');
            router.refresh();
        } catch (error) {
            alert('Gagal memperbarui pengumuman');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Apakah anda yakin ingin menghapus pengumuman ini?")) return;
        setDeleting(true);
        try {
            const { error } = await supabase.from('announcements').delete().eq('id', id);
            if (error) throw error;
            router.push('/dashboard/pengumuman');
            router.refresh();
        } catch (error) {
            alert('Gagal menghapus pengumuman');
            setDeleting(false);
        }
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

    return (
        <div className="container mx-auto py-12 max-w-2xl px-4">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <Link href="/dashboard/pengumuman" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                        &larr; Kembali ke Daftar
                    </Link>
                    <h1 className="text-3xl font-bold font-heading">Edit Pengumuman</h1>
                </div>
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                    title="Hapus Pengumuman"
                >
                    {deleting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-bold">Judul Pengumuman</label>
                    <input
                        id="title"
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="importance" className="text-sm font-bold">Tingkat Penting</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['low', 'medium', 'high'].map((level) => (
                            <button
                                type="button"
                                key={level}
                                onClick={() => setImportance(level)}
                                className={`h-10 rounded-md text-sm font-medium border capitalize ${importance === level
                                        ? 'bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-2'
                                        : 'bg-background hover:bg-muted text-foreground'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-bold">Isi Pengumuman</label>
                    <textarea
                        id="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="active"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Publikasikan Langsung
                    </label>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <Link href="/dashboard/pengumuman" className="inline-flex items-center justify-center rounded-md text-sm font-bold h-10 px-4 py-2 hover:bg-muted text-muted-foreground">
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex items-center justify-center rounded-md text-sm font-bold bg-primary text-primary-foreground h-10 px-8 py-2 hover:bg-primary/90 disabled:opacity-50 transition-all"
                    >
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}
