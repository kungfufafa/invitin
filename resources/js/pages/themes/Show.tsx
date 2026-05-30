import { Head, Link } from '@inertiajs/react';

export default function Show({ theme }: { theme: any }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12">
            <Head title={`${theme.name} - Theme Details`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/themes" className="text-blue-600 dark:text-blue-400 hover:underline">
                        &larr; Back to Catalog
                    </Link>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="aspect-square lg:aspect-auto bg-gray-100 dark:bg-zinc-800 relative flex items-center justify-center min-h-[400px]">
                            {/* Placeholder for theme preview image */}
                            <div className="text-gray-400 dark:text-zinc-500 text-xl font-medium">Theme Preview Image</div>
                        </div>
                        
                        <div className="p-10 lg:p-16 flex flex-col justify-center">
                            <div className="mb-4 flex gap-2">
                                <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                    {theme.category}
                                </span>
                                <span className="bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                                    {theme.style}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                                {theme.name}
                            </h1>
                            
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                Rp {theme.price.toLocaleString('id-ID')}
                            </div>
                            
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10">
                                This beautiful {theme.style} {theme.category} invitation theme features smooth animations, 
                                responsive design, and easy customization. Perfect for your special day.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={`/checkout/${theme.slug}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors text-center">
                                    Use This Theme
                                </Link>
                                <button className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-bold py-4 px-8 rounded-xl transition-colors text-center">
                                    Live Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
