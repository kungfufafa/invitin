import WorkspaceLayout from '@/layouts/workspace-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WorkspaceGuests({ invitation, guests }: { invitation: any, guests: any[] }) {
    return (
        <WorkspaceLayout invitation={invitation} title="Daftar Tamu">
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-neutral-900">Buku Tamu</h2>
                    <Button className="gap-2" size="sm">
                        <Plus className="w-4 h-4" /> Tambah Tamu
                    </Button>
                </div>
                <div className="p-12 text-center text-neutral-500">
                    <p>Belum ada tamu yang ditambahkan.</p>
                    <p className="text-sm mt-2">Fitur manajemen tamu akan hadir di fase selanjutnya.</p>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
