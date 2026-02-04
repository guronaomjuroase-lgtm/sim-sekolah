import Link from 'next/link'
import { User } from 'lucide-react'

export function Header() {
    const navigation = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil', href: '/profil' },
        { name: 'Artikel', href: '/artikel' },
        { name: 'Pengumuman', href: '/pengumuman' },
        { name: 'Agenda', href: '/agenda' },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xl">
                    <Link href="/">SIM Sekolah</Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
                        <User className="h-4 w-4" />
                        Login
                    </Link>
                </div>
            </div>
        </header>
    )
}
