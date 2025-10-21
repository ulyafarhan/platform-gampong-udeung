import { Link } from '@inertiajs/react';

export const NavLink = ({ href, active, children, icon }) => (
    <Link
        href={href}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${
            active ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : ''
        }`}
    >
        {icon}
        {children}
    </Link>
);