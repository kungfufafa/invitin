import { useForm, usePage } from '@inertiajs/react';
import WorkspaceLayout from '@/layouts/workspace-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Globe, Check } from 'lucide-react';
import { useEffect } from 'react';

export default function WorkspaceSettings({ invitation }: { invitation: any }) {
    const { flash } = usePage<any>().props;

    const { data, setData, put, post, processing, errors } = useForm({
        title: invitation.title || '',
        slug: invitation.slug || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/workspace/${invitation.id}/settings`);
    };

    const handlePublish = () => {
        if (confirm('Apakah Anda yakin ingin mempublikasikan undangan ini? Tautan akan bisa diakses oleh publik.')) {
            post(`/workspace/${invitation.id}/publish`);
        }
    };

    return (
        <WorkspaceLayout invitation={invitation} title="Pengaturan Umum">
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2 border border-emerald-200">
                    <Check className="w-5 h-5" />
                    <p className="font-medium text-sm">{flash.success}</p>
                </div>
            )}

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mb-8 shadow-sm">
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-semibold text-neutral-900">Informasi Undangan</h2>
                    <p className="text-sm text-neutral-500 mt-1">Ubah judul dan tautan URL kustom undangan Anda.</p>
                </div>
                
                <form onSubmit={handleUpdate} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Judul Undangan</Label>
                        <Input 
                            id="title" 
                            value={data.title} 
                            onChange={e => setData('title', e.target.value)} 
                            placeholder="Contoh: The Wedding of Radit & Nabila" 
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Tautan Kustom (URL)</Label>
                        <div className="flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-neutral-300 bg-neutral-50 text-neutral-500 sm:text-sm">
                                invitin.test/u/
                            </span>
                            <Input 
                                id="slug" 
                                value={data.slug} 
                                onChange={e => setData('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} 
                                className="rounded-none rounded-r-md border-l-0"
                                placeholder="radit-nabila" 
                            />
                        </div>
                        {errors.slug && <p className="text-sm text-red-500">{errors.slug}</p>}
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={processing}>
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-neutral-900">Status Publikasi</h2>
                        <p className="text-sm text-neutral-500 mt-1">Kendalikan apakah undangan Anda dapat diakses publik atau tidak.</p>
                    </div>
                    {invitation.status === 'published' ? (
                        <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 font-medium text-sm flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Sedang Aktif
                        </div>
                    ) : (
                        <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200 font-medium text-sm">
                            Draft Tertutup
                        </div>
                    )}
                </div>
                
                <div className="p-6 bg-neutral-50 flex items-center justify-between">
                    <p className="text-sm text-neutral-600 max-w-xl">
                        Saat ini undangan Anda dalam status <strong>{invitation.status === 'published' ? 'Dipublikasikan' : 'Draft'}</strong>. 
                        {invitation.status !== 'published' && ' Klik tombol publish agar tamu Anda dapat mengakses tautan undangan.'}
                    </p>
                    
                    {invitation.status !== 'published' && (
                        <Button onClick={handlePublish} className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                            <Globe className="w-4 h-4" /> Publikasikan Sekarang
                        </Button>
                    )}
                </div>
            </div>
        </WorkspaceLayout>
    );
}
