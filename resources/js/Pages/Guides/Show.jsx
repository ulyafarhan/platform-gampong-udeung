import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Show({ guide }) {
    return (
        <PublicLayout>
            <Head title={guide.title} />

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="font-serif text-4xl font-bold mb-2">{guide.title}</h1>
                <p className="text-gray-600 mb-8">{guide.description}</p>

                {/* Syarat-syarat */}
                <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4 border-b pb-2">Persyaratan</h2>
                    <ul className="list-disc list-inside space-y-2">
                        {Object.entries(guide.requirements).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> {value}</li>
                        ))}
                    </ul>
                </div>

                {/* Alur Proses */}
                <div className="mb-8">
                    <h2 className="font-serif text-2xl font-bold mb-4 border-b pb-2">Alur Proses</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: guide.step_by_step }} />
                </div>

                {/* Waktu & Biaya */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-1">Estimasi Waktu</h3>
                        <p>{guide.estimated_time}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-bold text-lg mb-1">Biaya Resmi</h3>
                        <p>{guide.cost}</p>
                    </div>
                </div>

                {/* Tips */}
                {guide.tips && (
                     <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <h2 className="font-serif text-2xl font-bold mb-2">Tips Praktis</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: guide.tips }} />
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}