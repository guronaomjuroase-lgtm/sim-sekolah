import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Users, Star, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 container relative">
        {/* Decorative background blobs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-ping"></span>
            Penerimaan Peserta Didik Baru Telah Dibuka!
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.1]">
            Mewujudkan Pendidikan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Berkualitas</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sistem Informasi Manajemen Sekolah yang modern, transparan, dan menyenangkan.
            Membantu siswa mencapai potensi terbaik mereka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/profil"
              className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:-translate-y-1"
            >
              Tentang Sekolah
            </Link>
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-full border-2 border-primary/10 bg-white px-8 text-base font-bold text-foreground shadow-sm transition-all hover:bg-secondary/20 hover:border-secondary/50"
            >
              Portal Siswa
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="w-full py-20 container">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-secondary/50 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-secondary/20 text-secondary-foreground mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Kurikulum Modern</h3>
            <p className="text-muted-foreground font-medium">Kurikulum adaptif yang menggabungkan akademik dan pengembangan karakter.</p>
          </div>
          <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-accent/20 text-accent-foreground mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Pengajar Dedikatif</h3>
            <p className="text-muted-foreground font-medium">Didukung tenaga pendidik profesional yang peduli pada tumbuh kembang siswa.</p>
          </div>
          <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-heading font-bold mb-3">Ekstrakurikuler Aktif</h3>
            <p className="text-muted-foreground font-medium">Beragam kegiatan untuk menyalurkan bakat dan minat siswa di luar jam pelajaran.</p>
          </div>
        </div>
      </section>

      {/* Recent Articles Section */}
      <section className="w-full py-24 bg-white/50 backdrop-blur-sm border-t border-dashed">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Update Terbaru</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2">Kabar Sekolah</h2>
            </div>
            <Link href="/artikel" className="hidden md:flex items-center px-4 py-2 rounded-full bg-white border shadow-sm text-sm font-bold hover:bg-muted transition-colors">
              Lihat Semua <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Placeholder for image */}
                  <div className="absolute bottom-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-primary shadow-sm">
                    Berita
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    <Calendar className="h-3 w-3" />
                    12 Januari 2024
                  </div>
                  <h3 className="mb-3 text-xl font-heading font-bold leading-tight group-hover:text-primary transition-colors">
                    Prestasi Siswa dalam Olimpiade Sains Tingkat Nasional
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    Selamat kepada siswa kami yang telah berhasil meraih medali emas...
                  </p>
                  <div className="mt-auto pt-4 border-t border-dashed flex items-center text-sm font-bold text-primary">
                    Baca Selengkapnya
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/artikel" className="inline-flex items-center px-6 py-3 rounded-full bg-white border shadow-sm text-sm font-bold hover:bg-muted transition-colors">
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
