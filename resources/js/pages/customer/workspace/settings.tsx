import { useForm, usePage } from '@inertiajs/react';
import WorkspaceLayout from '@/layouts/workspace-layout';
import { Check, Globe, Link2, Save } from 'lucide-react';
import type { FormEvent } from 'react';

export default function WorkspaceSettings({ invitation }: { invitation: any }) {
    const { flash } = usePage<any>().props;

    const { data, setData, put, post, processing, errors } = useForm({
        title: invitation.title || '',
        slug: invitation.slug || '',
    });

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        put(`/workspace/${invitation.id}/settings`);
    };

    const handlePublish = () => {
        if (
            confirm(
                'Apakah Anda yakin ingin mempublikasikan undangan ini? Tautan akan bisa diakses oleh publik.',
            )
        ) {
            post(`/workspace/${invitation.id}/publish`);
        }
    };

    return (
        <WorkspaceLayout invitation={invitation} title="Pengaturan Umum">
            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 border border-[#8B9B3F]/25 bg-[#E2E6D9] p-4 text-[#1E1E1E]">
                    <Check className="size-5 text-[#8B9B3F]" />
                    <p className="text-sm font-medium">{flash.success}</p>
                </div>
            )}

            <div className="mb-8 border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                <div className="border-b border-[#1E1E1E]/10 p-6">
                    <p className="mb-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                        Identitas undangan
                    </p>
                    <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                        Informasi Undangan
                    </h2>
                    <p className="mt-2 text-sm text-[#4A4A4A]">
                        Ubah judul dan tautan URL kustom undangan Anda.
                    </p>
                </div>

                <form onSubmit={handleUpdate} className="space-y-6 p-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-[#1E1E1E]"
                        >
                            Judul Undangan
                        </label>
                        <input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Contoh: The Wedding of Radit & Nabila"
                            className="h-11 w-full border border-[#1E1E1E]/15 bg-white px-3 text-sm transition-colors outline-none placeholder:text-[#4A4A4A]/50 focus:border-[#8B9B3F]"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="slug"
                            className="block text-sm font-medium text-[#1E1E1E]"
                        >
                            Tautan Kustom (URL)
                        </label>
                        <div className="flex shadow-sm">
                            <span className="inline-flex items-center border border-r-0 border-[#1E1E1E]/15 bg-[#E2E6D9] px-3 text-sm text-[#4A4A4A]">
                                <Link2 className="mr-2 size-4 text-[#8B9B3F]" />
                                invitin.test/u/
                            </span>
                            <input
                                id="slug"
                                value={data.slug}
                                onChange={(e) =>
                                    setData(
                                        'slug',
                                        e.target.value
                                            .toLowerCase()
                                            .replace(/[^a-z0-9-]/g, '-'),
                                    )
                                }
                                className="h-11 min-w-0 flex-1 border border-l-0 border-[#1E1E1E]/15 bg-white px-3 text-sm transition-colors outline-none placeholder:text-[#4A4A4A]/50 focus:border-[#8B9B3F]"
                                placeholder="radit-nabila"
                            />
                        </div>
                        {errors.slug && (
                            <p className="text-sm text-red-500">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save className="size-4" />
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>

            <div className="border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                <div className="flex flex-col gap-4 border-b border-[#1E1E1E]/10 p-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                            Publish
                        </p>
                        <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Status Publikasi
                        </h2>
                        <p className="mt-2 text-sm text-[#4A4A4A]">
                            Kendalikan apakah undangan Anda dapat diakses publik
                            atau tidak.
                        </p>
                    </div>
                    {invitation.status === 'published' ? (
                        <div className="flex items-center gap-2 border border-[#8B9B3F]/25 bg-[#E2E6D9] px-4 py-2 text-sm font-medium text-[#1E1E1E]">
                            <Globe className="size-4 text-[#8B9B3F]" />
                            Sedang Aktif
                        </div>
                    ) : (
                        <div className="border border-[#1E1E1E]/10 bg-[#F6F4EF] px-4 py-2 text-sm font-medium text-[#4A4A4A]">
                            Draft Tertutup
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-5 bg-[#F6F4EF] p-6 md:flex-row md:items-center md:justify-between">
                    <p className="max-w-xl text-sm leading-relaxed text-[#4A4A4A]">
                        Saat ini undangan Anda dalam status{' '}
                        <strong>
                            {invitation.status === 'published'
                                ? 'Dipublikasikan'
                                : 'Draft'}
                        </strong>
                        .
                        {invitation.status !== 'published' &&
                            ' Klik tombol publish agar tamu Anda dapat mengakses tautan undangan.'}
                    </p>

                    {invitation.status !== 'published' && (
                        <button
                            type="button"
                            onClick={handlePublish}
                            className="inline-flex items-center justify-center gap-2 bg-[#8B9B3F] px-5 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#748431]"
                        >
                            <Globe className="size-4" />
                            Publikasikan Sekarang
                        </button>
                    )}
                </div>
            </div>
        </WorkspaceLayout>
    );
}
