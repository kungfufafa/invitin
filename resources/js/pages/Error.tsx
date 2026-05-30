import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function ErrorPage({ status }: { status: number }) {
    const title = {
        503: '503',
        500: '500',
        404: '404',
        403: '403',
    }[status] || 'Error';

    const description = {
        503: 'Sedang Dalam Pemeliharaan',
        500: 'Terjadi Kesalahan Server',
        404: 'Wah, sepertinya Anda tersesat.',
        403: 'Akses Ditolak',
    }[status] || 'Terjadi kesalahan sistem';

    const detail = {
        503: 'Maaf, kami sedang melakukan pemeliharaan dan peningkatan sistem. Silakan periksa kembali beberapa saat lagi.',
        500: 'Maaf, ada masalah di server kami. Tim kami sedang meninjau dan memperbaikinya segera.',
        404: 'Halaman yang Anda cari tidak dapat kami temukan. Mungkin telah dipindahkan, atau Anda salah mengetik alamatnya. Mari kembali dan temukan undangan pernikahan impian Anda.',
        403: 'Maaf, Anda tidak memiliki izin untuk mengakses halaman ini.',
    }[status] || 'Kami tidak dapat memproses permintaan Anda saat ini.';

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1E1E1E] font-sans selection:bg-[#1E1E1E] selection:text-white flex flex-col justify-between overflow-x-hidden">
            <Head title={`${title} - ${description} | Invitin`} />

            {/* Navbar (Simplified for error page) */}
            <header className="absolute top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-center">
                <div className="flex items-center gap-3">
                    <img src="/images/favicon.svg" alt="Logo" className="w-8 h-8 brightness-0" />
                    <span className="text-xl font-bold font-sans">Invitin by Mekaya</span>
                </div>
            </header>

            {/* Error Content */}
            <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-8 text-center pt-24 pb-20">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    {/* Status Code Circle */}
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 flex items-center justify-center border border-[#8aaa03]/50 shadow-md mb-10">
                        <span className="text-5xl md:text-6xl font-serif text-white tracking-tight">{title}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-[#1E1E1E] leading-tight mb-6">
                        {description}
                    </h1>
                    
                    <p className="text-[#4A4A4A] font-sans text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
                        {detail}
                    </p>

                    <Link 
                        href="/" 
                        className="px-8 py-3 bg-[#1C1C1C] text-white rounded-lg text-sm font-sans font-medium tracking-wide hover:bg-black transition-colors"
                    >
                        Kembali ke halaman utama
                    </Link>
                </div>
            </main>

            {/* Simple Footer for Error Page */}
            <footer className="w-full py-8 text-center border-t border-[#1E1E1E]/10">
                <p className="text-sm text-[#4A4A4A]">© {new Date().getFullYear()} Invitin by Mekaya. All rights reserved.</p>
            </footer>
        </div>
    );
}
