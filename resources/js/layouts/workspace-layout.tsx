import { type PropsWithChildren } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Settings, Type, Users, MessageSquareHeart, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WorkspaceLayout({ children, invitation, title }: PropsWithChildren<{ invitation: any, title?: string }>) {
    const { url } = usePage();
    const basePath = `/workspace/${invitation.id}`;

    const navigation = [
        { name: 'Pengaturan', href: `${basePath}/settings`, icon: Settings },
        { name: 'Konten', href: `${basePath}/content`, icon: Type },
        { name: 'Tamu', href: `${basePath}/guests`, icon: Users },
        { name: 'Ucapan & RSVP', href: `${basePath}/wishes`, icon: MessageSquareHeart },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {title && <Head title={`${title} - Workspace`} />}
            
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed inset-y-0 z-10">
                <div className="h-16 flex items-center px-6 border-b border-neutral-200">
                    <Link href="/dashboard" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors font-medium">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Kembali ke Dashboard</span>
                    </Link>
                </div>
                
                <div className="p-6 border-b border-neutral-100">
                    <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Workspace</h2>
                    <p className="font-medium text-neutral-900 truncate" title={invitation.title}>{invitation.title}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                        {invitation.status === 'published' ? (
                            <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <Globe className="w-3 h-3" /> Dipublikasikan
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                                Draft
                            </span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive 
                                        ? 'bg-neutral-900 text-white' 
                                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
                    
                    <div className="flex items-center gap-4">
                        {invitation.status === 'published' ? (
                            <a href={`/u/${invitation.slug}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="gap-2">
                                    <Globe className="w-4 h-4" /> Buka Undangan
                                </Button>
                            </a>
                        ) : (
                            <a href={`/u/${invitation.slug}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="secondary" className="gap-2 text-neutral-600">
                                    <Globe className="w-4 h-4" /> Preview Publik
                                </Button>
                            </a>
                        )}
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
