Untuk memodifikasi kode agar memungkinkan pencarian berdasarkan nama produk, Anda dapat menambahkan parameter kueri untuk kata kunci pencarian pada permintaan, lalu menggunakannya untuk memfilter produk berdasarkan kolom nama. Berikut langkah-langkahnya:

### Kode yang Diperbarui:
```javascript
getAllProducts: async (req, res) => {
    try {
        // Ambil parameter kueri 'search' dari permintaan (jika ada)
        const { search } = req.query;

        // Bangun objek filter untuk kueri
        const filter = search ? { name: { $regex: search, $options: 'i' } } : {};

        // Temukan produk dengan filter pencarian opsional
        const products = await models.Product.find(filter);

        return ResponseAPI.success(res, { products }, 'Produk berhasil diambil');
    } catch (err) {
        return ResponseAPI.serverError(res, err);
    }
},
```

### Penjelasan:
1. **`search`:** Parameter ini diambil dari string kueri permintaan. Jika tersedia, digunakan untuk memfilter produk berdasarkan nama dengan pencocokan parsial (partial match).
2. **`$regex`:** Query ekspresi reguler memungkinkan pencocokan parsial, sedangkan `options: 'i'` membuat pencarian tidak peka huruf besar-kecil (case-insensitive).
3. **`filter`:** Jika tidak ada parameter pencarian, kode akan menggunakan filter kosong `{}`, yang berarti tidak ada penyaringan.

### Contoh Permintaan untuk API:
Misalnya, jika endpoint API Anda adalah `/api/products`, berikut contoh permintaannya:

- **Pencarian dengan kata kunci (misalnya, nama produk mengandung "phone"):**

  ```http
  GET /api/products?search=phone
  ```

- **Permintaan tanpa filter pencarian (mengambil semua produk):**

  ```http
  GET /api/products
  ```

### Contoh Menggunakan `fetch` di JavaScript:
```javascript
// Contoh menggunakan JavaScript Fetch API untuk mengakses endpoint
async function getProducts(searchTerm) {
  const url = new URL('https://your-api-url/api/products');
  if (searchTerm) {
    url.searchParams.append('search', searchTerm);
  }

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
}

// Contoh penggunaan
getProducts('phone');  // Cari produk dengan kata "phone" pada namanya
```

### Kesimpulan:
Kode ini memenuhi kebutuhan Anda untuk menambahkan fungsi pencarian ke API dan menyediakan cara bersih untuk mencari produk berdasarkan nama. Anda dapat memodifikasi lebih lanjut jika perlu, misalnya menambahkan validasi pada input parameter `search`.# UltiGear_BE
