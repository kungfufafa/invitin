import WorkspaceLayout from '@/layouts/workspace-layout';

export default function WorkspaceWishes({ invitation, wishes }: { invitation: any, wishes: any[] }) {
    return (
        <WorkspaceLayout invitation={invitation} title="Ucapan & RSVP">
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-semibold text-neutral-900">Daftar Kehadiran & Ucapan</h2>
                </div>
                <div className="p-12 text-center text-neutral-500">
                    <p>Belum ada ucapan yang diterima.</p>
                    <p className="text-sm mt-2">Segera publikasikan dan bagikan undangan Anda.</p>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
