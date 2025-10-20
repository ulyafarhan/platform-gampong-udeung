import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';


export default function PublicLayout({ children, title }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navLinks = [
        { href: route('home'), label: 'Beranda' },
        { href: route('posts.index'), label: 'Berita' },
        { href: route('guides.index'), label: 'Urus Surat' },
        { href: route('events.index'), label: 'Jadwal Acara' },
        { href: route('galleries.index'), label: 'Galeri' },
        { href: route('about'), label: 'Tentang Kami' },
    ];

    return (
        <div className="bg-white dark:bg-gray-950 min-h-screen font-['Inter'] text-gray-800 dark:text-gray-200">
            <Head title={title} />
            
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <Link href="/" className="text-2xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                        Gampong Udeung
                    </Link>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="font-semibold text-gray-600 dark:text-gray-300 hover:text-green-700 dark:hover:text-yellow-400 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>
            
            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
                    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-950 p-6" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center">
                             <h2 className="font-bold">Menu</h2>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-8 flex flex-col space-y-4">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="font-semibold text-lg py-2">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}


            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-green-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <p>&copy; {new Date().getFullYear()} Pemerintah Gampong Udeung. Hak Cipta Dilindungi.</p>
                </div>
            </footer>
        </div>
    );
}