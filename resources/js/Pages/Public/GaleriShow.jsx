import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Camera, Calendar, Image, Eye, Download, Share2, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function GaleriShow({ gallery }) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [likedImages, setLikedImages] = useState(new Set());

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleImageClick = (image, index) => {
        setSelectedImage({ src: image, index, alt: `${gallery.title} - Gambar ${index + 1}` });
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const navigateImage = (direction) => {
        if (!selectedImage) return;
        
        const newIndex = direction === 'prev' 
            ? (selectedImage.index - 1 + gallery.images.length) % gallery.images.length
            : (selectedImage.index + 1) % gallery.images.length;
        
        setSelectedImage({
            src: gallery.images[newIndex],
            index: newIndex,
            alt: `${gallery.title} - Gambar ${newIndex + 1}`
        });
    };

    const toggleLike = (index) => {
        const newLiked = new Set(likedImages);
        if (newLiked.has(index)) {
            newLiked.delete(index);
        } else {
            newLiked.add(index);
        }
        setLikedImages(newLiked);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: gallery.title,
                text: gallery.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link telah disalin ke clipboard!');
        }
    };

    const handleDownload = (imageUrl, index) => {
        const link = document.createElement('a');
        link.href = formatImageUrl(imageUrl);
        link.download = `${gallery.title.replace(/\s+/g, '_')}_gambar_${index + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PublicLayout>
            <Head title={`Galeri: ${gallery.title} - Gampong Udeung`}>
                <meta name="description" content={gallery.description} />
                <meta name="keywords" content="galeri, foto, kegiatan, gampong, udeung, dokumentasi" />
                <meta property="og:title" content={gallery.title} />
                <meta property="og:description" content={gallery.description} />
                <meta property="og:image" content={formatImageUrl(gallery.cover_image)} />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Header Section */}
                    <div className={`mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link
                            href={route("galeri.index")}
                            className="inline-flex items-center gap-3 text-sm font-semibold text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors mb-8 group"
                        >
                            <div className="w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                            </div>
                            Kembali ke Galeri
                        </Link>

                        <div className="text-center">
                            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                                <Camera className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                                <span className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">Album Foto</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather'] leading-tight">
                                {gallery.title}
                            </h1>
                            
                            {gallery.description && (
                                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                    {gallery.description}
                                </p>
                            )}
                            
                            {gallery.activity_date && (
                                <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{formatDate(gallery.activity_date)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex justify-center gap-4 mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                        >
                            <Share2 className="h-5 w-5" />
                            Bagikan
                        </button>
                        
                        <div className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                            <Image className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300">
                                {gallery.images.length} Foto
                            </span>
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {gallery.images.map((image, index) => (
                            <div 
                                key={index} 
                                className={`group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => handleImageClick(image, index)}
                            >
                                <img
                                    src={formatImageUrl(image)}
                                    alt={`${gallery.title} - Gambar ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                
                                {/* Action Buttons */}
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleLike(index);
                                        }}
                                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                                            likedImages.has(index) 
                                                ? 'bg-red-500/80 text-white' 
                                                : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                    >
                                        <Heart className={`h-4 w-4 ${likedImages.has(index) ? 'fill-current' : ''}`} />
                                    </button>
                                    
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDownload(image, index);
                                        }}
                                        className="p-2 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                                    >
                                        <Download className="h-4 w-4" />
                                    </button>
                                </div>
                                
                                {/* Image Number */}
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                        {index + 1}/{gallery.images.length}
                                    </span>
                                </div>
                                
                                {/* Zoom Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                                        <Eye className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal untuk Gambar Penuh */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => navigateImage('prev')}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        
                        <button
                            onClick={() => navigateImage('next')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        {/* Image */}
                        <img
                            src={selectedImage.src.startsWith('http') ? selectedImage.src : `/storage/${selectedImage.src}`}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        
                        {/* Image Info */}
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                                {selectedImage.alt}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}