# Post-Launch & Vercel Deployment Checklist

> The step-by-step master plan to deploy on Vercel, organize GitHub assets, and execute the 7-day social media launch strategy.

---

## 🚀 1. Step-by-Step Vercel Deployment (3 Minutes)

Since you already have Vercel, deploying this project is 100% automated:

### Option A: Via Vercel Dashboard (Recommended)
1. Push your latest code to GitHub:
   ```bash
   git add .
   git commit -m "feat: release Smart Calculator & Converter v1.0.0"
   git push origin main
   ```
2. Open **[Vercel Dashboard](https://vercel.com/new)**.
3. Click **Import Project** and select `01-smart-calculator-and-converter`.
4. Click **Deploy**. Vercel will automatically detect `vercel.json` and Next.js App Router, building your site in ~45 seconds!

### Option B: Via Vercel CLI
```bash
npx vercel --prod
```

---

## 📅 2. 7-Day Social Media Publication Calendar

| Hari | Platform | Jenis Konten | Sumber Berkas |
|---|---|---|---|
| **Hari 1** | LinkedIn & X (Twitter) | Pengumuman Utama Rilis v1.0.0 | `social-media-captions.md` (Bagian 2 & 3) |
| **Hari 2** | Reels / TikTok / Shorts | Video Demonstrasi Produk 45s | `video-script-45s.md` |
| **Hari 3** | LinkedIn & Threads | Perbandingan Visual "Sebelum vs Sesudah" | `social-media-captions.md` (Bagian 5) |
| **Hari 4** | Dev.to / Hashnode / LinkedIn | Tantangan Teknis: Floating Point & AST Parser | `case-study.md` (Bagian 2) |
| **Hari 5** | X (Twitter) / Instagram Story | Cerita Bug Tersulit & Cara Menyelesaikannya | `case-study.md` (Bagian 3) |
| **Hari 6** | Instagram / LinkedIn | Masukan Pengguna dari Soft Launch & Iterasi UX | `launch-checklist.md` |
| **Hari 7** | GitHub Release | Rilis Resmi v1.0.1 (Maintenance Bug Fixes) | `changelog.md` |

---

## 🏷 3. GitHub Repository Optimization Checklist

- [x] Set Repository Description: `Scientific calculator and advanced unit converter with history, memory, precision handling, and responsive interface.`
- [x] Add GitHub Topics:
  `calculator` `unit-converter` `typescript` `react` `nextjs` `portfolio-project` `scientific-calculator`
- [x] Pin repository to your GitHub profile showcase.
- [x] Create GitHub Release `v1.0.0` with tagged commit.

---

## 📂 Summary of Generated Launch Assets:

All launch assets are ready in your repository under `docs/launch-assets/`:
- 📄 [`docs/launch-assets/project-description.md`](project-description.md)
- 📲 [`docs/launch-assets/social-media-captions.md`](social-media-captions.md)
- 🎬 [`docs/launch-assets/video-script-45s.md`](video-script-45s.md)
- 🧠 [`docs/launch-assets/case-study.md`](case-study.md)
- 📋 [`docs/launch-assets/changelog.md`](changelog.md)
- ⚙️ [`vercel.json`](../../vercel.json)
