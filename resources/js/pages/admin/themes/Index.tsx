import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';


export default function Index({ themes }: { themes: any }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this theme?')) {
            destroy(`/admin/themes/${id}`);
        }
    };

    return (
        <>
            <Head title="Themes" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Themes</h2>
                    <Button asChild>
                        <Link href="/admin/themes/create">Create New Theme</Link>
                    </Button>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border overflow-hidden bg-white dark:bg-zinc-950">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-zinc-900 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {themes.data.map((theme: any) => (
                                <tr key={theme.id} className="border-b dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{theme.name}</td>
                                    <td className="px-6 py-4">{theme.category}</td>
                                    <td className="px-6 py-4">Rp {theme.price.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4">{theme.status}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/admin/themes/${theme.id}/edit`}>Edit</Link>
                                        </Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(theme.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin',
        },
        {
            title: 'Themes',
            href: '/admin/themes',
        },
    ],
};
