import { useForm, usePage } from '@inertiajs/react';
import WorkspaceLayout from '@/layouts/workspace-layout';
import { CalendarDays, Check, Save, UserRound } from 'lucide-react';
import type { FormEvent } from 'react';

const inputClassName =
    'h-11 w-full border border-[#1E1E1E]/15 bg-white px-3 text-sm outline-none transition-colors placeholder:text-[#4A4A4A]/50 focus:border-[#8B9B3F]';

const labelClassName = 'block text-sm font-medium text-[#1E1E1E]';

export default function WorkspaceContent({ invitation }: { invitation: any }) {
    const { flash } = usePage<any>().props;

    // Default structure for data_json if null
    const defaultData = {
        basic: { title: '', main_date: '' },
        couple: [
            { role: 'groom', full_name: '', nickname: '' },
            { role: 'bride', full_name: '', nickname: '' },
        ],
    };

    const initialData = invitation.data_json || defaultData;

    const { data, setData, put, processing, errors } = useForm({
        data_json: initialData,
    });

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        put(`/workspace/${invitation.id}/content`);
    };

    return (
        <WorkspaceLayout invitation={invitation} title="Konten Undangan">
            {flash?.success && (
                <div className="mb-6 flex items-center gap-2 border border-[#8B9B3F]/25 bg-[#E2E6D9] p-4 text-[#1E1E1E]">
                    <Check className="size-5 text-[#8B9B3F]" />
                    <p className="text-sm font-medium">{flash.success}</p>
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-8">
                {/* Basic Info */}
                <div className="border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                    <div className="border-b border-[#1E1E1E]/10 p-6">
                        <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                            <CalendarDays className="size-4" />
                            Step 01
                        </p>
                        <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Informasi Acara Utama
                        </h2>
                        <p className="mt-2 text-sm text-[#4A4A4A]">
                            Data utama ini menjadi headline dan tanggal inti
                            undangan.
                        </p>
                    </div>
                    <div className="grid gap-6 p-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label
                                htmlFor="basic_title"
                                className={labelClassName}
                            >
                                Teks Judul (Hero)
                            </label>
                            <input
                                id="basic_title"
                                value={data.data_json.basic?.title || ''}
                                onChange={(e) =>
                                    setData('data_json', {
                                        ...data.data_json,
                                        basic: {
                                            ...data.data_json.basic,
                                            title: e.target.value,
                                        },
                                    })
                                }
                                placeholder="Contoh: The Wedding of Radit & Nabila"
                                className={inputClassName}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="basic_date"
                                className={labelClassName}
                            >
                                Tanggal Utama Acara
                            </label>
                            <input
                                id="basic_date"
                                type="date"
                                value={data.data_json.basic?.main_date || ''}
                                onChange={(e) =>
                                    setData('data_json', {
                                        ...data.data_json,
                                        basic: {
                                            ...data.data_json.basic,
                                            main_date: e.target.value,
                                        },
                                    })
                                }
                                className={inputClassName}
                            />
                        </div>
                    </div>
                </div>

                {/* Couple Info */}
                <div className="border border-[#1E1E1E]/10 bg-[#FDFBF7]">
                    <div className="border-b border-[#1E1E1E]/10 p-6">
                        <p className="mb-2 flex items-center gap-2 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                            <UserRound className="size-4" />
                            Step 02
                        </p>
                        <h2 className="font-serif text-3xl text-[#1E1E1E] italic">
                            Data Mempelai
                        </h2>
                        <p className="mt-2 text-sm text-[#4A4A4A]">
                            Nama lengkap dan nama panggilan akan dipakai di
                            cover undangan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
                        {/* Groom */}
                        <div className="space-y-4 md:border-r md:border-[#1E1E1E]/10 md:pr-8">
                            <h3 className="font-serif text-2xl text-[#1E1E1E] italic">
                                Mempelai Pria
                            </h3>
                            <div className="space-y-2">
                                <label className={labelClassName}>
                                    Nama Lengkap
                                </label>
                                <input
                                    value={
                                        data.data_json.couple?.[0]?.full_name ||
                                        ''
                                    }
                                    onChange={(e) => {
                                        const newCouple = [
                                            ...(data.data_json.couple ||
                                                defaultData.couple),
                                        ];
                                        newCouple[0].full_name = e.target.value;
                                        setData('data_json', {
                                            ...data.data_json,
                                            couple: newCouple,
                                        });
                                    }}
                                    className={inputClassName}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClassName}>
                                    Nama Panggilan
                                </label>
                                <input
                                    value={
                                        data.data_json.couple?.[0]?.nickname ||
                                        ''
                                    }
                                    onChange={(e) => {
                                        const newCouple = [
                                            ...(data.data_json.couple ||
                                                defaultData.couple),
                                        ];
                                        newCouple[0].nickname = e.target.value;
                                        setData('data_json', {
                                            ...data.data_json,
                                            couple: newCouple,
                                        });
                                    }}
                                    className={inputClassName}
                                />
                            </div>
                        </div>

                        {/* Bride */}
                        <div className="space-y-4">
                            <h3 className="font-serif text-2xl text-[#1E1E1E] italic">
                                Mempelai Wanita
                            </h3>
                            <div className="space-y-2">
                                <label className={labelClassName}>
                                    Nama Lengkap
                                </label>
                                <input
                                    value={
                                        data.data_json.couple?.[1]?.full_name ||
                                        ''
                                    }
                                    onChange={(e) => {
                                        const newCouple = [
                                            ...(data.data_json.couple ||
                                                defaultData.couple),
                                        ];
                                        newCouple[1].full_name = e.target.value;
                                        setData('data_json', {
                                            ...data.data_json,
                                            couple: newCouple,
                                        });
                                    }}
                                    className={inputClassName}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={labelClassName}>
                                    Nama Panggilan
                                </label>
                                <input
                                    value={
                                        data.data_json.couple?.[1]?.nickname ||
                                        ''
                                    }
                                    onChange={(e) => {
                                        const newCouple = [
                                            ...(data.data_json.couple ||
                                                defaultData.couple),
                                        ];
                                        newCouple[1].nickname = e.target.value;
                                        setData('data_json', {
                                            ...data.data_json,
                                            couple: newCouple,
                                        });
                                    }}
                                    className={inputClassName}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2 pb-10">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Save className="size-4" />
                        Simpan Semua Konten
                    </button>
                </div>
            </form>
        </WorkspaceLayout>
    );
}
