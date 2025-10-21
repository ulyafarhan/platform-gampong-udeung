import { Link } from "@inertiajs/react";
import { navItems } from "@/lib/nav-items";

export function SiteFooter() {
    return (
        <footer className="bg-gray-800 text-white py-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Gampong Udeung</h3>
                        <p className="text-gray-400 text-sm">Kecamatan Bandar Baru, Kabupaten Pidie Jaya, Provinsi Aceh, 24186</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            {navItems.map(item => (
                                <li key={item.href}>
                                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Layanan</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Administrasi</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pengaduan</Link></li>
                            <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Informasi</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Ikuti Kami</h3>
                        {/* Social media links can be added here */}
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Gampong Udeung. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}