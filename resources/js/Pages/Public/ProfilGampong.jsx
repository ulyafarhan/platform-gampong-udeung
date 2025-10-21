import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Target, Flag, MapPin, Users, Award, Calendar, Mail, Phone, ChevronRight, Star, Shield, Heart, Globe, BookOpen, UserCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatImageUrl } from "@/lib/utils";

// Helper format tanggal
const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};
  
export default function ProfilGampong({ settings, aparats }) {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const misiList = settings.misi ? settings.misi.split('\n').filter(item => item.trim() !== '') : [];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleMemberClick = (member) => {
        setSelectedMember(member);
    };

    const closeModal = () => {
        setSelectedMember(null);
    };

    const getJabatanColor = (jabatan) => {
        if (!jabatan) return 'bg-gradient-to-r from-gray-500 to-gray-600';
        if (jabatan.toLowerCase().includes('kepala')) return 'bg-gradient-to-r from-red-500 to-red-600';
        if (jabatan.toLowerCase().includes('sekretaris')) return 'bg-gradient-to-r from-blue-500 to-blue-600';
        if (jabatan.toLowerCase().includes('bendahara')) return 'bg-gradient-to-r from-green-500 to-green-600';
        if (jabatan.toLowerCase().includes('kaur')) return 'bg-gradient-to-r from-purple-500 to-purple-600';
        if (jabatan.toLowerCase().includes('kadus')) return 'bg-gradient-to-r from-orange-500 to-orange-600';
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    };

    return (
        <PublicLayout title="Profil Gampong">
            <Head title="Profil Gampong Udeung - Tentang Kami">
                <meta name="description" content="Kenali lebih dekat Gampong Udeung - sejarah, visi, misi, dan struktur pemerintahan" />
                <meta name="keywords" content="profil, gampong, udeung, sejarah, visi, misi, pemerintahan" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Hero Section */}
                    <div className={`text-center mb-20 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl mb-8 shadow-2xl">
                            <Globe className="h-12 w-12 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather']">
                            Gampong Udeung
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-['Inter']">
                            Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan gampong kami yang berdedikasi untuk masyarakat.
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                {aparats.length}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Perangkat Desa
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <MapPin className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                Aceh
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Lokasi
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Award className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                Profesional
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Pelayanan
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Heart className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                Melayani
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Dengan Sepenuh Hati
                            </p>
                        </div>
                    </div>

                    {/* Sejarah Section */}
                    {settings.sejarah && (
                        <section className={`mb-20 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                                <div className="p-8 md:p-12">
                                    <div className="flex items-center mb-8">
                                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                                            <BookOpen className="h-8 w-8 text-white" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-['Merriweather']">
                                            Sejarah Singkat
                                        </h2>
                                    </div>
                                    <div className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none leading-relaxed text-justify font-['Inter']">
                                        <p className="text-gray-700 dark:text-gray-300 first-letter:text-4xl first-letter:font-bold first-letter:text-green-600 first-letter:mr-2 first-letter:float-left">
                                            {settings.sejarah}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Visi & Misi Section */}
                    <section className={`mb-20 transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                                            <Target className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-['Merriweather']">
                                            Visi Kami
                                        </h3>
                                    </div>
                                    <p className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed font-['Inter']">
                                        {settings.visi}
                                    </p>
                                </div>
                                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                                    <div className="flex items-center mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                                            <Flag className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-['Merriweather']">
                                            Misi Kami
                                        </h3>
                                    </div>
                                    <ul className="space-y-3 text-gray-700 dark:text-gray-300 font-['Inter']">
                                        {misiList.map((misi, index) => (
                                            <li key={index} className="flex items-start">
                                                <ChevronRight className="h-5 w-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                                <span>{misi}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Struktur Pemerintahan */}
                    <section className={`transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 shadow-xl">
                                        <Shield className="h-10 w-10 text-white" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-['Merriweather']">
                                        Struktur Pemerintahan Gampong
                                    </h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-['Inter']">
                                        Tim profesional yang berdedikasi untuk melayani masyarakat dengan integritas dan transparansi.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {aparats.map((item, index) => (
                                        <Card 
                                            key={item.id} 
                                            className="text-center border-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                                            onClick={() => handleMemberClick(item)}
                                        >
                                            <CardContent className="p-6">
                                                <div className="relative mb-4">
                                                    <img 
                                                        src={formatImageUrl(item.foto)} 
                                                        alt={item.nama} 
                                                        className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-800 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl" 
                                                    />
                                                    <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 ${getJabatanColor(item.jabatan)} rounded-full text-white text-xs font-semibold shadow-lg`}>
                                                        {item.jabatan ? item.jabatan.split(' ')[0] : ''}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-['Inter']">
                                                    {item.nama}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium font-['Inter']">
                                                    {item.jabatan}
                                                </p>
                                                {item.nip && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-['Inter']">
                                                        NIP: {item.nip}
                                                    </p>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Modal for Member Details */}
            {selectedMember && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-8">
                            <div className="text-center mb-6">
                                <img 
                                    src={formatImageUrl(selectedMember.foto)} 
                                    alt={selectedMember.nama} 
                                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-700 mb-4" 
                                />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Merriweather']">
                                    {selectedMember.nama}
                                </h3>
                                <p className={`inline-block px-4 py-2 ${getJabatanColor(selectedMember.jabatan)} rounded-full text-white text-sm font-semibold`}>
                                    {selectedMember.jabatan}
                                </p>
                            </div>
                            
                            <div className="space-y-4">
                                {selectedMember.nip && (
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <UserCheck className="h-5 w-5 text-gray-500" />
                                        <span className="font-['Inter']">NIP: {selectedMember.nip}</span>
                                    </div>
                                )}
                                {selectedMember.email && (
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Mail className="h-5 w-5 text-gray-500" />
                                        <span className="font-['Inter']">{selectedMember.email}</span>
                                    </div>
                                )}
                                {selectedMember.telepon && (
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Phone className="h-5 w-5 text-gray-500" />
                                        <span className="font-['Inter']">{selectedMember.telepon}</span>
                                    </div>
                                )}
                                {selectedMember.tanggal_mulai && (
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Calendar className="h-5 w-5 text-gray-500" />
                                        <span className="font-['Inter']">Mulai menjabat: {formatDate(selectedMember.tanggal_mulai)}</span>
                                    </div>
                                )}
                            </div>
                            
                            <button
                                onClick={closeModal}
                                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}