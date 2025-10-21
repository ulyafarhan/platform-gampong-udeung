<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ChatController; // Tambahkan ini
use Illuminate\Support\Facades\Route;

// Rute Halaman Publik
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/berita', [PageController::class, 'posts'])->name('berita.index');
Route::get('/berita/{post:slug}', [PageController::class, 'postDetail'])->name('berita.show');
Route::get('/panduan', [PageController::class, 'guides'])->name('panduan.index');
// Catatan: Halaman detail panduan belum ada di file js baru, jadi kita nonaktifkan dulu
// Route::get('/panduan/{guide:slug}', [PageController::class, 'guideDetail'])->name('panduan.show');
Route::get('/profil-gampong', [PageController::class, 'about'])->name('profil.gampong');
Route::get('/kegiatan', [PageController::class, 'events'])->name('kegiatan.index');
Route::get('/galeri', [PageController::class, 'galleries'])->name('galeri.index');
Route::get('/galeri/{gallery:slug}', [PageController::class, 'galleryDetail'])->name('galeri.show');

// Rute Dashboard bawaan Breeze
Route::get('/dashboard', function () {
    return Inertia\Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute Profil bawaan Breeze
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute untuk CeurdasChat
Route::post('/chat', [ChatController::class, 'send'])->name('chat.send');

require __DIR__.'/auth.php';