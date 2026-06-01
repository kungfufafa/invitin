import { Head, Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, LayoutDashboard } from 'lucide-react';
import { index as themesIndex } from '@/routes/themes';

export default function Success({ invitation }: { invitation: any }) {
    return (
        <div className="flex min-h-screen items-center bg-[#F6F4EF] px-4 py-12 font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head title="Checkout Berhasil | Invitin by Mekaya" />

            <div className="mx-auto w-full max-w-2xl border border-[#1E1E1E]/10 bg-[#FDFBF7] p-6 text-center md:p-12">
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-[#E2E6D9] text-[#8B9B3F]">
                    <CheckCircle2 className="size-10" />
                </div>

                <p className="mb-4 text-sm font-medium tracking-wide text-[#8B9B3F] uppercase">
                    Workspace berhasil dibuat
                </p>
                <h1 className="font-serif text-5xl leading-tight md:text-6xl">
                    Undanganmu siap diisi
                </h1>
                <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-[#4A4A4A]">
                    Terima kasih sudah memilih{' '}
                    <strong>{invitation.theme.name}</strong>. Sekarang kamu bisa
                    masuk ke workspace customer untuk mengatur konten, preview,
                    dan publish. Kalau butuh undangan lain, kamu bisa beli tema
                    lagi kapan saja dari katalog.
                </p>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    <Link
                        href="/app"
                        className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
                    >
                        <LayoutDashboard className="size-4" />
                        Buka Dashboard
                    </Link>
                    <Link
                        href={`/workspace/${invitation.id}`}
                        className="inline-flex items-center justify-center gap-2 border border-[#1C1C1C]/20 px-6 py-4 text-sm font-medium tracking-wide text-[#1C1C1C] transition-colors hover:bg-white"
                    >
                        Masuk Workspace
                        <ArrowRight className="size-4" />
                    </Link>
                    <Link
                        href={themesIndex.url()}
                        className="inline-flex items-center justify-center gap-2 border border-[#1C1C1C]/20 px-6 py-4 text-sm font-medium tracking-wide text-[#1C1C1C] transition-colors hover:bg-white"
                    >
                        Beli Lagi
                    </Link>
                </div>
            </div>
        </div>
    );
}
