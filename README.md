Ultigear Backend

Ultigear Backend adalah repository untuk aplikasi backend Ultigear yang menyediakan layanan server-side untuk pengelolaan data aplikasi Ultigear.

Cara Menggunakan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan aplikasi ini di lokal:

Clone Repository

git clone <URL-repo-anda>
cd <folder-repo-anda>

Instalasi Dependencies
Pastikan Anda berada di direktori root proyek, lalu jalankan perintah berikut:

npm install

Seed Data Admin
Untuk membuat akun admin awal, jalankan perintah berikut:

npm run seed

Menjalankan Server
Untuk memulai server dalam mode pengembangan, gunakan:

npm run dev

Fitur Utama

Manajemen User: CRUD untuk akun admin dan pengguna biasa.

Manajemen Produk: Mengelola data produk seperti tambah, edit, dan hapus.

Transaksi: Sistem checkout dengan e-receipt.

Persyaratan Sistem

Pastikan Anda memiliki:

Node.js v14 atau lebih baru

NPM v6 atau lebih baru

MongoDB terinstal dan berjalan di lokal atau koneksi database yang valid


Catatan Penting

Pastikan file .env diisi dengan variabel lingkungan yang sesuai sebelum menjalankan aplikasi.

Akun admin awal akan dibuat menggunakan script seed. Silakan ubah kredensial default sesuai kebutuhan.

Jika ada masalah atau bug, silakan laporkan melalui tab Issues di repository ini.

Selamat menggunakan Ultigear Backend!
