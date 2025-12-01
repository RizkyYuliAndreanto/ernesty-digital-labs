# Ernesty Digital Labs - Invoice Generator

Aplikasi generator invoice modern yang dibangun dengan React + Vite + TypeScript + Tailwind CSS.

## 🚀 Features

- ✅ Generate invoice profesional dengan desain yang menarik
- ✅ Input data klien dan alamat yang dapat diubah
- ✅ Kalkulasi pajak 25% otomatis
- ✅ Export ke PDF dengan kualitas tinggi
- ✅ Responsive design
- ✅ Area tanda tangan dan stempel yang memadai

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **jsPDF** - PDF Generation
- **html2canvas** - HTML to Canvas

## 📦 Installation

1. Clone repository:
```bash
git clone https://github.com/RizkyYuliAndreanto/ernesty-digital-labs.git
cd ernesty-digital-labs
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) di browser

## 🚀 Deployment

### GitHub Pages (Otomatis)

Project ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages:

1. **Push ke branch main** - GitHub Actions akan otomatis build dan deploy
2. **Akses aplikasi** di: `https://rizkyyuliandreanto.github.io/ernesty-digital-labs/`

### Manual Deployment

Jika ingin deploy manual:

```bash
npm run deploy
```

## 📁 Project Structure

```
src/
├── components/
│   ├── InvoiceGenerator.jsx  # Komponen utama untuk input data
│   ├── InvoiceTemplate.jsx   # Template tampilan invoice
│   └── declarations.d.ts     # Type declarations
├── App.jsx                   # Main App component
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 🎨 Usage

1. **Input Data Klien**: Masukkan nama klien dan alamat
2. **Set Invoice Details**: Atur nomor invoice dan tanggal
3. **Tambah Item**: Tambahkan deskripsi layanan dan biaya
4. **Review**: Lihat preview invoice dengan kalkulasi pajak otomatis
5. **Export**: Download invoice sebagai PDF

## ⚙️ Configuration

### Vite Config
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/ernesty-digital-labs/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### GitHub Actions
Workflow otomatis sudah dikonfigurasi di `.github/workflows/deploy.yml` untuk:
- Build project
- Deploy ke GitHub Pages
- Trigger pada push ke branch main

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🏢 Contact

**Ernesty Digital Labs**
- Email: rizkyand995@gmail.com
- Phone: +62 889 9171 5870
- Address: Jl. Marga Jaya No.8, Kanigoro, Kec. Kartoharjo, Kota Madiun, Jawa Timur 63118