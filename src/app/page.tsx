import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-primary/5 to-background py-20 px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
          Selamat Datang di SIM Sekolah
        </h1>
        <p className="mx-auto mb-8 max-w-[700px] text-muted-foreground md:text-xl">
          Sistem Informasi Manajemen Sekolah yang terintegrasi, transparan, dan akuntabel.
          Mewujudkan pendidikan berkualitas untuk masa depan gemilang.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/profil"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Profil Sekolah
          </Link>
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Masuk Dashboard
          </Link>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="w-full py-16 container">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <BookOpen className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Kurikulum Terkini</h3>
            <p className="text-muted-foreground">Menggunakan kurikulum terbaru yang adaptif dengan perkembangan teknologi.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Pengajar Profesional</h3>
            <p className="text-muted-foreground">Didukung oleh tenaga pendidik yang kompeten dan berpengalaman.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Kegiatan Aktif</h3>
            <p className="text-muted-foreground">Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat siswa.</p>
          </div>
        </div>
      </section>

      {/* Recent Articles Section (Placeholder) */}
      <section className="w-full py-16 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Artikel Terbaru</h2>
            <Link href="/artikel" className="flex items-center text-primary hover:underline">
              Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Dummy Articles */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border bg-background shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground">
                  No Image
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-bold group-hover:underline">Judul Artikel {i}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Ringkasan artikel berita sekolah yang menarik untuk dibaca...</p>
                  <span className="text-xs text-muted-foreground">01 Jan 2024</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
