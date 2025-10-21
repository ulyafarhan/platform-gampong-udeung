import { NavLink } from "@/Components/admin/nav-link";
import HomeIcon from "@/Components/Icons/HomeIcon";
import NewspaperIcon from "@/Components/Icons/NewspaperIcon";
import DocumentTextIcon from "@/Components/Icons/DocumentTextIcon";
import UserCircleIcon from "@/Components/Icons/UserCircleIcon";
import UsersIcon from "@/Components/Icons/UsersIcon";
import CalendarIcon from "@/Components/Icons/CalendarIcon";
import PhotoIcon from "@/Components/Icons/PhotoIcon";

export const SidebarContent = () => (
    <nav className="grid items-start px-4 text-sm font-medium">
        <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')} icon={<HomeIcon className="h-4 w-4" />}>Dasbor</NavLink>
        
        <h3 className="my-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Konten</h3>
        <NavLink href={route('admin.berita.index')} active={route().current('admin.berita.*')} icon={<NewspaperIcon className="h-4 w-4" />}>Berita</NavLink>
        <NavLink href={route('admin.panduan.index')} active={route().current('admin.panduan.*')} icon={<DocumentTextIcon className="h-4 w-4" />}>Panduan Admin</NavLink>
        <NavLink href={route('admin.kegiatan.index')} active={route().current('admin.kegiatan.*')} icon={<CalendarIcon className="h-4 w-4" />}>Kalender Kegiatan</NavLink>
        <NavLink href={route('admin.album.index')} active={route().current('admin.album.*')} icon={<PhotoIcon className="h-4 w-4" />}>Galeri</NavLink>
        
        <h3 className="my-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gampong</h3>
        <NavLink href={route('admin.profil.index')} active={route().current('admin.profil.*')} icon={<UserCircleIcon className="h-4 w-4" />}>Profil Gampong</NavLink>
        <NavLink href={route('admin.aparat.index')} active={route().current('admin.aparat.*')} icon={<UsersIcon className="h-4 w-4" />}>Struktur Gampong</NavLink>
    </nav>
);