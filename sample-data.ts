/**
 * Data contoh untuk diisi manual ke admin dashboard Kalana Akademik.
 * File ini HANYA referensi — tidak dipakai/di-import oleh aplikasi,
 * dan sengaja diletakkan di luar folder src/ agar tidak ikut di-build.
 *
 * Field seperti id, order, createdAt tidak dicantumkan karena otomatis
 * diisi sistem saat Anda menambahkan data lewat form admin.
 *
 * Kategori (label/slug) di bawah ini mengikuti kategori bawaan yang bisa
 * dimuat lewat tombol "Muat Kategori Bawaan" di /admin/kategori:
 * Program & Bank Soal -> sd, smp, sma, utbk, olimpiade
 * Artikel              -> tips-belajar, utbk, olimpiade, berita-kalana
 */

// ─────────────────────────────────────────
// PROGRAM  (/admin/program)
// Field: label, title, description, images, points, daftarLink
// ─────────────────────────────────────────
export const SAMPLE_PROGRAM = [
  {
    label: "sd",
    title: "Bimbingan Belajar SD",
    description:
      "Membangun fondasi belajar yang kuat untuk siswa SD lewat pendekatan yang menyenangkan dan mudah dipahami.",
    points: [
      "Kurikulum sesuai jenjang kelas 1-6 SD",
      "Kelas kecil, maksimal 8 siswa",
      "Laporan perkembangan belajar tiap bulan",
    ],
    daftarLink: "https://forms.gle/ganti-dengan-link-form-anda",
  },
  {
    label: "smp",
    title: "Bimbingan Belajar SMP",
    description:
      "Pendampingan belajar seluruh mata pelajaran SMP dengan tutor berpengalaman.",
    points: [
      "Persiapan ujian sekolah & PTS/PAS",
      "Latihan soal rutin setiap minggu",
      "Konsultasi PR kapan saja",
    ],
    daftarLink: "https://forms.gle/ganti-dengan-link-form-anda",
  },
  {
    label: "sma",
    title: "Bimbingan Belajar SMA",
    description:
      "Pendalaman materi SMA lintas jurusan untuk mempersiapkan siswa menghadapi ujian sekolah dan seleksi PTN.",
    points: [
      "Materi sesuai kurikulum terbaru",
      "Try out berkala",
      "Bimbingan konseling akademik",
    ],
    daftarLink: "https://forms.gle/ganti-dengan-link-form-anda",
  },
  {
    label: "utbk",
    title: "Persiapan UTBK",
    description:
      "Program intensif persiapan UTBK-SNBT dengan strategi pengerjaan soal dan simulasi ujian.",
    points: [
      "Pembahasan tuntas TPS & Literasi",
      "Simulasi UTBK berbasis komputer",
      "Analisis skor & strategi pemilihan jurusan",
    ],
    daftarLink: "https://forms.gle/ganti-dengan-link-form-anda",
  },
  {
    label: "olimpiade",
    title: "Olimpiade Sains",
    description:
      "Pembinaan intensif untuk siswa yang ingin berprestasi di ajang olimpiade sains tingkat kabupaten hingga nasional.",
    points: [
      "Pembina berpengalaman juri & alumni olimpiade",
      "Modul soal tingkat OSN",
      "Kelas pendalaman per bidang studi",
    ],
    daftarLink: "https://forms.gle/ganti-dengan-link-form-anda",
  },
]

// ─────────────────────────────────────────
// ARTIKEL  (/admin/artikel)
// Field: kategori, title, image, description
// ─────────────────────────────────────────
export const SAMPLE_ARTIKEL = [
  {
    kategori: "tips-belajar",
    title: "5 Cara Efektif Membagi Waktu Belajar dan Istirahat",
    description:
      "Manajemen waktu yang baik adalah kunci belajar efektif. Simak tips praktis membagi waktu belajar dan istirahat.",
  },
  {
    kategori: "utbk",
    title: "Strategi Mengerjakan Soal TPS UTBK dalam Waktu Terbatas",
    description:
      "Kenali pola soal TPS dan strategi manajemen waktu agar bisa menjawab lebih banyak soal dengan akurat.",
  },
  {
    kategori: "olimpiade",
    title: "Persiapan Menghadapi OSN: Pengalaman Alumni",
    description:
      "Alumni peraih medali OSN berbagi cerita dan tips persiapan menghadapi kompetisi.",
  },
  {
    kategori: "berita-kalana",
    title: "Kalana Akademik Buka Kelas Baru Semester Ini",
    description:
      "Kabar terbaru seputar kelas dan program baru yang dibuka Kalana Akademik semester ini.",
  },
]

// ─────────────────────────────────────────
// BANK SOAL  (/admin/bank-soal)
// Field: label, title, description, link
// ─────────────────────────────────────────
export const SAMPLE_BANKSOAL = [
  {
    label: "sd",
    title: "Kumpulan Soal Matematika SD",
    description: "Latihan soal matematika kelas 1-6 SD lengkap dengan pembahasan.",
    link: "https://drive.google.com/ganti-dengan-link-file-anda",
  },
  {
    label: "smp",
    title: "Kumpulan Soal IPA SMP",
    description: "Bank soal IPA Terpadu untuk persiapan ujian sekolah SMP.",
    link: "https://drive.google.com/ganti-dengan-link-file-anda",
  },
  {
    label: "sma",
    title: "Kumpulan Soal Matematika Peminatan SMA",
    description: "Latihan soal matematika peminatan untuk siswa SMA.",
    link: "https://drive.google.com/ganti-dengan-link-file-anda",
  },
  {
    label: "utbk",
    title: "Latihan Soal TPS & Literasi UTBK",
    description: "Kumpulan soal UTBK-SNBT lengkap dengan pembahasan.",
    link: "https://drive.google.com/ganti-dengan-link-file-anda",
  },
  {
    label: "olimpiade",
    title: "Soal Olimpiade Sains Tingkat Kabupaten",
    description: "Bank soal olimpiade sains untuk latihan mandiri siswa.",
    link: "https://drive.google.com/ganti-dengan-link-file-anda",
  },
]

// ─────────────────────────────────────────
// FAQ  (/admin/faq)
// Field: question, answer
// ─────────────────────────────────────────
export const SAMPLE_FAQ = [
  {
    question: "Bagaimana cara mendaftar di Kalana Akademik?",
    answer:
      'Anda bisa mendaftar lewat tombol "Daftar Sekarang" di bagian atas halaman, lalu mengisi Google Form atau menghubungi kami via WhatsApp.',
  },
  {
    question: "Apakah ada kelas trial sebelum mendaftar?",
    answer:
      "Ya, kami menyediakan sesi konsultasi gratis. Hubungi tim kami via WhatsApp untuk informasi lebih lanjut.",
  },
  {
    question: "Apa saja metode pembelajaran yang digunakan?",
    answer:
      "Kami menggunakan kombinasi tatap muka, latihan soal rutin, dan evaluasi berkala untuk memastikan pemahaman siswa.",
  },
]

// ─────────────────────────────────────────
// TESTIMONI  (/admin/testimoni)
// Field: name, role, message, image (opsional), rating (1-5, opsional)
// ─────────────────────────────────────────
export const SAMPLE_TESTIMONI = [
  {
    name: "Rina Ananda",
    role: "Siswa SMA, Peserta UTBK",
    message:
      "Berkat bimbingan Kalana Akademik, saya berhasil diterima di jurusan impian lewat jalur UTBK.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "Orang Tua Siswa SMP",
    message:
      "Anak saya jadi lebih percaya diri dan nilainya meningkat sejak ikut bimbingan di sini.",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Siswa SD",
    message: "Belajarnya seru, kakak pengajarnya sabar banget jelasinnya.",
    rating: 4,
  },
]

// ─────────────────────────────────────────
// GALERI  (/admin/galeri)
// Field: image, caption (opsional)
// ─────────────────────────────────────────
export const SAMPLE_GALERI = [
  { caption: "Kegiatan belajar kelompok" },
  { caption: "Try out UTBK" },
  { caption: "Pembinaan olimpiade sains" },
]
