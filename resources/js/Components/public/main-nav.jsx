import { Link } from "@inertiajs/react";
import { navItems } from "@/lib/nav-items";

export function MainNav({ navLinkClasses }) {
    return (
        <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${navLinkClasses} ${window.location.pathname === item.href
                        ? "after:w-full"
                        : ""
                        }`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}