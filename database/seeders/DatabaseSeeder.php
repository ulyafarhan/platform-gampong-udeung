<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Gallery;
use App\Models\Guide;
use App\Models\Official;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. BUAT USER ADMIN UTAMA
        //================================
        $adminUser = User::create([
            'name' => 'Admin Gampong',
            'email' => 'admin@gampongudeung.com',
            'password' => Hash::make('password'), // password default: password
        ]);

        // 2. BUAT DATA APARATUR GAMPONG (OFFICIALS)
        //================================
        $officials = [
            ['name' => 'Muhammad Zubir', 'position' => 'Keuchik Gampong', 'order' => 1, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Saifullah', 'position' => 'Sekretaris Desa', 'order' => 2, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Abdullah', 'position' => 'Kaur Pemerintahan', 'order' => 3, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Fatimah', 'position' => 'Kaur Keuangan', 'order' => 4, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Aisyah', 'position' => 'Kaur Pembangunan', 'order' => 5, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Umar', 'position' => 'Tuha Peut', 'order' => 6, 'photo' => 'officials/placeholder.png'],
            ['name' => 'Ali', 'position' => 'Tuha Peut', 'order' => 7, 'photo' => 'officials/placeholder.png'],
        ];
        foreach ($officials as $official) {
            Official::create($official);
        }

        // 3. BUAT DATA PANDUAN ADMINISTRASI (GUIDES)
        //================================
        Guide::create([
            'title' => 'Pembuatan Kartu Tanda Penduduk (KTP)',
            'slug' => 'pembuatan-ktp',
            'description' => 'Panduan lengkap untuk warga yang ingin membuat KTP untuk pertama kali atau mengganti KTP yang rusak/hilang.',
            'requirements' => ['Fotokopi Kartu Keluarga' => '1 Lembar', 'Surat Pengantar Keuchik' => 'Asli', 'Pas Foto 3x4' => '2 Lembar, latar biru'],
            'step_by_step' => '<ul><li>Datang ke Kantor Keuchik untuk meminta surat pengantar.</li><li>Bawa semua berkas ke Kantor Camat.</li><li>Lakukan perekaman data dan foto di Dinas Dukcapil.</li></ul>',
            'estimated_time' => '14 Hari Kerja',
            'cost' => 'Rp 0,-',
            'tips' => '<p>Datanglah ke kantor dinas pada pagi hari untuk menghindari antrean panjang.</p>',
        ]);
        Guide::create([
            'title' => 'Pengurusan Kartu Keluarga (KK)',
            'slug' => 'pengurusan-kk',
            'description' => 'Panduan untuk menambah anggota keluarga baru, pecah KK, atau memperbarui data pada Kartu Keluarga.',
            'requirements' => ['Fotokopi KTP Suami & Istri' => '1 Lembar', 'Surat Nikah' => 'Fotokopi', 'Surat Pengantar Keuchik' => 'Asli'],
            'step_by_step' => '<ul><li>Lengkapi berkas dari Kantor Keuchik.</li><li>Serahkan semua berkas ke Kantor Camat untuk verifikasi.</li><li>Ambil KK baru di Dinas Dukcapil setelah pemberitahuan.</li></ul>',
            'estimated_time' => '7 Hari Kerja',
        ]);
        Guide::create([
            'title' => 'Surat Keterangan Usaha (SKU)',
            'slug' => 'surat-keterangan-usaha',
            'description' => 'Panduan untuk para pelaku usaha di Gampong Udeung yang membutuhkan SKU sebagai syarat administrasi usaha.',
            'requirements' => ['Fotokopi KTP Pemohon' => '1 Lembar', 'Fotokopi KK' => '1 Lembar', 'Surat Pengantar Keuchik' => 'Asli'],
            'step_by_step' => '<ul><li>Minta surat pengantar dari Keuchik.</li><li>Bawa surat tersebut ke Kantor Camat untuk mendapatkan SKU.</li></ul>',
            'estimated_time' => '1 Hari Kerja',
        ]);

        // 4. BUAT DATA KEGIATAN (EVENTS)
        //================================
        Event::create(['name' => 'Pengajian Rutin Sibrul Mubtadin', 'location' => 'Meunasah Gampong', 'starts_at' => now()->addDays(3)->setHour(20), 'description' => 'Pengajian mingguan bersama Tgk. Imum.']);
        Event::create(['name' => 'Rapat Pemuda Gampong', 'location' => 'Balai Pemuda', 'starts_at' => now()->addDays(5)->setHour(20), 'description' => 'Membahas persiapan acara 17 Agustus.']);
        Event::create(['name' => 'Gotong Royong Massal', 'location' => 'Lingkungan Gampong', 'starts_at' => now()->addDays(10)->setHour(8), 'description' => 'Membersihkan saluran air dan area umum.']);
        Event::create(['name' => 'Peringatan Maulid Nabi Muhammad SAW', 'location' => 'Meunasah Gampong', 'starts_at' => now()->addDays(30)->setHour(9), 'description' => 'Ceramah dan makan bersama.']);

        // 5. BUAT DATA BERITA (POSTS) - SEBANYAK 20 BERITA
        //================================
        $postTitles = [
            'Pembangunan Jalan Gampong Telah Selesai 100%', 'Bantuan Langsung Tunai (BLT) Tahap III Telah Disalurkan', 'Tim Voli Gampong Udeung Juarai Turnamen Kecamatan', 'Kegiatan Posyandu Bulan Ini Berjalan Lancar', 'Sosialisasi Bahaya Narkoba oleh BNN di Balai Desa', 'Gotong Royong Membersihkan Saluran Irigasi Menjelang Musim Hujan', 'Pelatihan Membuat Kue untuk Ibu-Ibu PKK', 'Pemasangan Lampu Jalan di Lorong-Lorong Gampong', 'Anak-anak Gampong Udeung Antusias Ikuti Lomba 17 Agustus', 'Hasil Musyawarah Gampong (Musrenbang) 2025', 'Jadwal Baru Pengajian Rutin di Meunasah', 'Keuchik Menghimbau Warga untuk Menjaga Kebersihan Lingkungan', 'Profil Usaha Keripik Pisang Ibu Fatimah', 'Tim KKN Mahasiswa Pamit Setelah 1 Bulan Mengabdi', 'Pembagian Bibit Padi Unggul untuk Petani Gampong', 'Turnamen Catur Antar Dusun Sukses Digelar', 'Pentingnya Imunisasi Lengkap untuk Balita', 'Gampong Udeung Raih Juara 1 Desa Terbersih Tingkat Kecamatan', 'Warga Diimbau Waspada Penipuan Online', 'Perayaan Hari Raya Idul Adha di Gampong Udeung',
        ];

        foreach ($postTitles as $title) {
            Post::create([
                'title' => $title,
                'slug' => Str::slug($title),
                'image' => 'posts/placeholder.png', // Gunakan gambar placeholder
                'body' => '<p>Ini adalah isi konten berita lengkap. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
                'published_at' => now()->subDays(rand(1, 30)),
                'is_featured' => (rand(1, 5) == 1), // 1 dari 5 berita akan jadi featured
                'user_id' => $adminUser->id,
            ]);
        }

        // 6. BUAT DATA GALERI (GALLERIES)
        //================================
        Gallery::create([
            'title' => 'Dokumentasi Gotong Royong Agustus 2025',
            'description' => 'Keseruan warga saat membersihkan lingkungan gampong bersama-sama.',
            'cover_image' => 'galleries/covers/placeholder.png',
            'images' => ['galleries/images/placeholder.png', 'galleries/images/placeholder.png', 'galleries/images/placeholder.png', 'galleries/images/placeholder.png'],
            'activity_date' => now()->subWeeks(2),
        ]);
        Gallery::create([
            'title' => 'Perlombaan 17 Agustus',
            'description' => 'Momen-momen lucu dan meriah saat perlombaan hari kemerdekaan.',
            'cover_image' => 'galleries/covers/placeholder.png',
            'images' => ['galleries/images/placeholder.png', 'galleries/images/placeholder.png', 'galleries/images/placeholder.png', 'galleries/images/placeholder.png', 'galleries/images/placeholder.png'],
            'activity_date' => now()->subWeeks(1),
        ]);
    }
}