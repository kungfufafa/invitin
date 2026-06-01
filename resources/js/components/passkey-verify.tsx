import type { UrlMethodPair } from '@inertiajs/core';
import { router } from '@inertiajs/react';
import { usePasskeyVerify } from '@laravel/passkeys/react';
import { KeyRound, LoaderCircle } from 'lucide-react';
import InputError from '@/components/input-error';

type Props = {
    routes?: {
        options: UrlMethodPair;
        submit: UrlMethodPair;
    };
    label?: string;
    loadingLabel?: string;
    separator?: string;
};

export default function PasskeyVerify({
    routes,
    label,
    loadingLabel,
    separator,
}: Props = {}) {
    const { verify, isLoading, error, isSupported } = usePasskeyVerify({
        ...(routes && {
            routes: {
                options: routes.options.url,
                submit: routes.submit.url,
            },
        }),
        onSuccess: (response) => {
            router.visit(response.redirect ?? '/dashboard');
        },
    });

    if (!isSupported) {
        return null;
    }

    return (
        <>
            <div className="grid gap-2">
                <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 border border-[#1E1E1E]/15 bg-transparent px-4 py-3 text-sm font-medium text-[#1E1E1E] transition-colors hover:bg-[#F6F4EF] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={verify}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                        <KeyRound className="size-4" />
                    )}
                    {isLoading
                        ? (loadingLabel ?? 'Authenticating...')
                        : (label ?? 'Sign in with a passkey')}
                </button>
                {error && (
                    <InputError message={error} className="text-center" />
                )}
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="h-px w-full bg-[#1E1E1E]/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#FDFBF7] px-2 text-[#4A4A4A]">
                        {separator ?? 'Or continue with email'}
                    </span>
                </div>
            </div>
        </>
    );
}
