import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    { title: 'My Workspace', href: '/app' },
];

export default function Dashboard({ invitations = [] }: { invitations?: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Workspace" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">My Invitations</h2>
                    <Link 
                        href="/themes" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Browse New Themes
                    </Link>
                </div>
                
                {invitations.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-12 text-center">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No invitations yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Browse our catalog to find the perfect theme for your event.</p>
                        <Link 
                            href="/themes" 
                            className="inline-block bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-lg font-semibold"
                        >
                            Explore Themes
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {invitations.map((invitation) => (
                            <div key={invitation.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                <div className="aspect-video bg-gray-100 dark:bg-zinc-800 p-4 flex items-center justify-center relative">
                                    <span className="text-gray-400 dark:text-zinc-500 font-medium text-center">
                                        {invitation.theme.name}
                                    </span>
                                    <div className="absolute top-2 right-2 px-2 py-1 bg-white/80 dark:bg-black/80 rounded text-xs font-semibold capitalize">
                                        {invitation.status}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                        {invitation.data_json?.bride || 'Bride'} & {invitation.data_json?.groom || 'Groom'}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        Purchased Theme: {invitation.theme.name}
                                    </p>
                                    <Link href={`/workspace/${invitation.id}`} className="block text-center w-full bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white py-2 rounded-lg font-medium transition-colors text-sm">
                                        Buka Workspace
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
