import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import TextLink from '@/components/text-link';
import WelcomePasswordInput from '@/components/welcome-password-input';
import { CreditCard, LoaderCircle } from 'lucide-react';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type OrderIntent = {
    name: string;
    price: number;
    checkout_url: string;
};

type Props = {
    status?: string;
    canResetPassword: boolean;
    orderIntent?: OrderIntent | null;
};

const inputClassName =
    'h-11 w-full border border-[#1E1E1E]/15 bg-white px-3 text-sm text-[#1E1E1E] transition-colors outline-none placeholder:text-[#4A4A4A]/50 focus:border-[#8B9B3F]';

const labelClassName = 'block text-sm font-medium text-[#1E1E1E]';

export default function Login({
    status,
    canResetPassword,
    orderIntent,
}: Props) {
    return (
        <>
            <Head title="Log in" />

            {orderIntent && (
                <div className="border border-[#8B9B3F]/25 bg-[#E2E6D9] p-4 text-sm text-[#1E1E1E]">
                    <p className="mb-2 flex items-center gap-2 font-medium">
                        <CreditCard className="size-4 text-[#8B9B3F]" />
                        Lanjutkan order {orderIntent.name}
                    </p>
                    <p className="text-[#4A4A4A]">
                        Masuk dulu, lalu kamu langsung kembali ke checkout.
                        Total tema: Rp{' '}
                        {orderIntent.price.toLocaleString('id-ID')}.
                    </p>
                </div>
            )}

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="email"
                                    className={labelClassName}
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className={inputClassName}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <label
                                        htmlFor="password"
                                        className={labelClassName}
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm text-[#4A4A4A] hover:text-[#1E1E1E]"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <WelcomePasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    tabIndex={3}
                                    className="size-4 border-[#1E1E1E]/20 accent-[#8B9B3F]"
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-[#4A4A4A]"
                                >
                                    Ingat saya
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <LoaderCircle className="size-4 animate-spin" />
                                )}
                                {orderIntent
                                    ? 'Masuk & Lanjut Checkout'
                                    : 'Masuk'}
                            </button>
                        </div>

                        <div className="text-center text-sm text-[#4A4A4A]">
                            Belum punya akun?{' '}
                            <TextLink href={register()} tabIndex={5}>
                                Daftar dan lanjut order
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Masuk ke Invitin',
    description: 'Lanjut checkout tema atau kelola workspace undanganmu.',
};
