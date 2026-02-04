"use client";

import { useState } from "react";
import { Upload, FileText, Check, AlertCircle, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AgendaUploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewData, setPreviewData] = useState<any[]>([]);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            parseCSV(selectedFile);
        }
    };

    const parseCSV = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n');
            const data = lines.slice(1).map(line => {
                const [title, description, event_date, start_time, location] = line.split(',').map(item => item?.trim().replace(/^"|"$/g, ''));
                if (!title) return null; // Skip empty lines
                return { title, description, event_date, start_time, location };
            }).filter(item => item !== null);
            setPreviewData(data);
        };
        reader.readAsText(file);
    };

    const handleUpload = async () => {
        try {
            setUploading(true);
            setMessage(null);

            if (previewData.length === 0) {
                throw new Error("Tidak ada data untuk diupload.");
            }

            const { error } = await supabase.from('agendas').insert(previewData);

            if (error) throw error;

            setMessage({ type: 'success', text: `Berhasil mengupload ${previewData.length} agenda!` });
            setFile(null);
            setPreviewData([]);
            router.refresh(); // Refresh to update agenda list somewhere maybe
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || "Gagal mengupload data." });
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container min-h-screen py-12 mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                    &larr; Kembali ke Dashboard
                </Link>
                <h1 className="text-3xl font-bold font-heading">Upload Agenda (CSV)</h1>
                <p className="text-muted-foreground">Upload jadwal agenda massal menggunakan file CSV.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="border-2 border-dashed rounded-xl p-8 text-center hover:bg-muted/30 transition-colors">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-bold text-lg mb-2">Upload File CSV</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Format: Title, Description, Date (YYYY-MM-DD), Time (HH:MM), Location
                        </p>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary/10 file:text-primary
                                hover:file:bg-primary/20
                            "
                        />
                    </div>

                    <div className="bg-card w-full border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Template CSV
                        </h3>
                        <div className="bg-muted p-4 rounded-md text-xs font-mono overflow-x-auto text-muted-foreground">
                            Title,Description,Event Date,Start Time,Location<br />
                            Rapat Guru,Pembahasan Kurikulum,2024-03-15,08:00,Ruang Guru<br />
                            Ujian Tengah Semester,,2024-03-20,07:30,Kelas Masing-masing
                        </div>
                    </div>
                </div>

                <div>
                    {message && (
                        <div className={`p-4 rounded-xl mb-4 flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.type === 'success' ? <Check className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                            {message.text}
                        </div>
                    )}

                    {previewData.length > 0 && (
                        <div className="border rounded-xl overflow-hidden shadow-sm bg-card">
                            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                                <h3 className="font-bold">Preview Data ({previewData.length} items)</h3>
                                <button
                                    onClick={handleUpload}
                                    disabled={uploading}
                                    className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                                    Upload ke Database
                                </button>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50 sticky top-0">
                                        <tr>
                                            <th className="p-3 text-left font-semibold">Title</th>
                                            <th className="p-3 text-left font-semibold">Date</th>
                                            <th className="p-3 text-left font-semibold">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {previewData.map((row, i) => (
                                            <tr key={i} className="hover:bg-muted/10">
                                                <td className="p-3 font-medium">{row.title}</td>
                                                <td className="p-3 text-muted-foreground">{row.event_date}</td>
                                                <td className="p-3 text-muted-foreground">{row.start_time}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
