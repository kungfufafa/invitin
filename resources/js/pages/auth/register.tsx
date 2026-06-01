import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import WelcomePasswordInput from '@/components/welcome-password-input';
import { CreditCard, LoaderCircle } from 'lucide-react';
import { login } from '@/routes';
import { store } from '@/routes/register';

type OrderIntent = {
    name: string;
    price: number;
    checkout_url: string;
};

type Props = {
    orderIntent?: OrderIntent | null;
    passwordRules: string;
};

const inputClassName =
    'h-11 w-full border border-[#1E1E1E]/15 bg-white px-3 text-sm text-[#1E1E1E] transition-colors outline-none placeholder:text-[#4A4A4A]/50 focus:border-[#8B9B3F]';

const labelClassName = 'block text-sm font-medium text-[#1E1E1E]';

export default function Register({ orderIntent, passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            {orderIntent && (
                <div className="border border-[#8B9B3F]/25 bg-[#E2E6D9] p-4 text-sm text-[#1E1E1E]">
                    <p className="mb-2 flex items-center gap-2 font-medium">
                        <CreditCard className="size-4 text-[#8B9B3F]" />
                        Buat akun untuk order {orderIntent.name}
                    </p>
                    <p className="text-[#4A4A4A]">
                        Setelah akun dibuat, kamu langsung kembali ke checkout.
                        Total tema: Rp{' '}
                        {orderIntent.price.toLocaleString('id-ID')}.
                    </p>
                </div>
            )}
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <label
                                    htmlFor="name"
                                    className={labelClassName}
                                >
                                    Nama
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Nama lengkap"
                                    className={inputClassName}
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

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
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className={inputClassName}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <label
                                    htmlFor="password"
                                    className={labelClassName}
                                >
                                    Password
                                </label>
                                <WelcomePasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <label
                                    htmlFor="password_confirmation"
                                    className={labelClassName}
                                >
                                    Konfirmasi password
                                </label>
                                <WelcomePasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-2 inline-flex w-full items-center justify-center gap-2 bg-[#1C1C1C] px-6 py-4 text-sm font-medium tracking-wide text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                                tabIndex={5}
                                disabled={processing}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="size-4 animate-spin" />
                                )}
                                {orderIntent
                                    ? 'Buat Akun & Lanjut Checkout'
                                    : 'Buat Akun'}
                            </button>
                        </div>

                        <div className="text-center text-sm text-[#4A4A4A]">
                            Sudah punya akun?{' '}
                            <TextLink href={login()} tabIndex={6}>
                                Masuk dan lanjut order
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Buat akun Invitin',
    description: 'Simpan order dan akses workspace undangan dari satu tempat.',
};
