import { Head, Link, usePage, router } from '@inertiajs/react';
import type { SharedData } from '@/types';
import { useState } from 'react';

export default function Index({ themes, filters = {}, categories = [] }: { themes: any, filters?: any, categories?: string[] }) {
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
        <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E] font-sans selection:bg-[#1E1E1E] selection:text-white overflow-x-hidden">
            <Head title="Tema Undangan - Invitin by Mekaya" />
            
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
                <nav className="bg-[#1C1C1C] text-white rounded-xl px-2 py-2 flex items-center gap-2 shadow-2xl backdrop-blur-md bg-opacity-90">
                    <div className="flex items-center px-6 gap-8 text-sm font-sans">
                        <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
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

            <div className="w-full">
                {/* Header Section */}
                <div className="pt-24 pb-12 px-4 md:px-10 lg:px-20 flex flex-col items-center text-center">
                    <div className="text-sm font-sans mb-6 text-[#4A4A4A]">Home / Tema Desain</div>
                    <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-serif text-[#1E1E1E] leading-tight max-w-5xl">
                        <span className="italic">Pilih Tema Desain Terbaik Untuk Momen</span><br/>
                        <span className="italic">Spesial Pernikahanmu</span>
                    </h1>
                </div>

                {/* Filter Section */}
                <div className="px-4 md:px-10 lg:px-20 pb-8 flex flex-col lg:flex-row gap-6 items-center justify-between border-b border-gray-300/60 mb-8">
                    {/* Left side: Categories */}
                    <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start w-full lg:w-auto">
                        <button 
                            onClick={() => {
                                setCategory('');
                                handleFilterChange('category', '');
                            }}
                            className={`px-6 py-2 text-xs font-sans rounded-full border transition-colors ${category === '' ? 'bg-[#E2E6D9] border-[#E2E6D9] text-[#1E1E1E]' : 'bg-transparent border-[#1E1E1E]/20 text-[#1E1E1E] hover:border-[#1E1E1E]/40'}`}
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
                                className={`px-6 py-2 text-xs font-sans rounded-full border transition-colors capitalize ${category === cat ? 'bg-[#E2E6D9] border-[#E2E6D9] text-[#1E1E1E]' : 'bg-transparent border-[#1E1E1E]/20 text-[#1E1E1E] hover:border-[#1E1E1E]/40'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Right side: Results count & Sort */}
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                        <span className="text-sm font-sans text-[#1E1E1E]">{themes.total || 0} Result</span>
                        <div className="relative">
                            <select 
                                value={sort} 
                                onChange={(e) => {
                                    setSort(e.target.value);
                                    handleFilterChange('sort', e.target.value);
                                }}
                                className="bg-transparent border border-[#1E1E1E]/20 text-[#1E1E1E] text-xs rounded-full focus:ring-[#8B9B3F] focus:border-[#8B9B3F] block w-40 px-4 py-2 font-sans cursor-pointer appearance-none pr-8"
                            >
                                <option value="latest">Sort: Terbaru</option>
                                <option value="oldest">Sort: Terlama</option>
                                <option value="price_asc">Sort: Harga Terendah</option>
                                <option value="price_desc">Sort: Harga Tertinggi</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1E1E1E]">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="px-4 md:px-10 lg:px-20 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-gray-300/60 mb-16">
                        {themes.data && themes.data.length > 0 ? themes.data.map((theme: any) => (
                            <div key={theme.id} className="border-b border-r border-gray-300/60 bg-transparent p-4 md:p-6 flex flex-col group">
                                <div className="aspect-[4/3] bg-[#E2E6D9] mb-4 md:mb-6 overflow-hidden relative">
                                    <img 
                                        src={theme.thumbnail || "/images/preview-image_1.webp"} 
                                        alt={theme.name} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {theme.is_featured && (
                                        <div className="absolute top-4 left-4 bg-[#1E1E1E] text-white text-xs font-medium tracking-wider px-3 py-1 uppercase">
                                            Featured
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4 md:mb-6 flex-grow">
                                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start mb-1">
                                        <h3 className="text-lg md:text-2xl font-serif text-[#1E1E1E]">{theme.name}</h3>
                                        <span className="font-sans text-xs md:text-sm font-medium text-[#1E1E1E] mt-1">Rp {theme.price.toLocaleString('id-ID')}</span>
                                    </div>
                                    <p className="text-sm text-[#4A4A4A] capitalize">{theme.category} • {theme.style}</p>
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
                            <div className="col-span-4 text-center py-20 text-[#4A4A4A] font-serif text-2xl italic">Belum ada tema yang tersedia...</div>
                        )}
                    </div>
                    
                    {/* Pagination */}
                    {themes.links && themes.links.length > 0 && (
                        <div className="flex justify-center mt-16 mb-8">
                            <div className="flex gap-2 items-center">
                                {themes.links.map((link: any, i: number) => {
                                    let label = link.label;
                                    if (label.includes('Previous')) label = '←';
                                    if (label.includes('Next')) label = '→';
                                    
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            preserveScroll
                                            className={`w-8 h-8 flex items-center justify-center text-xs font-sans rounded-full border transition-colors ${
                                                link.active 
                                                    ? 'bg-[#E2E6D9] text-[#1E1E1E] border-[#E2E6D9]' 
                                                    : link.url 
                                                        ? 'bg-transparent text-[#4A4A4A] border-gray-300 hover:border-gray-400' 
                                                        : 'bg-transparent text-gray-300 border-gray-200 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: label }}
                                            onClick={(e) => !link.url && e.preventDefault()}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Custom Design Section */}
            <section className="w-full flex flex-col md:flex-row bg-[#E2E6D9] mt-12 border-b border-[#1E1E1E]/10">
                <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-24 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-serif italic text-[#1E1E1E] mb-8 leading-tight">
                        Ingin buat desain<br/>eksklusifmu sendiri?
                    </h2>
                    <p className="text-[#1E1E1E] font-sans mb-6 font-medium text-sm">Keuntungan kalo kamu buat desain eksklusif sendiri</p>
                    <ul className="space-y-4 mb-10">
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#8aaa03] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[#4A4A4A] font-sans text-sm leading-relaxed">Eksklusivitas, memberikan kesan istimewa kepada tamu.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#8aaa03] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[#4A4A4A] font-sans text-sm leading-relaxed">Personal dan desain unik, mencerminkan kepribadian pasangan.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-[#8aaa03] mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[#4A4A4A] font-sans text-sm leading-relaxed">Kreativitas tanpa batas, bebas bereksperimen dengan warna dan elemen.</span>
                        </li>
                    </ul>
                    <div className="w-full mt-2">
                        <a href="#" className="block md:inline-block w-full md:w-auto text-center bg-[#1C1C1C] text-white px-8 py-3 text-xs font-sans font-medium hover:bg-black transition-colors rounded-sm tracking-wide">
                            Pesan Sekarang
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 relative min-h-[400px]">
                    <img src="/images/preview-image_1.webp" alt="Custom Design Presentation" className="absolute inset-0 w-full h-full object-cover" />
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
