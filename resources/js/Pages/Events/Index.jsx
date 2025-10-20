import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Index({ events }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <PublicLayout>
            <Head title="Jadwal Kegiatan" />
            <h1 className="font-serif text-4xl font-bold mb-8">Jadwal Acara & Kegiatan</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="space-y-6">
                    {events.length > 0 ? events.map((event) => (
                        <div key={event.id} className="border-b pb-4 last:border-b-0">
                            <p className="font-bold text-green-700">{formatDate(event.starts_at)}</p>
                            <h3 className="font-serif text-2xl font-bold my-1">{event.name}</h3>
                            <p className="text-gray-600">Lokasi: {event.location}</p>
                        </div>
                    )) : (
                        <p className="text-center text-gray-500 py-8">Belum ada kegiatan yang akan datang.</p>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}