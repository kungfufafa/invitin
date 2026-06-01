import { type PropsWithChildren } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    CheckCircle2,
    Globe,
    LayoutDashboard,
    MessageSquareHeart,
    Settings,
    Type,
    Users,
} from 'lucide-react';

export default function WorkspaceLayout({
    children,
    invitation,
    title,
}: PropsWithChildren<{ invitation: any; title?: string }>) {
    const { url } = usePage();
    const basePath = `/workspace/${invitation.id}`;
    const invitationTitle = invitation.title || 'Workspace Undangan';
    const publicUrl = invitation.slug ? `/u/${invitation.slug}` : '#';

    const navigation = [
        { name: 'Pengaturan', href: `${basePath}/settings`, icon: Settings },
        { name: 'Konten', href: `${basePath}/content`, icon: Type },
        { name: 'Tamu', href: `${basePath}/guests`, icon: Users },
        {
            name: 'Ucapan & RSVP',
            href: `${basePath}/wishes`,
            icon: MessageSquareHeart,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F6F4EF] font-sans text-[#1E1E1E]">
            {title && <Head title={`${title} - Workspace`} />}

            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 flex-col border-r border-[#1E1E1E]/10 bg-[#FDFBF7] lg:flex">
                <div className="border-b border-[#1E1E1E]/10 p-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#4A4A4A] transition-colors hover:text-[#1E1E1E]"
                    >
                        <LayoutDashboard className="size-4" />
                        Kembali ke Dashboard
                    </Link>
                </div>

                <div className="border-b border-[#1E1E1E]/10 p-6">
                    <p className="mb-3 text-xs font-medium tracking-wide text-[#8B9B3F] uppercase">
                        Workspace Invitin
                    </p>
                    <h2
                        className="truncate font-serif text-3xl italic"
                        title={invitationTitle}
                    >
                        {invitationTitle}
                    </h2>
                    <div className="mt-4 flex items-center gap-1.5 text-xs">
                        {invitation.status === 'published' ? (
                            <span className="flex items-center gap-1.5 border border-[#8B9B3F]/25 bg-[#E2E6D9] px-3 py-1 font-medium text-[#1E1E1E]">
                                <Globe className="size-3.5 text-[#8B9B3F]" />
                                Dipublikasikan
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 border border-[#1E1E1E]/10 bg-[#F6F4EF] px-3 py-1 font-medium text-[#4A4A4A]">
                                <CheckCircle2 className="size-3.5 text-[#8B9B3F]" />
                                Draft
                            </span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                    {navigation.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-[#1C1C1C] text-white'
                                        : 'text-[#4A4A4A] hover:bg-[#E2E6D9] hover:text-[#1E1E1E]'
                                }`}
                            >
                                <item.icon className="size-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex min-h-screen flex-col lg:pl-72">
                {/* Topbar */}
                <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-[#1E1E1E]/10 bg-[#FDFBF7]/95 px-4 py-3 backdrop-blur md:px-8">
                    <div>
                        <Link
                            href="/dashboard"
                            className="mb-1 inline-flex items-center gap-2 text-xs font-medium text-[#4A4A4A] lg:hidden"
                        >
                            <LayoutDashboard className="size-3.5" />
                            Dashboard
                        </Link>
                        <h1 className="text-base font-semibold text-[#1E1E1E] md:text-lg">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {invitation.status === 'published' ? (
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 border border-[#1C1C1C]/20 bg-transparent px-4 py-2 text-sm font-medium text-[#1C1C1C] transition-colors hover:bg-white"
                            >
                                <Globe className="size-4" />
                                <span className="hidden sm:inline">
                                    Buka Undangan
                                </span>
                            </a>
                        ) : (
                            <a
                                href={publicUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1C1C1C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black"
                            >
                                <Globe className="size-4" />
                                <span className="hidden sm:inline">
                                    Preview Publik
                                </span>
                            </a>
                        )}
                    </div>
                </header>

                <nav className="flex gap-2 overflow-x-auto border-b border-[#1E1E1E]/10 bg-[#F6F4EF] px-4 py-3 lg:hidden">
                    {navigation.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`inline-flex shrink-0 items-center gap-2 border px-4 py-2 text-sm font-medium ${
                                    isActive
                                        ? 'border-[#1C1C1C] bg-[#1C1C1C] text-white'
                                        : 'border-[#1E1E1E]/10 bg-[#FDFBF7] text-[#4A4A4A]'
                                }`}
                            >
                                <item.icon className="size-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Page Content */}
                <main className="flex-1 px-4 py-6 md:px-8 md:py-10">
                    <div className="mx-auto max-w-5xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
