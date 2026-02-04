import Link from 'next/link'

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container py-10 md:py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">SIM Sekolah</h3>
                        <p className="text-sm text-muted-foreground">
                            Platform informasi dan manajemen sekolah terintegrasi.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Tautan</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/profil" className="hover:text-foreground">Profil</Link></li>
                            <li><Link href="/artikel" className="hover:text-foreground">Artikel</Link></li>
                            <li><Link href="/pengumuman" className="hover:text-foreground">Pengumuman</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Kontak</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>info@sekolah.sch.id</li>
                            <li>Jl. Pendidikan No. 1</li>
                            <li>(021) 1234-5678</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SIM Sekolah. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
