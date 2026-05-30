import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function Welcome({ featuredThemes = [] }: { featuredThemes?: any[] }) {
    const { auth } = usePage<SharedData>().props;
    const hasUser = auth.user !== null;

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1E1E1E] font-sans selection:bg-[#1E1E1E] selection:text-white overflow-x-hidden">
            <Head>
                <title>Invitin by Mekaya: Undangan Pernikahan Online dengan Desain dan Fitur Terbaik</title>
                {/* Notice: No webflow CSS here! Using purely native Tailwind */}
            </Head>

            {/* Hero Section */}
            <section className="relative w-full h-screen overflow-hidden flex flex-col justify-end items-center font-serif pb-32 md:pb-40">
                {/* Background Video */}
                <div className="absolute inset-0 z-0">
                    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                        <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    </video>
                    {/* Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Huge Text Marquee / Top Text */}
                <div className="absolute top-0 left-0 w-full overflow-hidden flex whitespace-nowrap pt-4 mix-blend-difference z-10">
                    <div className="flex animate-marquee shrink-0">
                        <h1 className="text-[12rem] font-bold tracking-tighter uppercase text-white leading-none pr-12">
                            INVITIN BY MEKAYA
                        </h1>
                        <h1 className="text-[12rem] font-bold tracking-tighter uppercase text-white leading-none pr-12">
                            INVITIN BY MEKAYA
                        </h1>
                    </div>
                    <div className="flex animate-marquee shrink-0" aria-hidden="true">
                        <h1 className="text-[12rem] font-bold tracking-tighter uppercase text-white leading-none pr-12">
                            INVITIN BY MEKAYA
                        </h1>
                        <h1 className="text-[12rem] font-bold tracking-tighter uppercase text-white leading-none pr-12">
                            INVITIN BY MEKAYA
                        </h1>
                    </div>
                </div>

                {/* Bottom Content */}
                <div className="z-10 flex flex-col items-center text-white text-center">
                    {/* Flower Logo */}
                    <img src="/images/favicon.svg" alt="Logo" className="w-16 h-16 mb-6 md:mb-8 brightness-0 invert" />
                    
                    {/* Main Title */}
                    <h2 className="text-6xl md:text-8xl font-medium tracking-tight drop-shadow-lg leading-tight">
                        Bukan wedding<br/>
                        <span className="italic">invitation biasa</span>
                    </h2>
                </div>

                {/* Floating Navbar Pill */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                    <nav className="bg-[#1C1C1C] text-white rounded-xl px-2 py-2 flex items-center gap-2 shadow-2xl backdrop-blur-md bg-opacity-90">
                        <div className="flex items-center px-6 gap-8 text-sm font-sans">
                            <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
                            <a href="#katalog" className="hover:text-gray-300 transition-colors">Katalog</a>
                            <a href="#kenapa-kami" className="hover:text-gray-300 transition-colors">Kenapa kami?</a>
                            <a href="#mitra" className="hover:text-gray-300 transition-colors">Mitra</a>
                        </div>
                        {hasUser ? (
                            <Link href="/dashboard" className="bg-white text-black px-6 py-3 rounded-lg text-sm font-sans font-medium hover:bg-gray-100 transition-colors">
                                Hubungi kami
                            </Link>
                        ) : (
                            <Link href="/login" className="bg-white text-black px-6 py-3 rounded-lg text-sm font-sans font-medium hover:bg-gray-100 transition-colors">
                                Hubungi kami
                            </Link>
                        )}
                    </nav>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="w-full min-h-screen bg-[#FDFBF7] py-32 relative z-20 px-4 md:px-10 lg:px-20 flex flex-col justify-between">
                <div className="max-w-6xl mt-10">
                    <p className="text-3xl md:text-[2.75rem] font-serif italic text-[#8B9B3F] leading-[1.4] mb-16">
                            Saat undangan tiba di tangan para tamu, itulah momen pertama di mana mereka merasakan kehadiran Anda dalam pernikahan. Dengan desain yang simpel dan elegan, undangan Anda akan memberikan sentuhan istimewa yang memancarkan keanggunan dan keistimewaan hari pernikahan Anda.
                        </p>
                        <p className="text-3xl md:text-[2.75rem] font-serif italic text-[#8B9B3F] leading-[1.4]">
                            Biarkan setiap tamu merasakan kehangatan dan keindahan momen spesial Anda sejak mereka menerima undangan yang memikat hati.
                        </p>
                    </div>
                    
                    <div className="flex items-end gap-12 mt-40">
                        <div>
                            <div className="text-6xl md:text-[6rem] font-serif text-[#8B9B3F] mb-4 leading-none">100%</div>
                            <div className="text-xl md:text-2xl font-bold tracking-tight text-[#1E1E1E]">Desain Eksklusif</div>
                        </div>
                        <div>
                            <div className="text-6xl md:text-[6rem] font-serif text-[#8B9B3F] mb-4 leading-none">2026</div>
                            <div className="text-xl md:text-2xl font-bold tracking-tight text-[#1E1E1E]">Hadir Untuk Anda</div>
                        </div>
                    </div>
            </section>

            {/* Catalog Section */}
            <section id="katalog" className="py-24 bg-[#F6F4EF] text-[#1E1E1E] border-t border-gray-200/50 px-4 md:px-10 lg:px-20">
                <div className="w-full">
                    <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-serif italic mb-16 text-[#1E1E1E]">
                        Pilih opsi terbaik untuk pernikahanmu
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-gray-300/60 mb-16">
                        {featuredThemes.length > 0 ? featuredThemes.map((theme: any) => (
                            <div key={theme.id} className="border-b border-r border-gray-300/60 bg-transparent p-4 md:p-6 flex flex-col group">
                                <div className="aspect-[4/3] bg-[#E2E6D9] mb-4 md:mb-6 overflow-hidden relative">
                                    {/* Using preview image from local if theme doesn't have one */}
                                    <img 
                                        src={theme.thumbnail || "/images/preview-image_1.webp"} 
                                        alt={theme.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="mb-4 md:mb-6 flex-grow">
                                    <h3 className="text-lg md:text-2xl font-serif text-[#1E1E1E] mb-1">{theme.name}</h3>
                                    <span className="font-sans text-xs md:text-sm text-[#1E1E1E]">Rp {theme.price.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link 
                                        href={hasUser ? `/checkout/${theme.slug}` : `/register`} 
                                        className="bg-[#1C1C1C] text-white w-full py-2 md:py-3 text-center text-[10px] md:text-xs font-medium tracking-wide hover:bg-black transition-colors"
                                    >
                                        Pilih Tema
                                    </Link>
                                    <a 
                                        href={`/demo/${theme.slug}`} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="border border-[#1C1C1C]/20 bg-transparent text-[#1C1C1C] w-full py-2 md:py-3 text-center text-[10px] md:text-xs font-medium tracking-wide hover:bg-white transition-colors"
                                    >
                                        Lihat Tema
                                    </a>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-4 text-center py-20 text-gray-500 font-serif text-2xl">Memuat katalog tema...</div>
                        )}
                    </div>

                    {/* View More Themes */}
                    <div className="flex flex-col items-center justify-center mt-12 mb-4 pt-12 border-t border-gray-300/60 w-full">
                        <p className="text-[#4A4A4A] font-sans mb-6 text-lg">Tenang! ini hanya sebagian saja.</p>
                        <Link href="/themes" className="px-8 py-3 bg-[#1E1E1E] text-white rounded-lg font-medium hover:bg-black transition-colors font-sans uppercase tracking-wider text-sm border border-[#1E1E1E]">
                            Lihat Lain
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section id="kenapa-kami" className="py-32 bg-[#F6F4EF] px-4 md:px-10 lg:px-20">
                <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24">
                    <div className="w-full md:w-5/12">
                        <h2 className="text-4xl md:text-[4.5rem] lg:text-[5rem] font-serif italic text-[#1E1E1E] leading-tight sticky top-32">
                            Kenapa harus Invitin?
                        </h2>
                    </div>
                    <div className="w-full md:w-7/12 flex flex-col">
                        <div className="flex gap-6 py-10 border-b border-gray-300/40">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 flex items-center justify-center flex-shrink-0 border border-[#8aaa03]/50 shadow-md">
                                <img src="/images/elegan.svg" alt="Elegan" className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-[1.75rem] font-serif italic text-[#1E1E1E] mb-2">Desain elegan</h3>
                                <p className="text-[#4A4A4A] leading-relaxed text-[15px] font-sans">Tim desainer Invitin merancang undangan dengan elegan. Pilih desain sesuai tema pernikahan Anda.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 py-10 border-b border-gray-300/40">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 flex items-center justify-center flex-shrink-0 border border-[#8aaa03]/50 shadow-md">
                                <img src="/images/mudah.svg" alt="Mudah" className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-[1.75rem] font-serif italic text-[#1E1E1E] mb-2">Proses yang mudah</h3>
                                <p className="text-[#4A4A4A] leading-relaxed text-[15px] font-sans">Buat undangan pernikahan impian dengan mudah. Tambahkan foto, atur teks, dan lihat perubahan langsung.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 py-10 border-b border-gray-300/40">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 flex items-center justify-center flex-shrink-0 border border-[#8aaa03]/50 shadow-md">
                                <img src="/images/kualitas.svg" alt="Kualitas" className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-[1.75rem] font-serif italic text-[#1E1E1E] mb-2">Kualitas Terbaik</h3>
                                <p className="text-[#4A4A4A] leading-relaxed text-[15px] font-sans">Dengan Invitin, Anda mendapatkan undangan pernikahan berkualitas tinggi dengan harga bersahabat.</p>
                            </div>
                        </div>
                        <div className="flex gap-6 py-10 border-b border-gray-300/40">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8aaa03]/80 to-[#8aaa03]/30 flex items-center justify-center flex-shrink-0 border border-[#8aaa03]/50 shadow-md">
                                <img src="/images/inovasi.svg" alt="Inovasi" className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-[1.75rem] font-serif italic text-[#1E1E1E] mb-2">Inovasi Terus Menerus</h3>
                                <p className="text-[#4A4A4A] leading-relaxed text-[15px] font-sans">Setiap undangan pernikahan di Invitin dirancang dengan keindahan dan elegansi oleh tim desainer kreatif kami. Pilih berbagai desain yang sesuai dengan gaya pernikahan Anda.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-[#E2E6D9] text-[#1E1E1E] w-full pt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#1E1E1E]/10">
                    {/* Left Column */}
                    <div className="p-6 md:p-10 lg:p-20 flex flex-col items-start border-b md:border-b-0 md:border-r border-[#1E1E1E]/10">
                            <div className="flex items-center gap-3 mb-12">
                                <img src="/images/favicon.svg" alt="Logo" className="w-8 h-8 brightness-0" />
                                <span className="text-xl font-bold font-sans">Invitin by Mekaya</span>
                            </div>
                            <p className="text-[#1E1E1E] leading-relaxed text-sm md:text-[15px] font-sans max-w-sm">
                                Invitin adalah bagian dari Mekaya Studio yang menawarkan undangan digital dengan desain elegan dan segar. Desain kami dirancang dengan penuh ketelitian, memastikan pengalaman yang berkesan bagi setiap pengguna.
                            </p>
                        </div>
                        
                        {/* Middle Column */}
                    <div className="p-6 md:p-10 lg:p-20 flex flex-col items-center border-b md:border-b-0 md:border-r border-[#1E1E1E]/10">
                            <h4 className="font-serif uppercase tracking-wider mb-12 font-medium">SOSIAL MEDIA</h4>
                            <div className="flex flex-col space-y-6 items-center">
                                <a href="#" className="hover:opacity-60 transition-opacity"><img src="/images/facebook-circle-line.svg" alt="Facebook" className="w-6 h-6 brightness-0" /></a>
                                <a href="#" className="hover:opacity-60 transition-opacity"><img src="/images/instagram-line.svg" alt="Instagram" className="w-6 h-6 brightness-0" /></a>
                                <a href="#" className="hover:opacity-60 transition-opacity"><img src="/images/twitter-x-line.svg" alt="X" className="w-5 h-5 brightness-0" /></a>
                                <a href="#" className="hover:opacity-60 transition-opacity"><img src="/images/tiktok-line.svg" alt="TikTok" className="w-6 h-6 brightness-0" /></a>
                            </div>
                        </div>

                        {/* Right Column */}
                    <div className="p-6 md:p-10 lg:p-20 flex flex-col items-center">
                            <h4 className="font-serif uppercase tracking-wider mb-12 font-medium">MEDIA PEMBAYARAN</h4>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-10 items-center justify-items-center">
                                <img src="/images/Bank-Central-Asia.svg" alt="BCA" className="h-6 brightness-0" />
                                <img src="/images/Bank-Mandiri.svg" alt="Mandiri" className="h-6 brightness-0" />
                                <img src="/images/Jago.svg" alt="Jago" className="h-7 brightness-0" />
                                <img src="/images/SeaBank.svg" alt="SeaBank" className="h-7 brightness-0" />
                                <img src="/images/Gopay_logo-1.svg" alt="Gopay" className="h-6 brightness-0" />
                                <img src="/images/OVO.svg" alt="OVO" className="h-5 brightness-0" />
                            </div>
                    </div>
                </div>

                {/* Bottom Huge Text */}
                <div className="pt-16 pb-0 flex flex-col items-center overflow-hidden relative">
                    <img src="/images/favicon.svg" alt="Logo" className="w-8 h-8 brightness-0 mb-8 z-10" />
                    <div className="w-full flex overflow-hidden whitespace-nowrap translate-y-4">
                        <div className="flex animate-marquee shrink-0">
                            <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-serif leading-[0.8] text-[#1E1E1E] tracking-tighter pr-16">
                                INVITIN BY MEKAYA
                            </h1>
                            <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-serif leading-[0.8] text-[#1E1E1E] tracking-tighter pr-16">
                                INVITIN BY MEKAYA
                            </h1>
                        </div>
                        <div className="flex animate-marquee shrink-0" aria-hidden="true">
                            <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-serif leading-[0.8] text-[#1E1E1E] tracking-tighter pr-16">
                                INVITIN BY MEKAYA
                            </h1>
                            <h1 className="text-[8rem] md:text-[14rem] lg:text-[18rem] font-serif leading-[0.8] text-[#1E1E1E] tracking-tighter pr-16">
                                INVITIN BY MEKAYA
                            </h1>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
