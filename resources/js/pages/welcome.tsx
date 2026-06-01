import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { create as checkoutCreate } from '@/routes/checkout';

export default function Welcome({
    featuredThemes = [],
}: {
    featuredThemes?: any[];
}) {
    const { auth } = usePage<SharedData>().props;
    const hasUser = auth.user !== null;

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#FDFBF7] font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head>
                <title>
                    Invitin by Mekaya: Undangan Pernikahan Online dengan Desain
                    dan Fitur Terbaik
                </title>
                {/* Notice: No webflow CSS here! Using purely native Tailwind */}
            </Head>

            {/* Hero Section */}
            <section className="relative flex h-screen w-full flex-col items-center justify-end overflow-hidden pb-32 font-serif md:pb-40">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    >
                        <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    </video>
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Huge Text Marquee / Top Text */}
                <div className="absolute top-0 left-0 z-10 flex w-full overflow-hidden pt-4 whitespace-nowrap mix-blend-difference">
                    <div className="flex shrink-0 animate-marquee">
                        <h1 className="pr-12 text-[12rem] leading-none font-bold tracking-tighter text-white uppercase">
                            INVITIN BY MEKAYA
                        </h1>
                        <h1 className="pr-12 text-[12rem] leading-none font-bold tracking-tighter text-white uppercase">
                            INVITIN BY MEKAYA
                        </h1>
                    </div>
                    <div
                        className="flex shrink-0 animate-marquee"
                        aria-hidden="true"
                    >
                        <h1 className="pr-12 text-[12rem] leading-none font-bold tracking-tighter text-white uppercase">
                            INVITIN BY MEKAYA
                        </h1>
                        <h1 className="pr-12 text-[12rem] leading-none font-bold tracking-tighter text-white uppercase">
                            INVITIN BY MEKAYA
                        </h1>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="z-10 flex flex-col items-center text-center text-white">
                    {/* Flower Logo */}
                    <img
                        src="/images/favicon.svg"
                        alt="Logo"
                        className="mb-6 h-16 w-16 brightness-0 invert md:mb-8"
                    />

                    {/* Main Title */}
                    <h2 className="text-6xl leading-tight font-medium tracking-tight drop-shadow-lg md:text-8xl">
                        Bukan wedding
                        <br />
                        <span className="italic">invitation biasa</span>
                    </h2>
                </div>

                {/* Floating Navbar Pill */}
                <div className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2">
                    <nav className="bg-opacity-90 flex items-center gap-2 rounded-xl bg-[#1C1C1C] px-2 py-2 text-white shadow-2xl backdrop-blur-md">
                        <div className="flex items-center gap-8 px-6 font-sans text-sm">
                            <a
                                href="#"
                                className="transition-colors hover:text-gray-300"
                            >
                                Home
                            </a>
                            <a
                                href="#katalog"
                                className="transition-colors hover:text-gray-300"
                            >
                                Katalog
                            </a>
                            <a
                                href="#kenapa-kami"
                                className="transition-colors hover:text-gray-300"
                            >
                                Kenapa kami?
                            </a>
                            <a
                                href="#mitra"
                                className="transition-colors hover:text-gray-300"
                            >
                                Mitra
                            </a>
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
            </section>

            {/* Introduction Section */}
            <section className="relative z-20 flex min-h-screen w-full flex-col justify-between bg-[#FDFBF7] px-4 py-32 md:px-10 lg:px-20">
                <div className="mt-10 max-w-6xl">
                    <p className="mb-16 font-serif text-3xl leading-[1.4] text-[#8B9B3F] italic md:text-[2.75rem]">
                        Saat undangan tiba di tangan para tamu, itulah momen
                        pertama di mana mereka merasakan kehadiran Anda dalam
                        pernikahan. Dengan desain yang simpel dan elegan,
                        undangan Anda akan memberikan sentuhan istimewa yang
                        memancarkan keanggunan dan keistimewaan hari pernikahan
                        Anda.
                    </p>
                    <p className="font-serif text-3xl leading-[1.4] text-[#8B9B3F] italic md:text-[2.75rem]">
                        Biarkan setiap tamu merasakan kehangatan dan keindahan
                        momen spesial Anda sejak mereka menerima undangan yang
                        memikat hati.
                    </p>
                </div>

                <div className="mt-40 flex items-end gap-12">
                    <div>
                        <div className="mb-4 font-serif text-6xl leading-none text-[#8B9B3F] md:text-[6rem]">
                            100%
                        </div>
                        <div className="text-xl font-bold tracking-tight text-[#1E1E1E] md:text-2xl">
                            Desain Eksklusif
                        </div>
                    </div>
                    <div>
                        <div className="mb-4 font-serif text-6xl leading-none text-[#8B9B3F] md:text-[6rem]">
                            2026
                        </div>
                        <div className="text-xl font-bold tracking-tight text-[#1E1E1E] md:text-2xl">
                            Hadir Untuk Anda
                        </div>
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section
                id="katalog"
                className="border-t border-gray-200/50 bg-[#F6F4EF] px-4 py-24 text-[#1E1E1E] md:px-10 lg:px-20"
            >
                <div className="w-full">
                    <h2 className="mb-16 font-serif text-4xl text-[#1E1E1E] italic md:text-5xl lg:text-[4rem]">
                        Pilih opsi terbaik untuk pernikahanmu
                    </h2>

                    <div className="mb-16 grid grid-cols-2 border-t border-l border-gray-300/60 md:grid-cols-3 lg:grid-cols-4">
                        {featuredThemes.length > 0 ? (
                            featuredThemes.map((theme: any) => (
                                <div
                                    key={theme.id}
                                    className="group flex flex-col border-r border-b border-gray-300/60 bg-transparent p-4 md:p-6"
                                >
                                    <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-[#E2E6D9] md:mb-6">
                                        {/* Using preview image from local if theme doesn't have one */}
                                        <img
                                            src={
                                                theme.thumbnail ||
                                                '/images/preview-image_1.webp'
                                            }
                                            alt={theme.name}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="mb-4 flex-grow md:mb-6">
                                        <h3 className="mb-1 font-serif text-lg text-[#1E1E1E] md:text-2xl">
                                            {theme.name}
                                        </h3>
                                        <span className="font-sans text-xs text-[#1E1E1E] md:text-sm">
                                            Rp{' '}
                                            {theme.price.toLocaleString(
                                                'id-ID',
                                            )}
                                        </span>
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
                            <div className="col-span-4 py-20 text-center font-serif text-2xl text-gray-500">
                                Memuat katalog tema...
                            </div>
                        )}
                    </div>

                    {/* View More Themes */}
                    <div className="mt-12 mb-4 flex w-full flex-col items-center justify-center border-t border-gray-300/60 pt-12">
                        <p className="mb-6 font-sans text-lg text-[#4A4A4A]">
                            Tenang! ini hanya sebagian saja.
                        </p>
                        <Link
                            href="/themes"
                            className="rounded-lg border border-[#1E1E1E] bg-[#1E1E1E] px-8 py-3 font-sans text-sm font-medium tracking-wider text-white uppercase transition-colors hover:bg-black"
                        >
                            Lihat Lain
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section
                id="kenapa-kami"
                className="bg-[#F6F4EF] px-4 py-32 md:px-10 lg:px-20"
            >
                <div className="flex w-full flex-col gap-16 md:flex-row md:gap-24">
                    <div className="w-full md:w-5/12">
                        <h2 className="sticky top-32 font-serif text-4xl leading-tight text-[#1E1E1E] italic md:text-[4.5rem] lg:text-[5rem]">
                            Kenapa harus Invitin?
                        </h2>
                    </div>
                    <div className="flex w-full flex-col md:w-7/12">
                        <div className="flex gap-6 border-b border-gray-300/40 py-10">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#8aaa03]/50 bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 shadow-md">
                                <img
                                    src="/images/elegan.svg"
                                    alt="Elegan"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h3 className="mb-2 font-serif text-[1.75rem] text-[#1E1E1E] italic">
                                    Desain elegan
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4A4A]">
                                    Tim desainer Invitin merancang undangan
                                    dengan elegan. Pilih desain sesuai tema
                                    pernikahan Anda.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-gray-300/40 py-10">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#8aaa03]/50 bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 shadow-md">
                                <img
                                    src="/images/mudah.svg"
                                    alt="Mudah"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h3 className="mb-2 font-serif text-[1.75rem] text-[#1E1E1E] italic">
                                    Proses yang mudah
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4A4A]">
                                    Buat undangan pernikahan impian dengan
                                    mudah. Tambahkan foto, atur teks, dan lihat
                                    perubahan langsung.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-gray-300/40 py-10">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#8aaa03]/50 bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 shadow-md">
                                <img
                                    src="/images/kualitas.svg"
                                    alt="Kualitas"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h3 className="mb-2 font-serif text-[1.75rem] text-[#1E1E1E] italic">
                                    Kualitas Terbaik
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4A4A]">
                                    Dengan Invitin, Anda mendapatkan undangan
                                    pernikahan berkualitas tinggi dengan harga
                                    bersahabat.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 border-b border-gray-300/40 py-10">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-[#8aaa03]/50 bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 shadow-md">
                                <img
                                    src="/images/inovasi.svg"
                                    alt="Inovasi"
                                    className="h-8 w-8"
                                />
                            </div>
                            <div>
                                <h3 className="mb-2 font-serif text-[1.75rem] text-[#1E1E1E] italic">
                                    Inovasi Terus Menerus
                                </h3>
                                <p className="font-sans text-[15px] leading-relaxed text-[#4A4A4A]">
                                    Setiap undangan pernikahan di Invitin
                                    dirancang dengan keindahan dan elegansi oleh
                                    tim desainer kreatif kami. Pilih berbagai
                                    desain yang sesuai dengan gaya pernikahan
                                    Anda.
                                </p>
                            </div>
                        </div>
                    </div>
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
