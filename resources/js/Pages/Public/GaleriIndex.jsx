import Pagination from "@/Components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { Image, Camera, Calendar, Eye, FolderOpen, Grid3X3 } from "lucide-react";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function GaleriIndex({ galleries }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const getImageCount = (gallery) => {
        if (Array.isArray(gallery.images)) {
            return gallery.images.length;
        }
        return 0;
    };

    return (
        <PublicLayout>
            <Head title="Galeri - Gampong Udeung">
                <meta name="description" content="Dokumentasi kegiatan dan momen berharga di Gampong Udeung" />
                <meta name="keywords" content="galeri, foto, kegiatan, gampong, udeung, dokumentasi" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50`}></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Header Section */}
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-8">
                            <Camera className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                            <span className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">Galeri Dokumentasi</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather'] leading-tight">
                            Kenangan & Momen
                            <span className="block text-green-600 dark:text-green-400 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Berharga Gampong
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Kenang momen berharga kegiatan dan acara di Gampong Udeung melalui koleksi foto kami.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FolderOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{galleries.data.length}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Total Album</p>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {galleries.data.reduce((total, gallery) => total + getImageCount(gallery), 0)}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">Total Foto</p>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2024</h3>
                            <p className="text-gray-600 dark:text-gray-400">Tahun Dokumentasi</p>
                        </div>
                    </div>

                    {/* Grid Galeri */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {galleries.data.map((gallery, index) => {
                            const imageCount = getImageCount(gallery);
                            return (
                                <div 
                                    key={gallery.id} 
                                    className={`group transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Link 
                                        href={`/galeri/${gallery.slug}`}
                                        className="block h-full"
                                    >
                                        <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                                            {/* Gambar dengan Overlay */}
                                            <CardHeader className="p-0 relative overflow-hidden">
                                                <div className="aspect-video relative">
                                                    <img
                                                        src={formatImageUrl(gallery.cover_image)}
                                                        alt={gallery.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    
                                                    {/* Image Count Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="inline-flex items-center px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                            <Image className="h-3 w-3 mr-1" />
                                                            {imageCount} foto
                                                        </span>
                                                    </div>
                                                    
                                                    {/* View Icon */}
                                                    <div className="absolute top-4 right-4">
                                                        <span className="inline-flex items-center px-3 py-1 bg-green-600/80 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            Lihat
                                                        </span>
                                                    </div>
                                                    
                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                                            <Grid3X3 className="h-8 w-8 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            {/* Konten */}
                                            <CardContent className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-['Merriweather']">
                                                    {gallery.title}
                                                </h3>
                                                
                                                {gallery.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed flex-1">
                                                        {gallery.description}
                                                    </p>
                                                )}
                                                
                                                {gallery.activity_date && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                            <Calendar className="h-4 w-4 mr-2" />
                                                            <span>{formatDate(gallery.activity_date, { day: "numeric", month: "long", year: "numeric" })}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <Image className="h-4 w-4 mr-2" />
                                                        <span>{imageCount} foto</span>
                                                    </div>
                                                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                                        Lihat Album →
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {galleries.data.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                <Pagination links={galleries.links} />
                            </div>
                        </div>
                    )}
                    
                    {/* Empty State */}
                    {galleries.data.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Camera className="h-12 w-12 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Belum Ada Album</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                Album galeri akan segera ditambahkan. Kembali lagi nanti untuk melihat dokumentasi kegiatan di Gampong Udeung.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}