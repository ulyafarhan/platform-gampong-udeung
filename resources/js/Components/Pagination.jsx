import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex items-center justify-between mt-6">
            {links.prev ? (
                <Link
                    href={links.prev}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Sebelumnya
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">
                    Sebelumnya
                </span>
            )}

            {links.next ? (
                <Link
                    href={links.next}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Selanjutnya
                </Link>
            ) : (
                <span className="px-4 py-2 text-sm font-medium text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed">
                    Selanjutnya
                </span>
            )}
        </div>
    );
}