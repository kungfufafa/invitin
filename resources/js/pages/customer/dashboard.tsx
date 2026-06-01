import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarDays,
    Globe2,
    LogOut,
    Plus,
    Sparkles,
} from 'lucide-react';
import { index as themesIndex } from '@/routes/themes';

export default function Dashboard({
    invitations = [],
}: {
    invitations?: any[];
}) {
    const getCoupleNames = (invitation: any): string => {
        const couple = invitation.data_json?.couple;

        if (Array.isArray(couple) && couple.length > 0) {
            const names = couple
                .map((person: any) => person?.nickname || person?.full_name)
                .filter(Boolean);

            if (names.length > 0) {
                return names.join(' & ');
            }
        }

        const legacyNames = [
            invitation.data_json?.groom,
            invitation.data_json?.bride,
        ].filter(Boolean);

        if (legacyNames.length > 0) {
            return legacyNames.join(' & ');
        }

        return invitation.title || 'Undangan Baru';
    };

    const getMainDate = (invitation: any): string => {
        return (
            invitation.data_json?.basic?.main_date ||
            invitation.data_json?.date ||
            'Tanggal belum diisi'
        );
    };

    return (
        <div className="min-h-screen bg-[#F6F4EF] font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head title="Workspace Saya | Invitin by Mekaya" />

            <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 md:bottom-10">
                <nav className="flex items-center gap-2 rounded-xl bg-[#1C1C1C]/95 px-2 py-2 text-white shadow-2xl backdrop-blur-md">
                    <Link
                        href="/"
                        className="px-4 py-3 text-sm transition-colors hover:text-gray-300"
                    >
                        Home
                    </Link>
                    <Link
                        href="/themes"
                        className="px-4 py-3 text-sm transition-colors hover:text-gray-300"
                    >
                        Katalog
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                    >
                        <LogOut className="size-4" />
                        Keluar
                    </Link>
                </nav>
            </div>

            <div className="min-h-screen p-4 pb-32 md:p-8 md:pb-36 lg:p-10">
                <div className="mb-10 flex flex-col gap-6 border-b border-[#1E1E1E]/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#8B9B3F]">
                            <Sparkles className="size-4" />
                            Customer dashboard
                        </p>
                        <h1 className="font-serif text-5xl leading-tight md:text-6xl">
                            <span className="italic">Kelola undangan</span>
                            <br />
                            dari satu workspace
                        </h1>
                        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#4A4A4A]">
                            Pilih tema, lengkapi konten, preview, lalu publish
                            undangan digital untuk dibagikan ke tamu.
                        </p>
                    </div>

                    <Link
                        href={themesIndex.url()}
                        className="inline-flex w-fit items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
                    >
                        <Plus className="size-4" />
                        {invitations.length > 0
                            ? 'Beli Tema Lagi'
                            : 'Pilih Tema Baru'}
                    </Link>
                </div>

                {invitations.length === 0 ? (
                    <section className="border border-[#1E1E1E]/10 bg-[#FDFBF7] p-8 text-center md:p-14">
                        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-[#E2E6D9] text-[#8B9B3F]">
                            <Globe2 className="size-8" />
                        </div>
                        <h2 className="font-serif text-4xl italic">
                            Belum ada undangan
                        </h2>
                        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#4A4A4A]">
                            Mulai dari katalog tema untuk membuat draft
                            workspace pertamamu.
                        </p>
                        <Link
                            href={themesIndex.url()}
                            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
                        >
                            Lihat Katalog Tema
                            <ArrowRight className="size-4" />
                        </Link>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 border-t border-l border-[#1E1E1E]/10 md:grid-cols-2 xl:grid-cols-3">
                        {invitations.map((invitation) => (
                            <article
                                key={invitation.id}
                                className="group flex flex-col border-r border-b border-[#1E1E1E]/10 bg-[#FDFBF7] p-4 transition-colors hover:bg-white md:p-6"
                            >
                                <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-[#E2E6D9]">
                                    <img
                                        src={
                                            invitation.theme?.thumbnail ||
                                            '/images/preview-image_1.webp'
                                        }
                                        alt={
                                            invitation.theme?.name ||
                                            invitation.title
                                        }
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-3 right-3 bg-[#1E1E1E] px-3 py-1 text-xs font-medium tracking-wide text-white capitalize">
                                        {invitation.status}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <p className="mb-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                                        {invitation.theme?.name ||
                                            'Tema Invitin'}
                                    </p>
                                    <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                                        {getCoupleNames(invitation)}
                                    </h2>
                                    <div className="mt-4 flex items-center gap-2 text-sm text-[#4A4A4A]">
                                        <CalendarDays className="size-4 text-[#8B9B3F]" />
                                        {getMainDate(invitation)}
                                    </div>

                                    <Link
                                        href={`/workspace/${invitation.id}`}
                                        className="mt-8 inline-flex items-center justify-center gap-2 border border-[#1C1C1C]/20 px-5 py-3 text-sm font-medium tracking-wide text-[#1C1C1C] transition-colors hover:bg-[#1C1C1C] hover:text-white"
                                    >
                                        Buka Workspace
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
