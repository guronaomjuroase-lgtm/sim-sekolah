import Link from 'next/link'
import { User, Menu } from 'lucide-react'

export function Header() {
    const navigation = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil', href: '/profil' },
        { name: 'Artikel', href: '/artikel' },
        { name: 'Pengumuman', href: '/pengumuman' },
        { name: 'Agenda', href: '/agenda' },
    ]

    return (
        <header className="sticky top-4 z-50 mx-4 rounded-2xl border border-white/20 bg-white/70 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60">
            <div className="container flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-primary"></div>
                    </div>
                    <Link href="/" className="font-heading font-bold text-xl text-primary tracking-tight">SIM Sekolah</Link>
                </div>

                <nav className="hidden md:flex items-center gap-1 p-1 bg-white/50 rounded-full border border-white/50">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-full transition-all hover:bg-white hover:text-primary hover:shadow-sm"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-full hover:bg-primary/90 transition-transform active:scale-95 shadow-md shadow-primary/20">
                        <User className="h-4 w-4" />
                        Login
                    </Link>
                    <button className="md:hidden p-2 text-muted-foreground">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    )
}
