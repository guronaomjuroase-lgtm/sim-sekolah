import { Building2, MapPin, Mail, Phone } from "lucide-react";

export default function SchoolProfile() {
    return (
        <div className="container py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center text-primary">Profil Sekolah</h1>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                            <Building2 className="h-16 w-16 opacity-20" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                                Visi
                            </h2>
                            <p className="text-muted-foreground italic">
                                "Menjadi lembaga pendidikan unggul yang mencetak generasi berkarakter, cerdas, dan kompetitif di era global."
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Misi</h2>
                            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                <li>Menyelenggarakan pendidikan berkualitas berbasis teknologi.</li>
                                <li>Membangun karakter siswa yang berakhlak mulia.</li>
                                <li>Mengembangkan potensi siswa melalui kegiatan akademik dan non-akademik.</li>
                                <li>Menjalin kerjasama dengan berbagai pihak untuk kemajuan sekolah.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Sejarah Singkat</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Sekolah ini didirikan pada tahun 2005 dengan semangat untuk memberikan akses pendidikan yang berkualitas bagi masyarakat sekitar. Berawal dari sebuah gedung sederhana, kini sekolah telah berkembang menjadi salah satu institusi pendidikan terfavorit dengan fasilitas lengkap dan prestasi membanggakan di tingkat nasional maupun internasional.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Identitas Sekolah</h2>
                        <div className="rounded-lg border p-6 bg-card">
                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Building2 className="h-4 w-4" /> Nama Sekolah
                                    </dt>
                                    <dd className="font-medium">SMK Teladan Bangsa</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground">NPSN</dt>
                                    <dd className="font-medium">12345678</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Alamat
                                    </dt>
                                    <dd className="font-medium">Jl. Pendidikan No. 1, Kota Harapan, Indonesia</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground">Akreditasi</dt>
                                    <dd className="font-medium">A (Unggul)</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Phone className="h-4 w-4" /> Telepon
                                    </dt>
                                    <dd className="font-medium">(021) 1234-5678</dd>
                                </div>
                                <div className="space-y-1">
                                    <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> Email
                                    </dt>
                                    <dd className="font-medium">info@sekolah.sch.id</dd>
                                </div>
                            </dl>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
