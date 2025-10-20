import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ guides }) {
    return (
        <PublicLayout>
            <Head title="Panduan Administrasi" />
            <h1 className="font-serif text-4xl font-bold mb-8">Panduan Urus Surat</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                    <Link
                        key={guide.id}
                        href={`/panduan/${guide.slug}`}
                        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 flex items-center space-x-4"
                    >
                        <div className='p-3 bg-green-100 rounded-full'>
                            {/* Icon Placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <h3 className="font-serif font-bold text-lg">{guide.title}</h3>
                    </Link>
                ))}
            </div>
        </PublicLayout>
    );
}