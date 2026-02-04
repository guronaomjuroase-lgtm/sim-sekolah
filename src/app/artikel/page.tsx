import Link from "next/link";

// I'll stick to standard tailwind classes for now to avoid dependency on shadcn components I haven't installed.
// Or I can quickly create a card component. I'll use raw tailwind.

export default function ArticlesPage() {
    const articles = [
        {
            id: 1,
            title: "Prestasi Siswa di Olimpiade Sains Nasional",
            excerpt: "Siswa SMK Teladan Bangsa kembali menorehkan prestasi gemilang di kancah nasional...",
            date: "02 Feb 2024",
            author: "Admin",
            slug: "prestasi-siswa-osn"
        },
        {
            id: 2,
            title: "Kegiatan Bakti Sosial di Desa Sejahtera",
            excerpt: "OSIS SMK Teladan Bangsa mengadakan kegiatan bakti sosial sebagai wujud kepedulian...",
            date: "28 Jan 2024",
            author: "Humas",
            slug: "kegiatan-baksos"
        },
        {
            id: 3,
            title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2024/2025",
            excerpt: "SMK Teladan Bangsa membuka pendaftaran siswa baru. Simak informasi lengkapnya...",
            date: "15 Jan 2024",
            author: "Panitia PPDB",
            slug: "ppdb-2024"
        }
    ];

    return (
        <div className="container mx-auto py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Artikel & Berita</h1>
                <div className="relative max-w-sm w-full">
                    <input
                        type="text"
                        placeholder="Cari artikel..."
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                    <Link key={article.id} href={`/artikel/${article.slug}`} className="group">
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col bg-card">
                            <div className="aspect-video bg-muted relative">
                                {/* Image placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                    No Image
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.author}</span>
                                </div>
                                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h2>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                    {article.excerpt}
                                </p>
                                <div className="text-sm font-medium text-primary mt-auto">
                                    Baca Selengkapnya →
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
