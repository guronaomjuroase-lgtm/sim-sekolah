import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export function Footer() {
    return (
        <footer className="w-full bg-white/50 border-t border-dashed mt-20">
            <div className="container py-16 px-6">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="font-heading text-2xl font-bold text-primary">SIM Sekolah</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Platform informasi dan manajemen sekolah terintegrasi. Membangun masa depan dengan teknologi yang ramah dan efisien.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"><Facebook className="h-4 w-4" /></a>
                            <a href="#" className="p-2 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"><Instagram className="h-4 w-4" /></a>
                            <a href="#" className="p-2 rounded-full bg-sky-100 text-sky-600 hover:bg-sky-200 transition-colors"><Twitter className="h-4 w-4" /></a>
                            <a href="#" className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"><Youtube className="h-4 w-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Eksplorasi</h4>
                        <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                            <li><Link href="/profil" className="hover:text-primary transition-colors flex items-center gap-2">Profil Sekolah</Link></li>
                            <li><Link href="/artikel" className="hover:text-primary transition-colors flex items-center gap-2">Artikel & Berita</Link></li>
                            <li><Link href="/pengumuman" className="hover:text-primary transition-colors flex items-center gap-2">Pengumuman Terbaru</Link></li>
                            <li><Link href="/agenda" className="hover:text-primary transition-colors flex items-center gap-2">Agenda Kegiatan</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Bantuan</h4>
                        <ul className="space-y-3 text-sm font-medium text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Panduan Pengguna</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Support Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Hubungi Kami</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-start gap-3">
                                <span className="font-semibold text-foreground">Email:</span> info@sekolah.sch.id
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-semibold text-foreground">Alamat:</span> Jl. Pendidikan No. 1
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="font-semibold text-foreground">Telp:</span> (021) 1234-5678
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 border-t border-dashed pt-8 text-center text-sm font-medium text-muted-foreground">
                    © {new Date().getFullYear()} SIM Sekolah. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
