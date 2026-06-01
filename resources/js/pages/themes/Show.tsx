import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { create as checkoutCreate } from '@/routes/checkout';

export default function Show({ theme }: { theme: any }) {
    return (
        <div className="min-h-screen bg-[#F6F4EF] font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head title={`${theme.name} - Tema Undangan | Invitin by Mekaya`} />

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
                        className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100"
                    >
                        Katalog
                    </Link>
                </nav>
            </div>

            <main className="px-4 py-10 md:px-10 lg:px-20 lg:py-16">
                <Link
                    href="/themes"
                    className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#1E1E1E]"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke katalog
                </Link>

                <section className="grid min-h-[70vh] grid-cols-1 border border-[#1E1E1E]/10 bg-[#FDFBF7] lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-[420px] overflow-hidden border-b border-[#1E1E1E]/10 bg-[#E2E6D9] lg:border-r lg:border-b-0">
                        <img
                            src={
                                theme.thumbnail ||
                                '/images/preview-image_1.webp'
                            }
                            alt={theme.name}
                            className="h-full w-full object-cover"
                        />
                        {theme.is_featured && (
                            <div className="absolute top-5 left-5 bg-[#1E1E1E] px-4 py-2 text-xs font-medium tracking-wide text-white uppercase">
                                Featured
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center p-6 md:p-10 lg:p-14">
                        <div className="mb-6 flex flex-wrap gap-2">
                            <span className="border border-[#1E1E1E]/15 bg-[#E2E6D9] px-4 py-2 text-xs font-medium tracking-wide text-[#1E1E1E] uppercase">
                                {theme.category}
                            </span>
                            <span className="border border-[#1E1E1E]/15 px-4 py-2 text-xs font-medium tracking-wide text-[#4A4A4A] uppercase">
                                {theme.style}
                            </span>
                        </div>

                        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#8B9B3F]">
                            <Sparkles className="size-4" />
                            Tema siap pakai untuk undangan digital elegan
                        </p>

                        <h1 className="font-serif text-5xl leading-tight md:text-6xl lg:text-[4.5rem]">
                            <span className="italic">{theme.name}</span>
                        </h1>

                        <div className="mt-8 border-t border-[#1E1E1E]/10 pt-8">
                            <p className="text-sm text-[#4A4A4A]">Mulai dari</p>
                            <div className="mt-1 text-3xl font-semibold">
                                Rp {theme.price.toLocaleString('id-ID')}
                            </div>
                        </div>

                        <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#4A4A4A]">
                            Tema {theme.style} untuk kategori {theme.category}{' '}
                            dengan tampilan mobile-first, komposisi rapi, dan
                            struktur yang mudah diisi dari workspace customer.
                        </p>

                        <div className="mt-10 grid gap-3 sm:grid-cols-2">
                            <Link
                                href={checkoutCreate.url(theme.slug)}
                                className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
                            >
                                Pilih Tema
                                <ArrowRight className="size-4" />
                            </Link>
                            <a
                                href={`/demo/${theme.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 border border-[#1C1C1C]/20 px-6 py-4 text-sm font-medium tracking-wide text-[#1C1C1C] transition-colors hover:bg-white"
                            >
                                <Eye className="size-4" />
                                Lihat Preview
                            </a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
