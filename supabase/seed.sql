-- Seed School Profile
INSERT INTO public.school_profile (name, address, phone, email, vision, mission, logo_url)
VALUES (
    'SMK Teladan Bangsa',
    'Jl. Teknologi Masa Depan No. 1, Cyber City',
    '(021) 555-0123',
    'info@smkteladan.sch.id',
    'Menjadi pusat keunggulan pendidikan teknologi yang berkarakter dan berwawasan global.',
    'Menyelenggarakan pendidikan berbasis industri. Mengembangkan karakter wirausaha. Meningkatkan kerjasama internasional.',
    'https://ui-avatars.com/api/?name=SMKT&background=random'
);

-- Seed Articles
INSERT INTO public.articles (title, slug, excerpt, content, image_url, is_published, published_at, author_id)
VALUES
(
    'Siswa SMK Teladan Bangsa Juara 1 Robotik Nasional',
    'juara-robotik-nasional',
    'Tim robotik sekolah berhasil mengalahkan 50 peserta lainnya dalam ajang KRI 2024.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    null,
    true,
    NOW() - INTERVAL '2 days',
    (SELECT id FROM auth.users LIMIT 1) -- Assumes at least one user exists, else will fail. Use with caution or insert dummy user first.
),
(
    'Pemeriksaan Kesehatan Gratis untuk Warga Sekitar',
    'pemeriksaan-kesehatan-gratis',
    'OSIS bekerja sama dengan Puskesmas setempat mengadakan baksos kesehatan.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    null,
    true,
    NOW() - INTERVAL '5 days',
    null
),
(
    'Kunjungan Industri ke Silicon Valley',
    'kunjungan-industri-silicon-valley',
    'Siswa kelas XII TKJ melakukan studi banding ke kantor pusat teknologi dunia.',
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    null,
    true,
    NOW() - INTERVAL '10 days',
    null
);

-- Seed Announcements
INSERT INTO public.announcements (title, content, importance_level, is_active)
VALUES
('Libur Awal Puasa', 'Kegiatan belajar mengajar diliburkan pada tanggal 12 Maret 2024.', 'medium', true),
('Jadwal Ujian Sekolah', 'Ujian Sekolah akan dilaksanakan mulai tanggal 15 April 2024. Harap persiapkan diri.', 'high', true),
('Lomba Kebersihan Kelas', 'Penilaian lomba kebersihan kelas dimulai minggu depan.', 'low', true);

-- Seed Agendas
INSERT INTO public.agendas (title, description, event_date, start_time, location)
VALUES
('Rapat Orang Tua Murid', 'Pembahasan program sekolah tahun ajaran baru.', NOW() + INTERVAL '2 days', '09:00:00', 'Aula Utama'),
('Pentas Seni Tahunan', 'Menampilkan bakat seni siswa.', NOW() + INTERVAL '14 days', '08:00:00', 'Lapangan Basket'),
('Workshop Coding', 'Pelatihan dasar pemrograman web untuk umum.', NOW() + INTERVAL '7 days', '13:00:00', 'Lab Komputer 1');

-- Seed Modules
INSERT INTO public.modules (name, slug, description, icon_name, path, min_role)
VALUES
('Profil Pengguna', 'profil-pengguna', 'Kelola data diri', 'Users', '/dashboard/profile', 'user'),
('Akademik', 'akademik', 'Nilai dan Jadwal', 'GraduationCap', '/dashboard/akademik', 'user'),
('E-Learning', 'elearning', 'Materi dan Tugas', 'BookOpen', '/dashboard/elearning', 'user'),
('Keuangan', 'keuangan', 'Info Tagihan SPP', 'CreditCard', '/dashboard/keuangan', 'user');

