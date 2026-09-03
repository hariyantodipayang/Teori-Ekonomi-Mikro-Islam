# Peta Alur Mikro Islam

Situs statis (HTML/CSS/JS murni, tanpa build tool) berisi peta alur belajar
**Teori Ekonomi Mikro Islam (ESY81302)** — dari landasan filosofis tauhid dan
maslahah, teori konsumen dan produsen Muslim, mekanisme pasar dan harga adil,
struktur pasar dan etika transaksi, hingga distribusi kekayaan dan keadilan
sosial.

- `index.html` — peta alur utama, bisa disaring per modul, setiap entri
  menaut ke halaman detailnya.
- `topics/` — 24 halaman detail (konteks & penjelasan, poin-poin kunci,
  literatur utama, relevansi & keterkaitan, rujukan jurnal), lengkap dengan
  navigasi sebelumnya/selanjutnya mengikuti urutan pedagogis modul.
- `topics/bedah-*.html` — halaman **bedah rujukan**: kajian mendalam yang
  membedah sumber-sumber sebuah topik satu per satu (identitas sumber, isi
  pokok, bacaan analitis, kekuatan & keterbatasan), lalu menyintesiskannya dan
  menambal apa yang tidak dibahas sumber-sumber itu. Halaman ini tidak muncul
  di peta alur; ia ditaut dari halaman topik induknya lewat kartu `.deep-dive`
  dan tautan `.pagenav`. Yang sudah ada:
  `bedah-paradigma-ekonomi-islam.html` (topik 1.1).
- `assets/style.css`, `assets/script.js` — gaya dan interaksi (filter modul)
  yang dipakai bersama seluruh halaman.

Tidak ada dependensi build (tidak perlu `npm install`) — situs ini murni
HTML statis, siap diterbitkan langsung sebagai GitHub Pages.

## Cara menerbitkan ke GitHub Pages

**Opsi A — repo baru, file di root (paling sederhana)**

1. Buat repository baru di GitHub, misalnya `mikro-ekonomi-islam`.
2. Unggah seluruh isi folder ini (`index.html`, `assets/`, `topics/`,
   `README.md`) ke root repository tersebut — lewat web GitHub ("Add file →
   Upload files") atau lewat `git`:
   ```bash
   git init
   git add .
   git commit -m "Publish peta alur teori ekonomi mikro Islam"
   git branch -M main
   git remote add origin https://github.com/<username>/mikro-ekonomi-islam.git
   git push -u origin main
   ```
3. Di repo tersebut buka **Settings → Pages**.
4. Pada **Build and deployment → Source**, pilih **Deploy from a branch**.
5. Pada **Branch**, pilih `main` dan folder `/ (root)`, lalu **Save**.
6. Tunggu 1-2 menit — GitHub akan menampilkan URL live, biasanya:
   `https://<username>.github.io/mikro-ekonomi-islam/`

**Opsi B — menambahkan ke repo yang sudah ada (folder `/docs`)**

Jika sudah punya repository lain dan ingin menambahkan situs ini sebagai
bagian dari repo tersebut tanpa mengganggu isi root:

1. Salin seluruh isi folder ini ke dalam folder `docs/` di repo tersebut.
2. Commit & push seperti biasa.
3. Di **Settings → Pages → Branch**, pilih branch yang sesuai dan folder
   `/docs`, lalu **Save**.

**Opsi C — satu repo untuk semua mata kuliah**

Karena situs ini dan situs "Sejarah dan Pemikiran Ekonomi Islam" memakai
struktur yang sama, keduanya juga bisa digabung dalam satu repository, masing-
masing di subfolder sendiri (misalnya `/sejarah` dan `/mikro`), dengan sebuah
`index.html` penghubung di root yang menaut ke keduanya.

## Menambah atau mengubah entri

Karena situs ini statis, cara paling gampang menambah entri baru adalah
menduplikasi salah satu file di `topics/`, mengganti isinya, lalu menambahkan
kartu tautan baru ke `index.html` pada bagian `<section class="era" ...>`
yang sesuai (ikuti pola `<a class="entry-link" href="topics/nama-file.html"
data-era="...">...</a>` yang sudah ada). Jangan lupa memperbarui tautan
"Sebelumnya / Selanjutnya" (`.pagenav`) pada halaman sebelum dan sesudahnya
agar urutan modul tetap tersambung.

## Berkas pendamping

File `Rincian_Materi_Teori_Ekonomi_Mikro_Islam.xlsx` (di folder mata kuliah
yang sama, di luar situs ini) memuat rincian materi per modul, kata kunci
riset, peta konsep ringkas, dan daftar lengkap jurnal pendukung dengan
tautannya.

Oleh Hariyanto Mahasiswa Magister Ekonomi Syariah IAIN Curup
