# SIM Sekolah (Sistem Informasi Sekolah)

Sistem Informasi Manajemen Sekolah berbasis web modern yang dibangun menggunakan Next.js dan Supabase.

## Fitur Utama

- **Halaman Publik**: Beranda, Profil Sekolah, Artikel, Pengumuman, dan Agenda Sekolah.
- **Autentikasi**: Login aman menggunakan Supabase Auth.
- **Dashboard**: Panel admin/user untuk mengakses modul-modul sekolah.
- **Profil Pengguna**: Manajemen profil pengguna terintegrasi.

## Teknologi

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Deployment**: Vercel (Recommended)

## Persyaratan Sistem

- Node.js 18+
- Akun Supabase

## Cara Menjalankan Project

1.  **Clone Repository**

    ```bash
    git clone https://github.com/username/sim-sekolah.git
    cd sim-sekolah
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables**

    Salin file `.env.local.example` menjadi `.env.local` dan isi URL serta API Key Supabase Anda.

    ```bash
    cp .env.local.example .env.local
    ```

    Isi:
    ```
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4.  **Jalankan Development Server**

    ```bash
    npm run dev
    ```

    Akses aplikasi di `http://localhost:3000`.

## Struktur Database

Lihat file `database.puml` untuk Entity Relationship Diagram (ERD).
Migrasi database tersedia di `supabase/migrations`.

## Pengembangan Lanjutan

Lihat `rencana_pengembangan.md` untuk roadmap fitur mendatang.
