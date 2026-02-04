"use client";

import { createClient } from "@/lib/supabase/client";
import { User, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const getProfile = async () => {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push('/login');
                    return;
                }

                setUserId(user.id);
                setEmail(user.email || "");

                const { data, error, status } = await supabase
                    .from('profiles')
                    .select(`full_name, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (error && status !== 406) {
                    throw error;
                }

                if (data) {
                    setFullName(data.full_name || "");
                }
            } catch (error: any) {
                console.error("Error loading user data!", error.message);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, [supabase, router]);

    const updateProfile = async () => {
        try {
            setUpdating(true);
            setMessage(null);

            const { error } = await supabase.from('profiles').upsert({
                id: userId as string,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });

            if (error) throw error;

            setMessage({ type: 'success', text: "Profil berhasil diperbarui!" });
            router.refresh(); // Refresh server components to show new name in dashboard if used there
        } catch (error: any) {
            setMessage({ type: 'error', text: "Gagal memperbarui profil: " + error.message });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/20 pb-12">
            <header className="bg-background border-b px-6 py-4 mb-8">
                <div className="container flex items-center gap-4">
                    <Link href="/dashboard" className="text-sm font-medium hover:underline text-muted-foreground hover:text-foreground">
                        Dashboard
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <h1 className="text-xl font-bold">Profil Pengguna</h1>
                </div>
            </header>

            <div className="container max-w-2xl">
                <div className="bg-card border rounded-lg shadow-sm p-6 space-y-6">
                    <div className="flex items-center gap-4 border-b pb-6">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="h-10 w-10" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{email}</h2>
                            <p className="text-sm text-muted-foreground">Kelola informasi profil anda</p>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-4 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                disabled
                                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="fullname" className="text-sm font-medium">Nama Lengkap</label>
                            <input
                                id="fullname"
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            onClick={updateProfile}
                            disabled={updating}
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {updating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
