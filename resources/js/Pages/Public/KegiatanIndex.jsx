import Pagination from "@/Components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head, Link } from "@inertiajs/react";
import { Calendar, MapPin, Clock, Users, Tag, Activity } from "lucide-react";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function KegiatanIndex({ events }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const getEventStatus = (eventDate) => {
        const today = new Date();
        const event = new Date(eventDate);
        
        if (event < today) {
            return { text: 'Selesai', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' };
        } else if (event.toDateString() === today.toDateString()) {
            return { text: 'Berlangsung', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' };
        } else {
            return { text: 'Akan Datang', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' };
        }
    };

    return (
        <PublicLayout>
            <Head title="Kegiatan - Gampong Udeung">
                <meta name="description" content="Jadwal dan informasi kegiatan di Gampong Udeung" />
                <meta name="keywords" content="kegiatan, acara, gampong, udeung, jadwal" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Header Section */}
                    <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-8">
                            <Activity className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                            <span className="text-sm font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide">Kegiatan Gampong</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather'] leading-tight">
                            Agenda & Kegiatan
                            <span className="block text-green-600 dark:text-green-400 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                Gampong Udeung
                            </span>
                        </h1>
                        
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Ikuti berbagai kegiatan terbaru di Gampong Udeung. Temukan jadwal, lokasi, dan detail acara yang sedang berlangsung.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Activity className="h-8 w-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{events.data.length}</h3>
                            <p className="text-gray-600 dark:text-gray-400">Total Kegiatan</p>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">2024</h3>
                            <p className="text-gray-600 dark:text-gray-400">Tahun Kegiatan</p>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl">
                            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">1.2k</h3>
                            <p className="text-gray-600 dark:text-gray-400">Total Peserta</p>
                        </div>
                    </div>

                    {/* Grid Kegiatan */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {events.data.map((event, index) => {
                            const status = getEventStatus(event.date);
                            return (
                                <div 
                                    key={event.id} 
                                    className={`group transform transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden">
                                        {/* Gambar dengan Status Badge */}
                                        <CardHeader className="p-0 relative overflow-hidden">
                                            <div className="aspect-video relative">
                                                <img
                                                    src={formatImageUrl(event.image)}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                
                                                {/* Status Badge */}
                                                <div className="absolute top-4 left-4">
                                                    <span className={`inline-flex items-center px-3 py-1 ${status.color} text-xs font-semibold rounded-full backdrop-blur-sm`}>
                                                        <Tag className="h-3 w-3 mr-1" />
                                                        {status.text}
                                                    </span>
                                                </div>
                                                
                                                {/* Date Badge */}
                                                <div className="absolute top-4 right-4">
                                                    <span className="inline-flex items-center px-3 py-1 bg-black/50 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                                                        <Calendar className="h-3 w-3 mr-1" />
                                                        {formatDate(event.date, { day: "numeric", month: "short" })}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        {/* Konten */}
                                        <CardContent className="p-6 flex-1 flex flex-col">
                                            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors font-['Merriweather']">
                                                {event.title}
                                            </CardTitle>
                                            
                                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400 flex-1">
                                                <div className="flex items-start">
                                                    <MapPin className="mr-3 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="leading-relaxed">{event.location}</span>
                                                </div>
                                                <div className="flex items-start">
                                                    <Calendar className="mr-3 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="leading-relaxed">{formatDate(event.date)}</span>
                                                </div>
                                                {event.time && (
                                                    <div className="flex items-start">
                                                        <Clock className="mr-3 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span className="leading-relaxed">{event.time}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                        <Users className="h-4 w-4 mr-2" />
                                                        <span>Terbuka untuk umum</span>
                                                    </div>
                                                    <span className="text-green-600 dark:text-green-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                                        Lihat Detail →
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {events.data.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                                <Pagination links={events.links} />
                            </div>
                        </div>
                    )}
                    
                    {/* Empty State */}
                    {events.data.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Activity className="h-12 w-12 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Belum Ada Kegiatan</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                Kegiatan akan segera ditambahkan. Kembali lagi nanti untuk informasi terbaru tentang acara di Gampong Udeung.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}