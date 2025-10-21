import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import CeurdasChat from "@/Components/CeurdasChat";
import { MainNav } from "@/Components/public/main-nav";
import { MobileNav } from "@/Components/public/mobile-nav";
import { ThemeToggle } from "@/Components/public/theme-toggle";
import { SiteFooter } from "@/Components/public/site-footer";

export default function PublicLayout({ children, auth }) {
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHomePage = window.location.pathname === '/';

    const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || !isHomePage
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md"
        : "bg-transparent"
        }`;

    const navLinkClasses = `relative font-medium text-base transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:transition-all after:duration-300 ${scrolled || !isHomePage
        ? "text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 after:bg-green-600"
        : "text-white hover:text-green-300 after:bg-green-300"
        }`;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-['Inter']">
            <header className={headerClasses}>
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                                <ApplicationLogo
                                    className={`h-10 w-auto transition-all duration-300 ${scrolled || !isHomePage
                                        ? "text-gray-800 dark:text-white"
                                        : "text-white"
                                        }`}
                                />
                                <span
                                    className={`self-center text-2xl font-semibold whitespace-nowrap ${scrolled || !isHomePage
                                        ? "text-gray-800 dark:text-white"
                                        : "text-white"
                                        }`}
                                >
                                    Gampong Udeung
                                </span>
                            </Link>
                        </div>
                        <MainNav navLinkClasses={navLinkClasses} />
                        <div className="hidden md:flex items-center space-x-4">
                            {isMounted && <ThemeToggle scrolled={scrolled} isHomePage={isHomePage} />}
                            {auth && auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className={`font-semibold transition-colors duration-300 ${scrolled || !isHomePage
                                        ? "text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                                        : "text-white hover:text-green-300"
                                        }`}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className={`font-semibold transition-colors duration-300 ${scrolled || !isHomePage
                                            ? "text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                                            : "text-white hover:text-green-300"
                                            }`}
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-full transition-all duration-300 ${scrolled || !isHomePage
                                            ? "text-white bg-green-600 hover:bg-green-700 shadow-md"
                                            : "text-green-700 bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="md:hidden flex items-center">
                            {isMounted && <ThemeToggle scrolled={scrolled} isHomePage={isHomePage} />}
                            <MobileNav scrolled={scrolled} isHomePage={isHomePage} auth={auth} />
                        </div>
                    </div>
                </nav>
            </header>

            <main>{children}</main>

            <CeurdasChat />

            <SiteFooter />
        </div>
    );
}