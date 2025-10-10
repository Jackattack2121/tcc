# The Culinary Creative - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `JWT_SECRET` - For admin authentication
- `RESEND_API_KEY` - For email functionality
- `BLOB_READ_WRITE_TOKEN` - For image uploads to Vercel Blob Storage

### 3. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Uploading Images to Gallery

### Step 1: Get Vercel Blob Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** → **Create Database** → **Blob**
4. Copy the `BLOB_READ_WRITE_TOKEN` from the `.env.local` tab
5. Add it to your `.env` file

### Step 2: Add Images to Upload

Place your images in the `public/images/` folder:

```bash
# Images are already there! Check:
ls public/images/
```

### Step 3: Run Upload Script

```bash
pnpm run upload-images
```

This will:
- Upload all images from `public/images/` to Vercel Blob Storage
- Create `uploaded.json`, `urls.txt`, and `urls.csv` with the URLs
- Organize images under `gallery/YYYY-MM-DD/` prefix

### Step 4: Add URLs to Gallery

1. Open `urls.txt` to see all uploaded image URLs
2. Copy the URLs
3. Add them to `/app/page.tsx` in the `latestImages` array:

```typescript
const latestImages = [
  "https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/High res-2.jpg",
  "https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/High res-4.jpg",
  // ... add more URLs here
  // ... existing images below
]
```

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm upload-images` - Upload images to Vercel Blob Storage

## 📁 Project Structure

```
culinary-creative/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main homepage (gallery is here)
│   ├── admin/             # Admin pages
│   └── api/               # API routes
├── components/            # React components
│   ├── infinite-carousel.tsx
│   ├── content-card.tsx
│   └── card-contents/     # Modal content components
├── public/
│   └── images/            # Local images to upload
├── upload-images-to-vercel.js  # Image upload script
├── UPLOAD-IMAGES-README.md     # Detailed upload guide
└── .env                   # Environment variables (not in git)
```

## 🐛 Troubleshooting

### Hydration Errors
The hydration errors have been fixed! The app now:
- Uses `mounted` state to prevent server/client mismatches
- Delays random shuffling until after client hydration

### Upload Script Issues
If the upload script fails:
1. Check that `BLOB_READ_WRITE_TOKEN` is set in `.env`
2. Verify images exist in `public/images/`
3. Make sure you're logged into Vercel CLI: `vercel login`

### Build Errors
TypeScript errors are ignored during builds (see `next.config.mjs`).

## 🌐 Deployment

### Deploy to Vercel

```bash
vercel
```

Or push to GitHub and connect the repository in Vercel Dashboard.

### Environment Variables on Vercel

Make sure to add all environment variables from `.env` to your Vercel project settings.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Framer Motion](https://www.framer.com/motion/)
