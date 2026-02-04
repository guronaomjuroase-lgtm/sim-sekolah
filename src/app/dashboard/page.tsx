import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    Users,
    BookOpen,
    Calendar,
    Settings,
    LogOut,
    GraduationCap
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Mock modules data (in a real app, this would come from the 'modules' table based on user role)
    const modules = [
        { name: "Profil Pengguna", icon: Users, href: "/dashboard/profile", color: "text-blue-500", bg: "bg-blue-500/10" },
        { name: "Akademik", icon: GraduationCap, href: "/dashboard/akademik", color: "text-green-500", bg: "bg-green-500/10" },
        { name: "Agenda", icon: Calendar, href: "/agenda", color: "text-orange-500", bg: "bg-orange-500/10" },
        { name: "E-Learning", icon: BookOpen, href: "/dashboard/elearning", color: "text-purple-500", bg: "bg-purple-500/10" },
        { name: "Pengaturan", icon: Settings, href: "/dashboard/settings", color: "text-gray-500", bg: "bg-gray-500/10" },
    ];

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

            <main className="container py-12">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {modules.map((module) => (
                        <Link
                            key={module.name}
                            href={module.href}
                            className="flex flex-col items-center justify-center p-8 bg-card border rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                        >
                            <div className={`p-4 rounded-full mb-4 ${module.bg} ${module.color} group-hover:scale-110 transition-transform`}>
                                <module.icon className="h-8 w-8" />
                            </div>
                            <span className="font-semibold text-center">{module.name}</span>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
