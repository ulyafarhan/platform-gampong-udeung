import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "@inertiajs/react";
import { navItems } from "@/lib/nav-items";

export function MobileNav({ scrolled, isHomePage, auth }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={`ml-2 rounded-full transition-all duration-300 ${
                        scrolled || !isHomePage
                            ? "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                            : "text-white hover:bg-white/20"
                    }`}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        </Button>
                    </SheetTrigger>
                </div>
                <div className="p-4">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 text-lg font-medium transition-colors duration-300"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                        {auth && auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="font-semibold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link
                                    href={route("login")}
                                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="inline-flex items-center justify-center px-4 py-2 text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 shadow-md transition-all duration-300"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}