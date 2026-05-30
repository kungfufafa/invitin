import { useForm, usePage } from '@inertiajs/react';
import WorkspaceLayout from '@/layouts/workspace-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

export default function WorkspaceContent({ invitation }: { invitation: any }) {
    const { flash } = usePage<any>().props;

    // Default structure for data_json if null
    const defaultData = {
        basic: { title: '', main_date: '' },
        couple: [
            { role: 'groom', full_name: '', nickname: '' },
            { role: 'bride', full_name: '', nickname: '' }
        ]
    };

    const initialData = invitation.data_json || defaultData;

    const { data, setData, put, processing, errors } = useForm({
        data_json: initialData
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/workspace/${invitation.id}/content`);
    };

    return (
        <WorkspaceLayout invitation={invitation} title="Konten Undangan">
            {flash?.success && (
                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2 border border-emerald-200">
                    <Check className="w-5 h-5" />
                    <p className="font-medium text-sm">{flash.success}</p>
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-neutral-100">
                        <h2 className="text-lg font-semibold text-neutral-900">Informasi Acara Utama</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="basic_title">Teks Judul (Hero)</Label>
                            <Input 
                                id="basic_title" 
                                value={data.data_json.basic?.title || ''} 
                                onChange={e => setData('data_json', {
                                    ...data.data_json,
                                    basic: { ...data.data_json.basic, title: e.target.value }
                                })} 
                                placeholder="Contoh: The Wedding of Radit & Nabila" 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="basic_date">Tanggal Utama Acara</Label>
                            <Input 
                                id="basic_date" 
                                type="date"
                                value={data.data_json.basic?.main_date || ''} 
                                onChange={e => setData('data_json', {
                                    ...data.data_json,
                                    basic: { ...data.data_json.basic, main_date: e.target.value }
                                })} 
                            />
                        </div>
                    </div>
                </div>

                {/* Couple Info */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-neutral-100">
                        <h2 className="text-lg font-semibold text-neutral-900">Data Mempelai</h2>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Groom */}
                        <div className="space-y-4 border-r border-neutral-100 pr-4">
                            <h3 className="font-medium text-neutral-800">Mempelai Pria</h3>
                            <div className="space-y-2">
                                <Label>Nama Lengkap</Label>
                                <Input 
                                    value={data.data_json.couple?.[0]?.full_name || ''} 
                                    onChange={e => {
                                        const newCouple = [...(data.data_json.couple || defaultData.couple)];
                                        newCouple[0].full_name = e.target.value;
                                        setData('data_json', { ...data.data_json, couple: newCouple });
                                    }} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nama Panggilan</Label>
                                <Input 
                                    value={data.data_json.couple?.[0]?.nickname || ''} 
                                    onChange={e => {
                                        const newCouple = [...(data.data_json.couple || defaultData.couple)];
                                        newCouple[0].nickname = e.target.value;
                                        setData('data_json', { ...data.data_json, couple: newCouple });
                                    }} 
                                />
                            </div>
                        </div>

                        {/* Bride */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-neutral-800">Mempelai Wanita</h3>
                            <div className="space-y-2">
                                <Label>Nama Lengkap</Label>
                                <Input 
                                    value={data.data_json.couple?.[1]?.full_name || ''} 
                                    onChange={e => {
                                        const newCouple = [...(data.data_json.couple || defaultData.couple)];
                                        newCouple[1].full_name = e.target.value;
                                        setData('data_json', { ...data.data_json, couple: newCouple });
                                    }} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nama Panggilan</Label>
                                <Input 
                                    value={data.data_json.couple?.[1]?.nickname || ''} 
                                    onChange={e => {
                                        const newCouple = [...(data.data_json.couple || defaultData.couple)];
                                        newCouple[1].nickname = e.target.value;
                                        setData('data_json', { ...data.data_json, couple: newCouple });
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2 pb-10">
                    <Button type="submit" size="lg" disabled={processing}>
                        Simpan Semua Konten
                    </Button>
                </div>
            </form>
        </WorkspaceLayout>
    );
}
