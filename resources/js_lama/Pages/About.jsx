import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function About({ officials }) {
    return (
        <PublicLayout title="Tentang Kami">
            <div className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
                        <h1 className="font-['Merriweather'] text-4xl font-bold mb-4 text-center">Tentang Gampong Udeung</h1>
                        <div className="prose max-w-none text-center mx-auto mb-6">
                            <p>Di sini Anda bisa menuliskan sejarah singkat, visi, dan misi gampong. Konten ini bisa dibuat statis atau dinamis dari database di kemudian hari.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-['Merriweather'] text-3xl font-bold text-center mb-8">Struktur Pemerintahan Gampong</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {officials.map((official) => (
                                <div key={official.id} className="text-center">
                                    <img
                                        src={`/storage/${official.photo}`}
                                        alt={official.name}
                                        className="w-32 h-32 rounded-full object-cover mx-auto mb-4 shadow-md"
                                    />
                                    <h3 className="font-bold text-lg">{official.name}</h3>
                                    <p className="text-gray-600">{official.position}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}