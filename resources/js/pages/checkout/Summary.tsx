import { Head, useForm, Link } from '@inertiajs/react';

export default function Summary({ theme }: { theme: any }) {
    const { post, processing } = useForm();

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/checkout/${theme.slug}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12">
            <Head title={`Checkout - ${theme.name}`} />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 sm:p-12">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout Summary</h1>
                    
                    <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 dark:bg-zinc-950 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-zinc-800 rounded-xl flex-shrink-0"></div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{theme.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 capitalize">{theme.category} • {theme.style}</p>
                            <div className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                                Rp {theme.price.toLocaleString('id-ID')}
                            </div>
                        </div>
                    </div>
                    
                    <form onSubmit={handlePayment}>
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Processing Payment...' : 'Confirm & Pay Now'}
                        </button>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <Link href={`/themes/${theme.slug}`} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-sm">
                            Cancel and go back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
