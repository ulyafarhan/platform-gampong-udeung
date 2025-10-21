import Pagination from "@/Components/Pagination";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Calendar, User, Eye, Tag, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function BeritaIndex({ beritas }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <PublicLayout>
            <Head title="Berita Terkini - Gampong Udeung">
                <meta name="description" content="Berita terkini dan informasi terbaru dari Gampong Udeung" />
                <meta name="keywords" content="berita, gampong, udeung, aceh, informasi" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-50"
                    style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')` }}
                ></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Header Section */}
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-6 py-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
                            <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">Berita Terkini</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather'] leading-tight">
                            Informasi Terbaru
                            <span className="block text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                dari Gampong Udeung
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Tetap terinformasi dengan berita terbaru, kegiatan penting, dan pengumuman dari pemerintah gampong kami.
                        </p>
                    </div>

                    {/* Grid Berita */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {beritas.data.map((post, index) => (
                            <div 
                                key={post.id} 
                                className={`group transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                                    {/* Gambar dengan Overlay */}
                                    <CardHeader className="p-0 relative overflow-hidden">
                                        <div className="aspect-video relative">
                                            <img
                                                src={formatImageUrl(post.image)}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            
                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                    <Tag className="h-3 w-3 mr-1" />
                                                    Berita
                                                </span>
                                            </div>
                                            
                                            {/* View Count */}
                                            <div className="absolute top-4 right-4">
                                                <span className="inline-flex items-center px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    1.2k
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    {/* Konten */}
                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(post.created_at)}</span>
                                            </div>
                                            <span>•</span>
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                <span>Admin</span>
                                            </div>
                                        </div>
                                        
                                        <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-['Merriweather']">
                                            <Link href={route("berita.show", post.slug)}>
                                                {post.title}
                                            </Link>
                                        </CardTitle>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-1">
                                            {post.summary || post.body?.substring(0, 150) + "..."}
                                        </p>
                                    </CardContent>

                                    {/* Footer dengan CTA */}
                                    <CardFooter className="p-6 pt-0">
                                        <Link
                                            href={route("berita.show", post.slug)}
                                            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group-hover:shadow-lg"
                                        >
                                            Baca Selengkapnya
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {beritas.data.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                <Pagination links={beritas.links} />
                            </div>
                        </div>
                    )}
                    
                    {/* Empty State */}
                    {beritas.data.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Newspaper className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Belum Ada Berita</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                Berita akan segera ditambahkan. Kembali lagi nanti untuk informasi terbaru dari Gampong Udeung.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}