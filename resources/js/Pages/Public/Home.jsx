import PublicLayout from '@/Layouts/PublicLayout'; 
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/Components/ui/card';
import { Newspaper, BookOpen, Calendar, ArrowRight, Camera, Clock, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatImageUrl } from '@/lib/utils';

// Helper format tanggal
const formatDate = (dateString, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function Home({ beritas, panduans, kegiatans, albumTerbaru }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const heroStyle = {
        backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 50%, rgba(16, 185, 129, 0.9) 100%), 
                         linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), 
                         url('/images/hero-background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
    };

    return (
        <PublicLayout title="Beranda"> 
            
            {/* Hero Section */}
            <section style={heroStyle} className="relative text-white min-h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-700/20"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="mb-8">
                            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-pulse">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-ping"></div>
                                <span className="text-sm font-medium">Desa Digital Terbaik di Aceh</span>
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                            <span className="block text-white font-['Merriweather'] drop-shadow-2xl">
                                Selamat Datang di
                            </span>
                            <span className="block text-yellow-300 font-['Merriweather'] font-black drop-shadow-2xl bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                                Gampong Udeung
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
                            Unggul dalam transparansi, efisiensi pelayanan, dan pemberdayaan masyarakat 
                            melalui teknologi digital masa depan yang inovatif dan berkelanjutan.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button 
                                size="lg" 
                                className="group bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 hover:from-yellow-500 hover:to-yellow-600 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1"
                                asChild
                            >
                                <Link href="#panduan-warga">
                                    Mulai Jelajahi
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
                                asChild
                            >
                                <Link href="#berita">
                                    Lihat Berita
                                    <Newspaper className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            {/* Panduan Layanan */}
            <section id="panduan-warga" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white">Panduan Layanan Administrasi</h2>
                        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Solusi "satu pintu" untuk semua kebutuhan birokrasi Anda.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {panduans.map(panduan => (
                            <Link href={route('panduan.index')} key={panduan.id}>
                                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-xl">
                                    <CardHeader>
                                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-800">
                                            <BookOpen className="h-8 w-8 text-green-700 dark:text-green-400"/>
                                        </div>
                                        <CardTitle className="mt-4 font-semibold">{panduan.title}</CardTitle>
                                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                                            Panduan singkat untuk {panduan.title}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button asChild variant="outline">
                            <Link href={route('panduan.index')}>Lihat Semua Panduan <ArrowRight className="ml-2 h-4 w-4 text-green-700"/></Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Berita & Kegiatan */}
            <section id="berita" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Berita */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white mb-8">Berita Terkini</h2>
                        <div className="space-y-8">
                            {beritas.map(berita => (
                                <div key={berita.id} className="flex gap-4 items-start pb-6 border-b border-gray-200 dark:border-gray-700">
                                    {berita.image && <img src={formatImageUrl(berita.image)} alt={berita.title} className="w-24 h-24 object-cover rounded-lg hidden sm:block"/>}
                                    <div>
                                        <p className="text-xs text-gray-500">{formatDate(berita.created_at)}</p>
                                        <h3 className="font-bold text-lg hover:text-green-700 transition-colors">
                                            <Link href={route('berita.show', berita.slug)}>{berita.title}</Link>
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                            {berita.summary || berita.body.substring(0, 150) + "..."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Kegiatan */}
                    <div>
                        <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white mb-8">Jadwal Kegiatan</h2>
                        <div className="space-y-4">
                            {kegiatans.length > 0 ? kegiatans.map(kegiatan => (
                                <Card key={kegiatan.id} className="hover:shadow-md transition-all duration-300">
                                    <CardContent className="pt-6">
                                        <p className="text-sm font-bold text-green-700 dark:text-green-400">{formatDate(kegiatan.date, {weekday: 'long', day: 'numeric', month: 'long'})}</p>
                                        <p className="font-semibold">{kegiatan.title}</p>
                                        <p className="text-sm text-muted-foreground">{kegiatan.time} WIB di {kegiatan.location}</p>
                                    </CardContent>
                                </Card>
                            )) : <p className="text-muted-foreground">Tidak ada jadwal kegiatan.</p>}
                        </div>
                    </div>
                </div>
            </section>

            {/* Galeri Terbaru */}
            {albumTerbaru && (
                <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-['Merriweather'] font-bold text-green-900 dark:text-white">
                                Galeri Terbaru
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                Momen-momen penting yang terekam di Gampong Udeung.
                            </p>
                        </div>

                        {/* Grid Galeri */}
                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(albumTerbaru.images || []).slice(0, 4).map((imagePath, index) => (
                                <div key={index} className="relative group overflow-hidden rounded-lg shadow-md">
                                    <Link href={route('galeri.show', albumTerbaru.slug)}>
                                        <img 
                                            src={formatImageUrl(imagePath)} 
                                            alt={albumTerbaru.title} 
                                            className="h-full w-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Overlay Judul Album */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white font-semibold text-center px-2">
                                                {albumTerbaru.title}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Tombol Lihat Semua */}
                        <div className="mt-8 text-center">
                            <Button asChild variant="outline">
                                <Link href={route('galeri.index')}>
                                    Lihat Semua Galeri <ArrowRight className="ml-2 h-4 w-4"/>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}