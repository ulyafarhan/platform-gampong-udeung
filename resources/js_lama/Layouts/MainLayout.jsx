import { Link } from '@inertiajs/react';

export default function MainLayout({ children }) {
    return (
        <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
            {/* Header / Navigation */}
            <header className="bg-white shadow-md">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-green-800">
                        Gampong Udeung
                    </Link>
                    <div className="space-x-6 text-gray-700 font-medium hidden md:flex">
                        <Link href="/" className="hover:text-yellow-600">Beranda</Link>
                        <Link href="/berita" className="hover:text-yellow-600">Berita</Link>
                        <Link href="/panduan" className="hover:text-yellow-600">Urus Surat</Link>
                        <Link href="/kegiatan" className="hover:text-yellow-600">Jadwal Acara</Link>
                        <Link href="/galeri" className="hover:text-yellow-600">Galeri</Link>
                        <Link href="/tentang-kami" className="hover:text-yellow-600">Tentang Kami</Link>
                    </div>
                </nav>
            </header>

            {/* Konten Halaman Utama */}
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-green-900 text-white mt-12">
                <div className="container mx-auto px-6 py-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Gampong Udeung. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}