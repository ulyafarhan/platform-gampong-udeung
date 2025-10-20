import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

function PostCard({ post }) {
    const publicationDate = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <Link href={route('posts.show', post.slug)} className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src={`/storage/${post.image}`} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
                <h3 className="font-['Merriweather'] font-bold text-xl mb-2 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 text-sm">{publicationDate}</p>
            </div>
        </Link>
    );
}

export default function Index({ posts }) {
    return (
        <PublicLayout title="Berita & Pengumuman">
            <div className="py-16 sm:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="font-['Merriweather'] text-4xl font-bold mb-8 text-center">Semua Berita & Pengumuman</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                    {/* Di sini bisa ditambahkan Paginasi nanti */}
                </div>
            </div>
        </PublicLayout>
    );
}