import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Show({ post }) {
    const publicationDate = new Date(post.published_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <PublicLayout title={post.title}>
            <div className="py-16 sm:py-20">
                <article className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                    <h1 className="font-['Merriweather'] text-4xl font-bold mb-4">{post.title}</h1>
                    <p className="text-gray-500 mb-6">{publicationDate}</p>
                    {post.image && (
                        <img src={`/storage/${post.image}`} alt={post.title} className="w-full rounded-lg mb-8" />
                    )}
                    <div
                        className="prose lg:prose-xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </article>
            </div>
        </PublicLayout>
    );
}