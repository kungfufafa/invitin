import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center h-full text-lg font-semibold">Total Users</div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center h-full text-lg font-semibold">Total Orders</div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center h-full text-lg font-semibold">Revenue</div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-4">
                    <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
                    <p>Welcome to the Invitin Admin area.</p>
                </div>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin',
        },
    ],
};
