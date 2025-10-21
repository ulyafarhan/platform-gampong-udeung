import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight, Calendar, User, Eye, Clock, Share2, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function BeritaShow({ berita, prevPost, nextPost }) {
    const [isVisible, setIsVisible] = useState(false);
    const [readingTime, setReadingTime] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        // Hitung estimasi waktu membaca
        const wordCount = berita.body ? berita.body.split(/\s+/).length : 0;
        setReadingTime(Math.ceil(wordCount / 200)); // 200 kata per menit
    }, [berita.body]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: berita.title,
                text: berita.summary || 'Baca berita terbaru dari Gampong Udeung',
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link berita telah disalin ke clipboard!');
        }
    };

    return (
        <PublicLayout>
            <Head title={`${berita.title} - Gampong Udeung`}>
                <meta name="description" content={berita.summary || berita.title} />
                <meta name="keywords" content="berita, gampong, udeung, aceh, informasi" />
                <meta property="og:title" content={berita.title} />
                <meta property="og:description" content={berita.summary || berita.title} />
                <meta property="og:image" content={formatImageUrl(berita.image)} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="Gampong Udeung" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-50'></div>
                
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Back Button */}
                    <div className={`mb-8 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link
                            href={route("berita.index")}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors duration-200 group"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Berita
                        </Link>
                    </div>

                    <article className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        
                        {/* Article Header */}
                        <header className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full">
                                    <Tag className="h-4 w-4 mr-2" />
                                    Berita
                                </span>
                                <span className="inline-flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {readingTime} menit baca
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-['Merriweather']">
                                {berita.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Diterbitkan {formatDate(berita.created_at)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>Admin Gampong</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4" />
                                    <span>1.2k dilihat</span>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={formatImageUrl(berita.image)}
                                alt={berita.title}
                                className="w-full h-96 md:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>

                        {/* Article Content */}
                        <div className="p-8 md:p-12">
                            {berita.summary && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
                                    <p className="text-lg text-blue-800 dark:text-blue-200 font-medium leading-relaxed">
                                        {berita.summary}
                                    </p>
                                </div>
                            )}
                            
                            <div
                                className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none leading-relaxed font-['Inter']"
                                dangerouslySetInnerHTML={{ __html: berita.body }}
                            />
                        </div>

                        {/* Share Section */}
                        <div className="p-8 md:p-12 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Bagikan Berita Ini
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Bantu sebarkan informasi penting ini kepada masyarakat
                                    </p>
                                </div>
                                <button
                                    onClick={handleShare}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    <Share2 className="h-5 w-5 mr-2" />
                                    Bagikan
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        {(prevPost || nextPost) && (
                            <div className="p-8 md:p-12 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {prevPost && (
                                        <Link
                                            href={route("berita.show", prevPost.slug)}
                                            className="group flex items-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                        >
                                            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-4 group-hover:-translate-x-1 transition-transform" />
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Berita Sebelumnya</p>
                                                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {prevPost.title}
                                                </h4>
                                            </div>
                                        </Link>
                                    )}
                                    
                                    {nextPost && (
                                        <Link
                                            href={route("berita.show", nextPost.slug)}
                                            className="group flex items-center justify-end p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 text-right"
                                        >
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Berita Selanjutnya</p>
                                                <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                    {nextPost.title}
                                                </h4>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-400 ml-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </PublicLayout>
    );
}