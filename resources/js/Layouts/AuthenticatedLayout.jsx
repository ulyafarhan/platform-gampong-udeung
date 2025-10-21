import { useState } from 'react';
import { Link } from '@inertiajs/react';

// Shadcn UI Components
import { Button } from '@/Components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/Components/ui/sheet';

// Icons
import { PanelLeft } from 'lucide-react'; // Menggunakan ikon dari lucide-react

// Navigasi Link Komponen
import { SidebarContent } from '@/Components/admin/sidebar-content';
import { UserDropdown } from '@/Components/admin/user-dropdown';

export default function Authenticated({ user, header, children }) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            {/* Sidebar for Desktop */}
            <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-[60px] items-center border-b px-6">
                        <Link className="flex items-center gap-2 font-semibold" href={route('admin.dashboard')}>
                            <span className="text-yellow-500">Gampong Udeung</span>
                        </Link>
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <SidebarContent />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
                    {/* Mobile Sidebar Trigger */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                           <div className="flex h-[60px] items-center border-b px-6">
                                <Link className="flex items-center gap-2 font-semibold" href="#">
                                    <span className="text-yellow-500">Gampong Udeung</span>
                                </Link>
                            </div>
                            <div className="mt-4">
                                <SidebarContent />
                            </div>
                        </SheetContent>
                    </Sheet>

                    {/* Header Title */}
                    <div className="w-full flex-1">
                        <h1 className="text-lg font-semibold">{header}</h1>
                    </div>

                    {/* User Dropdown */}
                    <UserDropdown user={user} />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-50 dark:bg-gray-900">
                    {children}
                </main>
            </div>
        </div>
    );
}