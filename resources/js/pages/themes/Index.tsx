import { Head, Link, usePage, router } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { useState } from 'react';
import { create as checkoutCreate } from '@/routes/checkout';

export default function Index({
    themes,
    filters = {},
    categories = [],
}: {
    themes: any;
    filters?: any;
    categories?: string[];
}) {
    const { auth } = usePage<SharedData>().props;
    const hasUser = auth.user !== null;

    const [category, setCategory] = useState(filters.category || '');
    const [sort, setSort] = useState(filters.sort || 'latest');

    const handleFilterChange = (key: string, value: string) => {
        const params: any = { ...filters };

        if (value) {
            params[key] = value;
        } else {
            delete params[key];
        }

        if (key !== 'page') {
            delete params.page;
        }

        router.get('/themes', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#F6F4EF] font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head title="Tema Undangan - Invitin by Mekaya" />

            <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
                <nav className="bg-opacity-90 flex items-center gap-2 rounded-xl bg-[#1C1C1C] px-2 py-2 text-white shadow-2xl backdrop-blur-md">
                    <div className="flex items-center gap-8 px-6 font-sans text-sm">
                        <Link
                            href="/"
                            className="transition-colors hover:text-gray-300"
                        >
                            Home
                        </Link>
                    </div>
                    {hasUser ? (
                        <Link
                            href="/dashboard"
                            className="rounded-lg bg-white px-6 py-3 font-sans text-sm font-medium text-black transition-colors hover:bg-gray-100"
                        >
                            Hubungi kami
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-lg bg-white px-6 py-3 font-sans text-sm font-medium text-black transition-colors hover:bg-gray-100"
                        >
                            Hubungi kami
                        </Link>
                    )}
                </nav>
            </div>

            <div className="w-full">
                {/* Header Section */}
                <div className="flex flex-col items-center px-4 pt-24 pb-12 text-center md:px-10 lg:px-20">
                    <div className="mb-6 font-sans text-sm text-[#4A4A4A]">
                        Home / Tema Desain
                    </div>
                    <h1 className="max-w-5xl font-serif text-4xl leading-tight text-[#1E1E1E] md:text-5xl lg:text-[4rem]">
                        <span className="italic">
                            Pilih Tema Desain Terbaik Untuk Momen
                        </span>
                        <br />
                        <span className="italic">Spesial Pernikahanmu</span>
                    </h1>
                </div>

                {/* Filter Section */}
                <div className="mb-8 flex flex-col items-center justify-between gap-6 border-b border-gray-300/60 px-4 pb-8 md:px-10 lg:flex-row lg:px-20">
                    {/* Left side: Categories */}
                    <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-auto lg:justify-start">
                        <button
                            onClick={() => {
                                setCategory('');
                                handleFilterChange('category', '');
                            }}
                            className={`rounded-full border px-6 py-2 font-sans text-xs transition-colors ${category === '' ? 'border-[#E2E6D9] bg-[#E2E6D9] text-[#1E1E1E]' : 'border-[#1E1E1E]/20 bg-transparent text-[#1E1E1E] hover:border-[#1E1E1E]/40'}`}
                        >
                            All
                        </button>
                        {categories.map((cat, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setCategory(cat);
                                    handleFilterChange('category', cat);
                                }}
                                className={`rounded-full border px-6 py-2 font-sans text-xs capitalize transition-colors ${category === cat ? 'border-[#E2E6D9] bg-[#E2E6D9] text-[#1E1E1E]' : 'border-[#1E1E1E]/20 bg-transparent text-[#1E1E1E] hover:border-[#1E1E1E]/40'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Right side: Results count & Sort */}
                    <div className="flex w-full items-center justify-between gap-4 lg:w-auto lg:justify-end">
                        <span className="font-sans text-sm text-[#1E1E1E]">
                            {themes.total || 0} Result
                        </span>
                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    handleFilterChange('sort', e.target.value);
                                }}
                                className="block w-40 cursor-pointer appearance-none rounded-full border border-[#1E1E1E]/20 bg-transparent px-4 py-2 pr-8 font-sans text-xs text-[#1E1E1E] focus:border-[#8B9B3F] focus:ring-[#8B9B3F]"
                            >
                                <option value="latest">Sort: Terbaru</option>
                                <option value="oldest">Sort: Terlama</option>
                                <option value="price_asc">
                                    Sort: Harga Terendah
                                </option>
                                <option value="price_desc">
                                    Sort: Harga Tertinggi
                                </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1E1E1E]">
                                <svg
                                    className="h-3 w-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="px-4 pb-16 md:px-10 lg:px-20">
                    <div className="mb-16 grid grid-cols-2 border-t border-l border-gray-300/60 md:grid-cols-3 lg:grid-cols-4">
                        {themes.data && themes.data.length > 0 ? (
                            themes.data.map((theme: any) => (
                                <div
                                    key={theme.id}
                                    className="group flex flex-col border-r border-b border-gray-300/60 bg-transparent p-4 md:p-6"
                                >
                                    <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-[#E2E6D9] md:mb-6">
                                        <img
                                            src={
                                                theme.thumbnail ||
                                                '/images/preview-image_1.webp'
                                            }
                                            alt={theme.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        {theme.is_featured && (
                                            <div className="absolute top-4 left-4 bg-[#1E1E1E] px-3 py-1 text-xs font-medium tracking-wider text-white uppercase">
                                                Featured
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 flex-grow md:mb-6">
                                        <div className="mb-1 flex flex-col xl:flex-row xl:items-start xl:justify-between">
                                            <h3 className="font-serif text-lg text-[#1E1E1E] md:text-2xl">
                                                {theme.name}
                                            </h3>
                                            <span className="mt-1 font-sans text-xs font-medium text-[#1E1E1E] md:text-sm">
                                                Rp{' '}
                                                {theme.price.toLocaleString(
                                                    'id-ID',
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#4A4A4A] capitalize">
                                            {theme.category} • {theme.style}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href={checkoutCreate.url(
                                                theme.slug,
                                            )}
                                            className="w-full bg-[#1C1C1C] py-2 text-center text-[10px] font-medium tracking-wide text-white transition-colors hover:bg-black md:py-3 md:text-xs"
                                        >
                                            Pilih Tema
                                        </Link>
                                        <a
                                            href={`/demo/${theme.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full border border-[#1C1C1C]/20 bg-transparent py-2 text-center text-[10px] font-medium tracking-wide text-[#1C1C1C] transition-colors hover:bg-white md:py-3 md:text-xs"
                                        >
                                            Lihat Tema
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-4 py-20 text-center font-serif text-2xl text-[#4A4A4A] italic">
                                Belum ada tema yang tersedia...
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {themes.links && themes.links.length > 0 && (
                        <div className="mt-16 mb-8 flex justify-center">
                            <div className="flex items-center gap-2">
                                {themes.links.map((link: any, i: number) => {
                                    let label = link.label;
                                    if (label.includes('Previous')) label = '←';
                                    if (label.includes('Next')) label = '→';

                                    return (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`flex h-8 w-8 items-center justify-center rounded-full border font-sans text-xs transition-colors ${
                                                link.active
                                                    ? 'border-[#E2E6D9] bg-[#E2E6D9] text-[#1E1E1E]'
                                                    : link.url
                                                      ? 'border-gray-300 bg-transparent text-[#4A4A4A] hover:border-gray-400'
                                                      : 'cursor-not-allowed border-gray-200 bg-transparent text-gray-300'
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: label,
                                            }}
                                            onClick={(e) =>
                                                !link.url && e.preventDefault()
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Design Section */}
            <section className="mt-12 flex w-full flex-col border-b border-[#1E1E1E]/10 bg-[#E2E6D9] md:flex-row">
                <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-10 lg:p-24">
                    <h2 className="mb-8 font-serif text-4xl leading-tight text-[#1E1E1E] italic md:text-5xl">
                        Ingin buat desain
                        <br />
                        eksklusifmu sendiri?
                    </h2>
                    <p className="mb-6 font-sans text-sm font-medium text-[#1E1E1E]">
                        Keuntungan kalo kamu buat desain eksklusif sendiri
                    </p>
                    <ul className="mb-10 space-y-4">
                        <li className="flex items-start gap-3">
                            <svg
                                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8aaa03]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-sans text-sm leading-relaxed text-[#4A4A4A]">
                                Eksklusivitas, memberikan kesan istimewa kepada
                                tamu.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg
                                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8aaa03]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-sans text-sm leading-relaxed text-[#4A4A4A]">
                                Personal dan desain unik, mencerminkan
                                kepribadian pasangan.
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg
                                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#8aaa03]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-sans text-sm leading-relaxed text-[#4A4A4A]">
                                Kreativitas tanpa batas, bebas bereksperimen
                                dengan warna dan elemen.
                            </span>
                        </li>
                    </ul>
                    <div className="mt-2 w-full">
                        <a
                            href="#"
                            className="block w-full rounded-sm bg-[#1C1C1C] px-8 py-3 text-center font-sans text-xs font-medium tracking-wide text-white transition-colors hover:bg-black md:inline-block md:w-auto"
                        >
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
                <div className="relative min-h-[400px] w-full md:w-1/2">
                    <img
                        src="/images/preview-image_1.webp"
                        alt="Custom Design Presentation"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full bg-[#E2E6D9] pt-16 text-[#1E1E1E]">
                <div className="grid grid-cols-1 border-b border-[#1E1E1E]/10 md:grid-cols-3">
                    {/* Left Column */}
                    <div className="flex flex-col items-start border-b border-[#1E1E1E]/10 p-6 md:border-r md:border-b-0 md:p-10 lg:p-20">
                        <div className="mb-12 flex items-center gap-3">
                            <img
                                src="/images/favicon.svg"
                                alt="Logo"
                                className="h-8 w-8 brightness-0"
                            />
                            <span className="font-sans text-xl font-bold">
                                Invitin by Mekaya
                            </span>
                        </div>
                        <p className="max-w-sm font-sans text-sm leading-relaxed text-[#1E1E1E] md:text-[15px]">
                            Invitin adalah bagian dari Mekaya Studio yang
                            menawarkan undangan digital dengan desain elegan dan
                            segar. Desain kami dirancang dengan penuh
                            ketelitian, memastikan pengalaman yang berkesan bagi
                            setiap pengguna.
                        </p>
                    </div>

                    {/* Middle Column */}
                    <div className="flex flex-col items-center border-b border-[#1E1E1E]/10 p-6 md:border-r md:border-b-0 md:p-10 lg:p-20">
                        <h4 className="mb-12 font-serif font-medium tracking-wider uppercase">
                            SOSIAL MEDIA
                        </h4>
                        <div className="flex flex-col items-center space-y-6">
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-60"
                            >
                                <img
                                    src="/images/facebook-circle-line.svg"
                                    alt="Facebook"
                                    className="h-6 w-6 brightness-0"
                                />
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-60"
                            >
                                <img
                                    src="/images/instagram-line.svg"
                                    alt="Instagram"
                                    className="h-6 w-6 brightness-0"
                                />
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-60"
                            >
                                <img
                                    src="/images/twitter-x-line.svg"
                                    alt="X"
                                    className="h-5 w-5 brightness-0"
                                />
                            </a>
                            <a
                                href="#"
                                className="transition-opacity hover:opacity-60"
                            >
                                <img
                                    src="/images/tiktok-line.svg"
                                    alt="TikTok"
                                    className="h-6 w-6 brightness-0"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col items-center p-6 md:p-10 lg:p-20">
                        <h4 className="mb-12 font-serif font-medium tracking-wider uppercase">
                            MEDIA PEMBAYARAN
                        </h4>
                        <div className="grid grid-cols-2 items-center justify-items-center gap-x-12 gap-y-10">
                            <img
                                src="/images/Bank-Central-Asia.svg"
                                alt="BCA"
                                className="h-6 brightness-0"
                            />
                            <img
                                src="/images/Bank-Mandiri.svg"
                                alt="Mandiri"
                                className="h-6 brightness-0"
                            />
                            <img
                                src="/images/Jago.svg"
                                alt="Jago"
                                className="h-7 brightness-0"
                            />
                            <img
                                src="/images/SeaBank.svg"
                                alt="SeaBank"
                                className="h-7 brightness-0"
                            />
                            <img
                                src="/images/Gopay_logo-1.svg"
                                alt="Gopay"
                                className="h-6 brightness-0"
                            />
                            <img
                                src="/images/OVO.svg"
                                alt="OVO"
                                className="h-5 brightness-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Huge Text */}
                <div className="relative flex flex-col items-center overflow-hidden pt-16 pb-0">
                    <img
                        src="/images/favicon.svg"
                        alt="Logo"
                        className="z-10 mb-8 h-8 w-8 brightness-0"
                    />
                    <div className="flex w-full translate-y-4 overflow-hidden whitespace-nowrap">
                        <div className="flex shrink-0 animate-marquee">
                            <h1 className="pr-16 font-serif text-[8rem] leading-[0.8] tracking-tighter text-[#1E1E1E] md:text-[14rem] lg:text-[18rem]">
                                INVITIN BY MEKAYA
                            </h1>
                            <h1 className="pr-16 font-serif text-[8rem] leading-[0.8] tracking-tighter text-[#1E1E1E] md:text-[14rem] lg:text-[18rem]">
                                INVITIN BY MEKAYA
                            </h1>
                        </div>
                        <div
                            className="flex shrink-0 animate-marquee"
                            aria-hidden="true"
                        >
                            <h1 className="pr-16 font-serif text-[8rem] leading-[0.8] tracking-tighter text-[#1E1E1E] md:text-[14rem] lg:text-[18rem]">
                                INVITIN BY MEKAYA
                            </h1>
                            <h1 className="pr-16 font-serif text-[8rem] leading-[0.8] tracking-tighter text-[#1E1E1E] md:text-[14rem] lg:text-[18rem]">
                                INVITIN BY MEKAYA
                            </h1>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
