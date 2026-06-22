export const siteConfig = {
  name: 'Karang Taruna',
  tagline: 'Semangat Muda, Peduli Sosial',
  description:
    'Organisasi kepemudaan wadah pengembangan generasi muda nonpartisan yang bergerak di bidang kesejahteraan sosial.',
};

export const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Program', href: '/program' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Berita', href: '/berita' },
  { label: 'Kontak', href: '/kontak' },
];

export const stats = [
  { value: 45, suffix: '+', label: 'Anggota Aktif' },
  { value: 12, suffix: '', label: 'Program Unggulan' },
  { value: 7, suffix: '', label: 'Bidang Kegiatan' },
  { value: 200, suffix: '+', label: 'Kegiatan Terselenggara' },
];

export const visi = 'Mewujudkan generasi muda yang beriman, berkarakter, mandiri, dan peduli sosial demi kesejahteraan masyarakat.';

export const misi = [
  'Mengembangkan potensi pemuda melalui pendidikan, pelatihan, dan keterampilan',
  'Meningkatkan peran serta pemuda dalam kegiatan sosial kemasyarakatan',
  'Menumbuhkan jiwa kewirausahaan dan kemandirian ekonomi pemuda',
  'Melestarikan seni budaya dan kearifan lokal',
  'Membangun kesadaran lingkungan dan kepedulian sosial',
  'Memperkuat nilai-nilai keagamaan dan moral generasi muda',
];

export const sejarah = [
  {
    year: '1980',
    title: 'Berdirinya Karang Taruna',
    desc: 'Karang Taruna resmi berdiri pada 26 September 1980 di Kampung Melayu sebagai wadah kegiatan sosial pemuda.',
  },
  {
    year: '2005',
    title: 'Pedoman Dasar',
    desc: 'Permensos No. 83/HUK/2005 diterbitkan sebagai pedoman dasar penyelenggaraan Karang Taruna di seluruh Indonesia.',
  },
  {
    year: '2010',
    title: 'Penguatan Organisasi',
    desc: 'Permensos No. 77/2010 tentang Pedoman Karang Taruna memperkuat kedudukan organisasi di tingkat desa/kelurahan.',
  },
  {
    year: '2020',
    title: 'Transformasi Digital',
    desc: 'Karang Taruna mulai mengadopsi platform digital untuk memperluas dampak dan jangkauan kegiatan sosial.',
  },
  {
    year: '2024',
    title: 'Karang Taruna Masa Kini',
    desc: 'Terus berkembang dengan program-program inovatif yang menjawab tantangan generasi muda di era modern.',
  },
];

export interface Program {
  id: string;
  bidang: string;
  icon: string;
  title: string;
  desc: string;
  activities: string[];
}

export const programs: Program[] = [
  {
    id: 'pendidikan',
    bidang: 'Pendidikan & Pelatihan',
    icon: '🎓',
    title: 'Pendidikan & Pelatihan',
    desc: 'Mengembangkan kapasitas intelektual dan keterampilan pemuda melalui berbagai program pendidikan dan pelatihan.',
    activities: ['Bimbingan belajar gratis', 'Pelatihan kepemimpinan', 'Workshop keterampilan digital', 'Seminar karier dan pendidikan'],
  },
  {
    id: 'uks',
    bidang: 'Usaha Kesejahteraan Sosial',
    icon: '🤝',
    title: 'Usaha Kesejahteraan Sosial',
    desc: 'Menggerakkan kegiatan ekonomi produktif dan kesejahteraan sosial bagi masyarakat sekitar.',
    activities: ['Bazar UMKM pemuda', 'Donasi dan bakti sosial', 'Program beasiswa', 'Bank sampah'],
  },
  {
    id: 'kub',
    bidang: 'Kelompok Usaha Bersama',
    icon: '💼',
    title: 'Kelompok Usaha Bersama',
    desc: 'Mendorong kewirausahaan pemuda melalui kelompok usaha bersama yang berkelanjutan.',
    activities: ['Koperasi pemuda', 'Pelatihan wirausaha', 'Inkubasi bisnis muda', 'Pasar kreatif pemuda'],
  },
  {
    id: 'kerohanian',
    bidang: 'Kerohanian & Mental',
    icon: '🕌',
    title: 'Kerohanian & Mental',
    desc: 'Memperkuat fondasi spiritual dan kesehatan mental generasi muda.',
    activities: ['Kajian rutin', 'Konseling sebaya', 'Kegiatan keagamaan', 'Retreat pengembangan diri'],
  },
  {
    id: 'olahraga',
    bidang: 'Olahraga & Seni Budaya',
    icon: '🏅',
    title: 'Olahraga & Seni Budaya',
    desc: 'Menyalurkan bakat dan minat pemuda di bidang olahraga, seni, dan pelestarian budaya.',
    activities: ['Turnamen olahraga', 'Pentas seni budaya', 'Pelatihan tari tradisional', 'Festival musik daerah'],
  },
  {
    id: 'lingkungan',
    bidang: 'Lingkungan Hidup',
    icon: '🌱',
    title: 'Lingkungan Hidup',
    desc: 'Membangun kesadaran dan aksi nyata dalam pelestarian lingkungan hidup.',
    activities: ['Penghijauan dan reboisasi', 'Bersih-bersih lingkungan', 'Edukasi daur ulang', 'Kampanye hijau'],
  },
  {
    id: 'humas',
    bidang: 'Hubungan Masyarakat',
    icon: '📢',
    title: 'Hubungan Masyarakat',
    desc: 'Menjalin komunikasi dan kerjasama dengan berbagai pihak untuk kemajuan organisasi.',
    activities: ['Media sosial dan publikasi', 'Kerjasama antar lembaga', 'Kegiatan kolaborasi', 'Advokasi pemuda'],
  },
];

export interface Pengurus {
  jabatan: string;
  nama: string;
}

export const strukturPengurus: Pengurus[] = [
  { jabatan: 'Pembina', nama: 'Kepala Desa / Lurah' },
  { jabatan: 'Ketua', nama: 'Ahmad Rizaldi' },
  { jabatan: 'Wakil Ketua', nama: 'Siti Nurhaliza' },
  { jabatan: 'Sekretaris', nama: 'Bambang Prasetyo' },
  { jabatan: 'Wakil Sekretaris', nama: 'Dewi Kartika' },
  { jabatan: 'Bendahara', nama: 'Rina Maulida' },
  { jabatan: 'Wakil Bendahara', nama: 'Fajar Ramadhan' },
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Karang Taruna Gelar Pelatihan Kepemimpinan Pemuda Tingkat Desa',
    date: '15 Juni 2026',
    category: 'Pendidikan',
    excerpt: 'Kegiatan pelatihan kepemimpinan ini diikuti oleh 45 pemuda dari berbagai dusun dengan materi mulai dari public speaking hingga manajemen organisasi.',
  },
  {
    id: '2',
    title: 'Sukses! Bazar UMKM Pemuda Raup Omzet Lebih dari 50 Juta',
    date: '8 Juni 2026',
    category: 'UKS',
    excerpt: 'Bazar UMKM yang diselenggarakan Karang Taruna berhasil menarik ratusan pengunjung dan memberdayakan puluhan pelaku usaha muda.',
  },
  {
    id: '3',
    title: 'Kerja Bakti Massal: Menanam 1000 Pohon untuk Masa Depan',
    date: '1 Juni 2026',
    category: 'Lingkungan',
    excerpt: 'Karang Taruna bersama warga dan komunitas pecinta lingkungan menanam seribu pohon di lahan kritis sekitar desa.',
  },
  {
    id: '4',
    title: 'Festival Seni Budaya Meriahkan HUT Karang Taruna ke-46',
    date: '25 Mei 2026',
    category: 'Seni Budaya',
    excerpt: 'Pertunjukan tari tradisional, musik daerah, dan pameran seni mewarnai perayaan ulang tahun Karang Taruna tahun ini.',
  },
  {
    id: '5',
    title: 'Pelatihan Digital Marketing untuk Pemuda Desa',
    date: '18 Mei 2026',
    category: 'Pendidikan',
    excerpt: 'Pemuda desa dibekali keterampilan digital marketing untuk mengembangkan usaha online dan memasarkan produk UMKM secara digital.',
  },
  {
    id: '6',
    title: 'Karang Taruna Gelar Lomba Olahraga Antar Dusun',
    date: '10 Mei 2026',
    category: 'Olahraga',
    excerpt: 'Semarak pertandingan voli, sepak bola, dan bulu tangkis antar dusun mempererat tali silaturahmi warga.',
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
}

export const galleryItems: GalleryItem[] = [
  { id: '1', src: '', title: 'Pelatihan Kepemimpinan', category: 'Pendidikan' },
  { id: '2', src: '', title: 'Bazar UMKM Pemuda', category: 'UKS' },
  { id: '3', src: '', title: 'Penanaman Pohon', category: 'Lingkungan' },
  { id: '4', src: '', title: 'Festival Seni Budaya', category: 'Seni Budaya' },
  { id: '5', src: '', title: 'Kajian Rutin Pemuda', category: 'Kerohanian' },
  { id: '6', src: '', title: 'Turnamen Olahraga', category: 'Olahraga' },
  { id: '7', src: '', title: 'Bakti Sosial', category: 'UKS' },
  { id: '8', src: '', title: 'Workshop Digital', category: 'Pendidikan' },
  { id: '9', src: '', title: 'Pentas Tari Tradisional', category: 'Seni Budaya' },
];

export const contactInfo = {
  alamat: 'Jl. Karang Taruna No. 123, RT 01 RW 02, Desa/Kelurahan, Kecamatan, Kota, Provinsi 12345',
  email: 'info@karangtaruna.or.id',
  telepon: '(021) 1234-5678',
  whatsapp: '0812-3456-7890',
  social: {
    instagram: '@karangtaruna_official',
    youtube: 'Karang Taruna TV',
    facebook: 'Karang Taruna Indonesia',
    tiktok: '@karangtaruna',
  },
};
