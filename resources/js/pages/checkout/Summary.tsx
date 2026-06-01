import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CreditCard,
    ReceiptText,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { store as checkoutStore } from '@/routes/checkout';
import { show as themeShow } from '@/routes/themes';

export default function Summary({
    theme,
    invitationCount = 0,
}: {
    theme: any;
    invitationCount?: number;
}) {
    const { post, processing } = useForm();
    const hasPreviousOrders = invitationCount > 0;

    const handlePayment = (e: FormEvent) => {
        e.preventDefault();
        post(checkoutStore.url(theme.slug));
    };

    return (
        <div className="min-h-screen bg-[#F6F4EF] font-sans text-[#1E1E1E] selection:bg-[#1E1E1E] selection:text-white">
            <Head title={`Checkout ${theme.name} | Invitin by Mekaya`} />

            <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-4 py-10 md:px-10">
                <Link
                    href={themeShow.url(theme.slug)}
                    className="mb-8 inline-flex w-fit items-center gap-2 text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#1E1E1E]"
                >
                    <ArrowLeft className="size-4" />
                    Kembali ke detail tema
                </Link>

                <section className="grid border border-[#1E1E1E]/10 bg-[#FDFBF7] lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="border-b border-[#1E1E1E]/10 p-6 md:p-10 lg:border-r lg:border-b-0">
                        <p className="mb-5 flex items-center gap-2 text-sm font-medium text-[#8B9B3F]">
                            <Sparkles className="size-4" />
                            Checkout tema pilihan
                        </p>
                        <h1 className="font-serif text-5xl leading-tight md:text-6xl">
                            Satu langkah lagi menuju undanganmu
                        </h1>
                        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#4A4A4A]">
                            Setelah pembayaran, workspace baru langsung dibuat
                            untuk mengisi data undangan, preview, dan publish.
                        </p>

                        {hasPreviousOrders && (
                            <div className="mt-8 border border-[#8B9B3F]/25 bg-[#E2E6D9] p-4 text-sm leading-relaxed text-[#1E1E1E]">
                                Kamu sudah punya {invitationCount} workspace.
                                Checkout ini akan membuat workspace baru tanpa
                                mengubah pesanan sebelumnya.
                            </div>
                        )}

                        <div className="mt-10 grid gap-3 text-sm text-[#4A4A4A]">
                            <div className="flex items-center gap-3 border-t border-[#1E1E1E]/10 pt-4">
                                <ShieldCheck className="size-5 text-[#8B9B3F]" />
                                Pembelian membuka akses workspace
                            </div>
                            <div className="flex items-center gap-3 border-t border-[#1E1E1E]/10 pt-4">
                                <CreditCard className="size-5 text-[#8B9B3F]" />
                                Pilih bayar, konfirmasi, workspace langsung jadi
                            </div>
                            <div className="flex items-center gap-3 border-t border-[#1E1E1E]/10 pt-4">
                                <ReceiptText className="size-5 text-[#8B9B3F]" />
                                Pesanan lama tetap aman saat beli tema lagi
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10">
                        <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                            <div className="aspect-[4/3] overflow-hidden bg-[#E2E6D9] md:aspect-square">
                                <img
                                    src={
                                        theme.thumbnail ||
                                        '/images/preview-image_1.webp'
                                    }
                                    alt={theme.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="mb-3 flex flex-wrap gap-2">
                                    <span className="border border-[#1E1E1E]/15 bg-[#E2E6D9] px-3 py-1 text-xs font-medium uppercase">
                                        {theme.category}
                                    </span>
                                    <span className="border border-[#1E1E1E]/15 px-3 py-1 text-xs font-medium text-[#4A4A4A] uppercase">
                                        {theme.style}
                                    </span>
                                </div>
                                <h2 className="font-serif text-3xl italic">
                                    {theme.name}
                                </h2>
                                <p className="mt-2 text-sm text-[#4A4A4A]">
                                    Paket tema digital Invitin
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 border-y border-[#1E1E1E]/10 py-6">
                            <p className="mb-4 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                                Ringkasan pembayaran
                            </p>
                            <div className="flex items-center justify-between gap-6">
                                <span className="text-sm text-[#4A4A4A]">
                                    Subtotal
                                </span>
                                <span className="text-xl font-semibold">
                                    Rp {theme.price.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-6">
                                <span className="text-sm text-[#4A4A4A]">
                                    Total
                                </span>
                                <span className="text-3xl font-semibold">
                                    Rp {theme.price.toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-3">
                            <p className="text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                                Metode pembayaran
                            </p>
                            <label className="flex cursor-pointer items-center justify-between gap-4 border border-[#1E1E1E]/10 bg-[#E2E6D9] p-4">
                                <span className="flex items-center gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-full bg-[#1C1C1C] text-white">
                                        <CreditCard className="size-5" />
                                    </span>
                                    <span>
                                        <span className="block text-sm font-medium">
                                            Pembayaran instant
                                        </span>
                                        <span className="block text-xs text-[#4A4A4A]">
                                            Demo checkout: status langsung lunas
                                        </span>
                                    </span>
                                </span>
                                <input
                                    type="radio"
                                    checked
                                    readOnly
                                    className="size-4 accent-[#8B9B3F]"
                                />
                            </label>
                        </div>

                        <form onSubmit={handlePayment} className="mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:opacity-50"
                            >
                                {processing
                                    ? 'Memproses pembayaran...'
                                    : 'Bayar Sekarang & Buat Workspace'}
                                <ArrowRight className="size-4" />
                            </button>
                            <p className="mt-3 text-center text-xs leading-relaxed text-[#4A4A4A]">
                                Tidak perlu mengisi data undangan sekarang.
                                Setelah bayar, lanjut dari workspace kapan saja.
                            </p>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}
