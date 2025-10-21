import Pagination from "@/Components/Pagination";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import PublicLayout from "@/Layouts/PublicLayout";
import { Head } from "@inertiajs/react";
import { BookOpen, HelpCircle, FileText, Search, ChevronDown, Info, ClipboardList, UserCheck, Clock, Star } from "lucide-react";
import { useState, useEffect } from "react";

// Helper format tanggal
const formatDate = (dateString, options = { year: "numeric", month: "long", day: "numeric" }) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

export default function PanduanIndex({ guides }) {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filteredGuides = guides.data.filter(guide =>
        (guide.title && guide.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (guide.content && guide.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const popularGuides = guides.data.slice(0, 3);

    return (
        <PublicLayout>
            <Head title="Panduan Layanan - Gampong Udeung">
                <meta name="description" content="Panduan lengkap layanan administrasi di Gampong Udeung" />
                <meta name="keywords" content="panduan, layanan, administrasi, gampong, udeung, aceh" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
                    
                    {/* Header Section */}
                    <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl mb-6 shadow-xl">
                            <BookOpen className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-['Merriweather']">
                            Panduan Layanan
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-['Inter']">
                            Temukan panduan layanan administrasi secara lengkap dan mudah dipahami. 
                            Kami siap membantu setiap langkah administrasi Anda.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className={`max-w-2xl mx-auto mb-12 transform transition-all duration-700 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari panduan..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 font-['Inter']"
                            />
                        </div>
                    </div>

                    {/* Popular Guides Section */}
                    {popularGuides.length > 0 && (
                        <div className={`mb-16 transform transition-all duration-700 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center font-['Merriweather']">
                                <Star className="h-6 w-6 text-yellow-500 mr-3" />
                                Panduan Populer
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {popularGuides.map((guide, index) => (
                                    <div key={guide.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <FileText className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                                    {guide.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-['Inter']">
                                                    Panduan lengkap dan mudah dipahami
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Main Accordion */}
                    <div className={`transform transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-8 md:p-12">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-['Merriweather']">
                                        Semua Panduan
                                    </h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Info className="h-4 w-4" />
                                        <span>Klik untuk membuka</span>
                                    </div>
                                </div>
                                
                                <Accordion type="single" collapsible className="w-full space-y-4">
                                    {filteredGuides.map((guide) => (
                                        <AccordionItem 
                                            value={`item-${guide.id}`} 
                                            key={guide.id} 
                                            className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                                        >
                                            <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <BookOpen className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <h3 className="font-semibold font-['Inter']">{guide.title}</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-normal">
                                                            Diperbarui {formatDate(guide.updated_at)}
                                                        </p>
                                                    </div>
                                                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-300" />
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="px-6 pb-6 pt-2 bg-gray-50 dark:bg-gray-800/50">
                                                    <div 
                                                        className="prose prose-base dark:prose-invert max-w-none leading-relaxed font-['Inter']"
                                                        dangerouslySetInnerHTML={{ __html: guide.content }} 
                                                    />
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>

                                {filteredGuides.length === 0 && (
                                    <div className="text-center py-12">
                                        <Search className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            Panduan tidak ditemukan
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Coba kata kunci pencarian yang berbeda.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transform transition-all duration-700 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <ClipboardList className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                {guides.data.length}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Total Panduan
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <UserCheck className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                24/7
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Layanan Tersedia
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <Clock className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Inter']">
                                Cepat
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-['Inter']">
                                Proses Mudah
                            </p>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className={`mt-16 transform transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Pagination links={guides.links} />
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}