<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

// Halaman Beranda
Route::get('/', [PageController::class, 'home'])->name('home');

// Halaman Berita
Route::get('/berita', [PageController::class, 'posts'])->name('posts.index');
Route::get('/berita/{post:slug}', [PageController::class, 'postDetail'])->name('posts.show');

// Halaman Panduan Administrasi (Urus Surat)
Route::get('/panduan', [PageController::class, 'guides'])->name('guides.index');
Route::get('/panduan/{guide:slug}', [PageController::class, 'guideDetail'])->name('guides.show');

// Halaman Tentang Kami
Route::get('/tentang-kami', [PageController::class, 'about'])->name('about');

// Halaman Kalender Kegiatan
Route::get('/kegiatan', [PageController::class, 'events'])->name('events.index');

// Halaman Galeri
Route::get('/galeri', [PageController::class, 'galleries'])->name('galleries.index');
Route::get('/galeri/{gallery}', [PageController::class, 'galleryDetail'])->name('galleries.show');


// Rute untuk autentikasi (jika Anda menginstal Breeze)
require __DIR__.'/auth.php';