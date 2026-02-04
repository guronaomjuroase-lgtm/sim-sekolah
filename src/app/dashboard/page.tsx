import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Users,
    BookOpen,
    Calendar,
    Settings,
    LogOut,
    GraduationCap,
    CreditCard
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: modules, error } = await supabase
        .from('modules')
        .select('*')
        .order('id');

    // Default modules if DB is empty or error (fail-safe)
    const displayModules = modules || [
        { name: "Profil Pengguna", icon_name: "Users", path: "/dashboard/profile", description: "Kelola data diri" },
        { name: "Kelola Agenda", icon_name: "Calendar", path: "/dashboard/agenda", description: "Upload & kelola agenda" },
        { name: "Kelola Pengumuman", icon_name: "BookOpen", path: "/dashboard/pengumuman", description: "Buat & edit pengumuman" },
    ];

    // Helper to get Icon component dynamically
    const getIcon = (iconName: string) => {
        const icons: Record<string, any> = {
            Users, GraduationCap, Calendar, BookOpen, Settings, CreditCard
        };
        return icons[iconName] || Settings;
    };

    return (
        <div className="min-h-screen bg-muted/20">
            <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Halo, {user.email}</span>
                    <form action="/auth/signout" method="post">
                        <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors" title="Keluar">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </header>

            <main className="container mx-auto py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {displayModules.map((module) => {
                        const Icon = getIcon(module.icon_name || 'Settings');
                        return (
                            <Link
                                key={module.path}
                                href={module.path}
                                className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`rounded-full p-3 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{module.name}</h3>
                                        <p className="text-sm text-muted-foreground">{module.description}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
