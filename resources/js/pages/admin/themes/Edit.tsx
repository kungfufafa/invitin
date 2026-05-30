import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ theme }: { theme: any }) {
    const { data, setData, put, processing, errors } = useForm({
        name: theme.name || '',
        category: theme.category || '',
        style: theme.style || '',
        price: theme.price || 0,
        status: theme.status || 'active',
        is_featured: theme.is_featured || false,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/themes/${theme.id}`);
    };

    return (
        <>
            <Head title="Edit Theme" />
            <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full">
                <div className="mb-4">
                    <h2 className="text-xl font-bold">Edit Theme: {theme.name}</h2>
                </div>
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                        />
                        {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="style">Style</Label>
                        <Input
                            id="style"
                            value={data.style}
                            onChange={(e) => setData('style', e.target.value)}
                        />
                        {errors.style && <div className="text-red-500 text-sm">{errors.style}</div>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (IDR)</Label>
                        <Input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', parseInt(e.target.value))}
                            required
                        />
                        {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button type="submit" disabled={processing}>Update Theme</Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href="/admin/themes">Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Themes',
            href: '/admin/themes',
        },
        {
            title: 'Edit',
            href: '#', // Would need dynamic ID which we don't have in layout static definition, so leaving #
        },
    ],
};
