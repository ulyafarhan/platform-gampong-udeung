import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Show({ gallery }) {
    const activityDate = new Date(gallery.activity_date).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <PublicLayout>
            <Head title={gallery.title} />

            <div className="text-center mb-8">
                <h1 className="font-serif text-4xl font-bold">{gallery.title}</h1>
                <p className="text-gray-600 mt-2">{activityDate}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.images.map((image, index) => (
                    <div key={index}>
                        <img
                            src={`/storage/${image}`}
                            alt={`${gallery.title} - ${index + 1}`}
                            className="w-full h-auto object-cover rounded-lg shadow"
                        />
                    </div>
                ))}
            </div>
        </PublicLayout>
    );
}