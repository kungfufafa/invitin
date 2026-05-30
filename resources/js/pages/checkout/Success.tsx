import { Head, Link } from '@inertiajs/react';

export default function Success({ invitation }: { invitation: any }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-12 flex items-center">
            <Head title="Payment Successful" />
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 p-8 sm:p-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Payment Successful!</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Thank you for purchasing <strong>{invitation.theme.name}</strong>. 
                        Your digital invitation workspace has been created successfully.
                    </p>
                    
                    <Link 
                        href="/app" 
                        className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors"
                    >
                        Go to My Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
