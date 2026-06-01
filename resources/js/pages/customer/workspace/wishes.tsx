import WorkspaceLayout from '@/layouts/workspace-layout';
import { HeartHandshake, MessageSquareHeart } from 'lucide-react';

export default function WorkspaceWishes({
    invitation,
    wishes,
}: {
    invitation: any;
    wishes: any[];
}) {
    return (
        <WorkspaceLayout invitation={invitation} title="Ucapan & RSVP">
            <div className="border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                <div className="border-b border-[#1E1E1E]/10 p-6">
                    <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                        <MessageSquareHeart className="size-4" />
                        RSVP & wishes
                    </p>
                    <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                        Daftar Kehadiran & Ucapan
                    </h2>
                    <p className="mt-2 text-sm text-[#4A4A4A]">
                        Pantau respon kehadiran dan doa dari tamu undangan.
                    </p>
                </div>

                {wishes.length === 0 ? (
                    <div className="px-6 py-14 text-center">
                        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-[#E2E6D9] text-[#8B9B3F]">
                            <HeartHandshake className="size-8" />
                        </div>
                        <h3 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Belum ada ucapan
                        </h3>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#4A4A4A]">
                            Segera publikasikan dan bagikan undangan Anda.
                            Respon RSVP dan ucapan akan tampil di sini.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-[#1E1E1E]/10">
                        {wishes.map((wish) => (
                            <div key={wish.id} className="p-5">
                                <p className="font-medium text-[#1E1E1E]">
                                    {wish.name}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-[#4A4A4A]">
                                    {wish.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </WorkspaceLayout>
    );
}
