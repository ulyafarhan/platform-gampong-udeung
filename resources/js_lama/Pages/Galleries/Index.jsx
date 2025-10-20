import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ galleries }) {
    return (
        <PublicLayout>
            <Head title="Galeri Kegiatan" />
            <h1 className="font-serif text-4xl font-bold mb-8">Galeri Dokumentasi</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {galleries.map((gallery) => (
                    <Link
                        key={gallery.id}
                        href={`/galeri/${gallery.id}`}
                        className="group block bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                        <div className="relative">
                            <img src={`/storage/${gallery.cover_image}`} alt={gallery.title} className="w-full h-56 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <h3 className="text-white text-2xl font-bold font-serif">{gallery.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </PublicLayout>
    );
}