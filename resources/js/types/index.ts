import type { Auth } from './auth';

export type SharedData = {
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
        toast?: {
            type: string;
            message: string;
        };
    };
    sidebarOpen?: boolean;
    [key: string]: unknown;
};

export type * from './auth';
export type * from './navigation';
export type * from './ui';
