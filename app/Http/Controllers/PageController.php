<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Guide;
use App\Models\Official;
use App\Models\Post;
use Inertia\Inertia;

class PageController extends Controller
{
    // Method untuk Halaman Beranda
   public function home()
    {
        // Ambil 4 berita terbaru
        $beritas = Post::where('published_at', '<=', now())
            ->latest('published_at')
            ->take(4)
            ->get()
            ->map(fn ($post) => [
                'id' => $post->id,
                'judul' => $post->title,
                'slug' => $post->slug,
                'gambar' => $post->image,
                'isi' => $post->body,
                'ringkasan' => $post->summary,
                'created_at' => $post->published_at,
            ]);

        // Ambil 4 panduan
        $panduans = Guide::orderBy('title')
            ->take(4)
            ->get()
            ->map(fn ($guide) => [
                'id' => $guide->id,
                'judul' => $guide->title,
                'slug' => $guide->slug,
            ]);

        // Ambil 3 kegiatan terdekat
        $kegiatans = Event::where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->take(3)
            ->get()
            ->map(fn ($event) => [
                'id' => $event->id,
                'nama_kegiatan' => $event->name,
                'lokasi' => $event->location,
                'tanggal_mulai' => $event->starts_at,
            ]);

        // Ambil 1 album galeri terbaru
        $albumTerbaru = Gallery::latest('activity_date')
            ->first();
        
        // Format data galeri agar sesuai dengan frontend
        $formattedAlbum = null;
        if ($albumTerbaru) {
            $formattedAlbum = [
                'id' => $albumTerbaru->id,
                'judul' => $albumTerbaru->title,
                // Kita ambil 4 foto pertama dari album
                'fotos' => collect($albumTerbaru->images)->take(4)->map(fn($path, $index) => [
                    'id' => $index, // id dummy
                    'path' => $path,
                ])->values()->all(),
            ];
        }

        return Inertia::render('Home', [
            'beritas' => $beritas,
            'panduans' => $panduans,
            'kegiatans' => $kegiatans,
            'albumTerbaru' => $formattedAlbum,
        ]);
    }

    // Method untuk menampilkan Halaman Daftar Berita (sudah ada)
    public function posts()
    {
        $posts = Post::where('published_at', '<=', now())
            ->latest('published_at')
            ->paginate(6);

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
        ]);
    }

    // Method untuk menampilkan Halaman Detail Berita (sudah ada)
    public function postDetail(Post $post)
    {
        if (!$post->published_at || $post->published_at->isFuture()) {
            abort(404);
        }

        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    // Method untuk Halaman Daftar Panduan
    public function guides()
    {
        return Inertia::render('Guides/Index', [
            'guides' => Guide::orderBy('title')->get(),
        ]);
    }

    // Method untuk Halaman Detail Panduan
    public function guideDetail(Guide $guide)
    {
        return Inertia::render('Guides/Show', [
            'guide' => $guide,
        ]);
    }

    // Method untuk Halaman Tentang Kami & Struktur Gampong
    public function about()
    {
        return Inertia::render('About', [
            'officials' => Official::orderBy('order')->get(),
        ]);
    }

    // Method untuk Halaman Kalender Kegiatan
    public function events()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::where('starts_at', '>=', now())->orderBy('starts_at')->get(),
        ]);
    }

    // Method untuk Halaman Galeri
    public function galleries()
    {
        return Inertia::render('Galleries/Index', [
            'galleries' => Gallery::latest('activity_date')->get(),
        ]);
    }

    // Method untuk Halaman Detail Galeri
    public function galleryDetail(Gallery $gallery)
    {
        return Inertia::render('Galleries/Show', [
            'gallery' => $gallery,
        ]);
    }
}