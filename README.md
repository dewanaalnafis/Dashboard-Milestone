# OKR Dashboard - PT Raja Sukses Propertindo

Dashboard untuk tracking OKR berbasis Milestone untuk divisi R&D dan Pabrikasi.

## 📁 File Structure

```
project/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── data.js            # Milestone & OKR data
├── milestone.js       # Milestone timeline functions
├── okr-cards.js       # OKR health cards generation
├── wbs-tracking.js    # WBS & task tracking with expandable details
├── modal.js           # Add OKR modal functions
└── app.js             # Initialization
```

## 🚀 Cara Menggunakan

### Option 1: Buka Langsung di Browser
1. Download semua file ke folder yang sama
2. Double-click `index.html`
3. Dashboard akan terbuka di browser

### Option 2: VS Code + Live Server
1. Buka folder project di VS Code
2. Install extension "Live Server"
3. Right-click `index.html` > "Open with Live Server"

### Option 3: GitHub Pages
1. Commit semua file ke GitHub repository
2. Settings > Pages > Deploy from main branch
3. Dashboard akan accessible via URL GitHub Pages

## 📊 Fitur Dashboard

### 1. Milestone Timeline
- **Multi-row per kategori** (bukan 1 row)
- Kategori R&D:
  * Profitability RnD
  * Pembangunan Rumah - Riset Metode
  * Pembangunan Rumah - Riset Product
  * Pembangunan Infra - Riset Product

- Kategori Pabrikasi:
  * Timeline OKR Pabrik - Alat Produksi
  * Timeline OKR Pabrik - Infrastruktur
  * Timeline OKR Pabrik - SDM
  * Operation Perspective - Target Produksi (4 rows)

- **Data lengkap 12 bulan** sesuai Excel RSP_Milestone.xlsx
- Klik cell bulan untuk filter OKR

### 2. OKR Health Overview
- Card horizontal untuk setiap OKR di bulan terpilih
- Metrics:
  * Completion rate
  * Tasks done/total
  * WBS breakdown dengan progress bar
  * Health status (Sehat/Perlu Perhatian/Kritis)

### 3. WBS Tracking & Task Management
- **Expandable WBS** - klik untuk show/hide tasks
- **Expandable Task Detail** - klik task untuk show/hide:
  * 🚨 Issue/Kendala (wajib untuk Late/Potential Late)
  * ✅ Yang Sudah Dilakukan PIC
  * 📋 Yang Akan Dilakukan (Action Plan)
- Update task dengan modal form
- Button color:
  * 🔴 Red = Late (urgent)
  * 🟡 Yellow = Potential Late (warning)
  * 🟣 Purple = Normal

### 4. Add OKR
- Input: Judul OKR, Divisi, Bulan, Kategori
- Dynamic WBS builder
- Dynamic Task builder per WBS
- Judul OKR muncul di milestone cell yang sesuai

## 📝 Data Dummy

### Februari 2025:
- **R&D**: 1 OKR (Improvement Trial 15 hari) - 6 tasks
  * Status: 2 done, 1 potential late, 1 on-track, 2 not-yet
  * Ada contoh issue & action plan

- **Pabrikasi**: 2 OKR
  * Hoist Installation - 6 tasks (4 done)
  * SDM Recruitment - 6 tasks (3 done, 1 late dengan issue)

### Maret 2025:
- **R&D**: 1 OKR (SOP & Training) - 6 tasks (all not-yet)
- **Pabrikasi**: 2 OKR
  * Batching Plant - 9 tasks (all not-yet)
  * Warehouse, Listrik, Plumbing - 9 tasks (all not-yet)

## 🎨 Cara Kustomisasi

### Menambah OKR Baru
1. Klik "Add OKR" button
2. Isi form (Judul, Divisi, Bulan, Kategori)
3. Add WBS (minimal 1)
4. Add Task per WBS (minimal 1)
5. Save → OKR muncul di milestone & dashboard

### Edit Data Manual (data.js)
```javascript
// Tambah OKR ke bulan baru
okrData.rnd[4] = [ // April
    {
        id: 'rnd-apr-1',
        name: 'Nama OKR',
        month: 4,
        // ... dst
    }
];
```

### Tambah Kategori Milestone Baru
Edit `data.js` di bagian `milestoneData`:
```javascript
milestoneData.rnd.push({
    category: 'Kategori Baru',
    label: 'Deskripsi',
    months: {
        1: 'Activity Jan',
        2: 'Activity Feb',
        // ... dst
    }
});
```

## 🔄 Workflow Update Task

1. **Klik WBS** → Show semua tasks
2. **Klik Task Row** → Show detail (issue, action done, action plan)
3. **Klik Update Button** → Modal form
4. **Isi Form**:
   - Status (required)
   - Progress % (required)
   - Issue (wajib jika Late/Potential Late)
   - Action Done
   - Action Plan
5. **Save** → Dashboard refresh otomatis

## 📱 Responsive Design
- Desktop optimal
- Mobile/tablet: horizontal scroll untuk timeline

## 🐛 Troubleshooting

### Dashboard tidak muncul
- Pastikan semua 8 file ada di folder yang sama
- Buka browser console (F12) untuk cek error

### Data tidak muncul
- Cek `data.js` format JSON benar
- Pastikan month number sesuai (1-12)

### Add OKR tidak berfungsi
- Pastikan isi minimal 1 WBS dengan 1 task
- Cek kategori milestone sesuai dengan yang ada

## 🔧 Technical Stack
- Pure HTML/CSS/JavaScript (no framework)
- No backend required
- LocalStorage bisa ditambahkan untuk persistence

## 📞 Support
Untuk modifikasi lebih lanjut, edit file sesuai kebutuhan:
- `data.js` → Data milestone & OKR
- `styles.css` → Styling & layout
- `wbs-tracking.js` → Logic task detail expansion
- `modal.js` → Add OKR form logic
