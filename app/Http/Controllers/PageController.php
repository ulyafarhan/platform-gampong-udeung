<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Gallery;
use App\Models\Guide;
use App\Models\Official;
use App\Models\Post;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    /**
     * Menampilkan Halaman Beranda (Home.jsx)
     */
    public function home(): Response
    {
            $albumTerbaru = Gallery::latest('activity_date')->first();
            if ($albumTerbaru && is_string($albumTerbaru->images)) {
                $albumTerbaru->images = json_decode($albumTerbaru->images, true);
            }

            return Inertia::render('Public/Home', [
                'beritas' => Post::where('published_at', '<=', now())
                    ->latest('published_at')
                    ->take(4)
                    ->get(),
                'panduans' => Guide::orderBy('title')->take(4)->get(),
                'kegiatans' => Event::where('starts_at', '>=', now())
                    ->orderBy('starts_at')
                    ->take(3)
                    ->get(),
                'albumTerbaru' => $albumTerbaru,
        ]);
    }

    /**
     * Menampilkan Halaman Daftar Berita (BeritaIndex.jsx)
     */
    public function posts(Request $request): Response
    {
        $query = Post::query()
            ->where('published_at', '<=', now())
            ->latest('published_at');

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Public/BeritaIndex', [
            'beritas' => $query->paginate(9)->withQueryString(),
            'search' => $request->search,
        ]);
    }

    /**
     * Menampilkan Halaman Detail Berita (BeritaShow.jsx)
     */
    public function postDetail(Post $post): Response
    {
        if (!$post->published_at || $post->published_at->isFuture()) {
            abort(404);
        }

        return Inertia::render('Public/BeritaShow', [
            'berita' => $post,
            'beritaLainnya' => Post::where('published_at', '<=', now())
                ->where('id', '!=', $post->id)
                ->latest('published_at')
                ->take(4)
                ->get(),
        ]);
    }

    /**
     * Menampilkan Halaman Daftar Panduan (PanduanIndex.jsx)
     */
    public function guides(): Response
    {
        return Inertia::render('Public/PanduanIndex', [
            'guides' => Guide::orderBy('title')->paginate(10),
        ]);
    }

    /**
     * Menampilkan Halaman Profil Gampong & Aparatur (ProfilGampong.jsx)
     */
    public function about(): Response
    {
        $settings = Setting::all()->pluck('value', 'key');

        return Inertia::render('Public/ProfilGampong', [
            'aparats' => Official::orderBy('order')->get(),
            'settings' => $settings,
        ]);
    }

    /**
     * Menampilkan Halaman Daftar Kegiatan (KegiatanIndex.jsx)
     */
    public function events(): Response
    {
        return Inertia::render('Public/KegiatanIndex', [
            'events' => Event::where('starts_at', '>=', now())
                ->orderBy('starts_at')
                ->paginate(10),
        ]);
    }

    /**
     * Menampilkan Halaman Daftar Galeri (GaleriIndex.jsx)
     */
    public function galleries(): Response
    {
        return Inertia::render('Public/GaleriIndex', [
            'galleries' => Gallery::latest('activity_date')->paginate(12),
        ]);
    }

    /**
     * Menampilkan Halaman Detail Galeri (GaleriShow.jsx)
     */
    public function galleryDetail(Gallery $gallery): Response
    {
        return Inertia::render('Public/GaleriShow', [
            'gallery' => $gallery,
        ]);
        
        // Ambil galeri sebelumnya (id lebih kecil)
        $prevGallery = Gallery::where('id', '<', $gallery->id)
            ->orderBy('id', 'desc')
            ->first();

        // Ambil galeri selanjutnya (id lebih besar)
        $nextGallery = Gallery::where('id', '>', $gallery->id)
            ->orderBy('id', 'asc')
            ->first();

        return Inertia::render('Public/GaleriShow', [
            'gallery' => $gallery,
            'prevGallery' => $prevGallery,
            'nextGallery' => $nextGallery,
        ]);
    }
}