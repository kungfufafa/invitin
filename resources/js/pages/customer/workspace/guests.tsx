import WorkspaceLayout from '@/layouts/workspace-layout';
import { Link2, Plus, Users } from 'lucide-react';

export default function WorkspaceGuests({
    invitation,
    guests,
}: {
    invitation: any;
    guests: any[];
}) {
    return (
        <WorkspaceLayout invitation={invitation} title="Daftar Tamu">
            <div className="border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                <div className="flex flex-col gap-4 border-b border-[#1E1E1E]/10 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                            <Users className="size-4" />
                            Guest list
                        </p>
                        <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Buku Tamu
                        </h2>
                        <p className="mt-2 text-sm text-[#4A4A4A]">
                            Kelola daftar tamu dan siapkan link personal untuk
                            dibagikan.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black"
                    >
                        <Plus className="size-4" />
                        Tambah Tamu
                    </button>
                </div>

                {guests.length === 0 ? (
                    <div className="px-6 py-14 text-center">
                        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#E2E6D9] text-[#8B9B3F]">
                            <Link2 className="size-8" />
                        </div>
                        <h3 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Belum ada tamu
                        </h3>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4A4A4A]">
                            Setelah daftar tamu tersedia, setiap tamu dapat
                            menerima link undangan personal sesuai PRD guest
                            list.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#1E1E1E]/10">
                        {guests.map((guest) => (
                            <div
                                key={guest.id}
                                className="flex items-center justify-between gap-4 p-5"
                            >
                                <div>
                                    <p className="font-medium text-[#1E1E1E]">
                                        {guest.name}
                                    </p>
                                    <p className="text-sm text-[#4A4A4A]">
                                        {guest.group_name || 'Tanpa grup'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center border border-[#1C1C1C]/20 bg-transparent px-4 py-2 text-sm font-medium text-[#1C1C1C] transition-colors hover:bg-white"
                                >
                                    Salin Link
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </WorkspaceLayout>
    );
}
