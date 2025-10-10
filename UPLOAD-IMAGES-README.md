# Image Upload Script for Vercel Blob Storage

This script uploads images from your local `public/images` folder to Vercel Blob Storage.

## 📋 Prerequisites

1. **Vercel Account** - You need a Vercel account with Blob Storage enabled
2. **Vercel CLI** - Install globally: `npm install -g vercel`
3. **Environment Variables** - Your `.env` file needs `BLOB_READ_WRITE_TOKEN`

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install @vercel/blob fast-glob
```

### Step 2: Create Images Folder

Create the folder where you'll place your images:

```bash
mkdir -p public/images
```

### Step 3: Add Your Images

Copy all the images you want to upload into `public/images/`

### Step 4: Set Up Vercel Blob Storage

1. Go to your Vercel dashboard
2. Select your project
3. Go to Storage → Create Database → Blob
4. Copy the `BLOB_READ_WRITE_TOKEN` from the `.env.local` tab
5. Add it to your `.env` file:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

## 📤 Running the Upload Script

### Option 1: Using npm script (Recommended)

```bash
npm run upload-images
```

### Option 2: Direct node command

```bash
node upload-images-to-vercel.js
```

## 📁 Output Files

After running, the script creates three files in your project root:

1. **uploaded.json** - Full metadata about uploaded files
2. **urls.txt** - List of public URLs (one per line)
3. **urls.csv** - CSV with filename and URL columns

## 🎯 What It Does

- Scans `public/images/` for all image files (.jpg, .jpeg, .png, .webp, .gif, .svg)
- Uploads them to Vercel Blob Storage under `gallery/YYYY-MM-DD/`
- Makes all files publicly accessible
- Logs progress for each file
- Generates output files with URLs

## 🔧 Customization

Edit `upload-images-to-vercel.js` to change:

- **FOLDER** - Source folder path (default: `./public/images`)
- **PREFIX** - Blob storage prefix (default: `gallery/YYYY-MM-DD/`)
- **PUBLIC** - Access level (default: `true`)

## 📝 Example Output

```
🚀 Uploading 5 images from ./public/images to Vercel Blob Storage...
📁 Prefix: gallery/2025-10-10/

✅ photo1.jpg → https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/photo1.jpg
✅ photo2.jpg → https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/photo2.jpg
...

🎉 Upload complete! 5 files uploaded.
→ Created uploaded.json, urls.txt, and urls.csv in project root.
```

## 🔗 Adding URLs to Your Gallery

After uploading, copy the URLs from `urls.txt` and add them to the `latestImages` array in `/app/page.tsx`:

```typescript
const latestImages = [
  "https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/photo1.jpg",
  "https://xxxxx.public.blob.vercel-storage.com/gallery/2025-10-10/photo2.jpg",
  // ... existing images
]
```

## ⚠️ Important Notes

- Output files (`uploaded.json`, `urls.txt`, `urls.csv`) are gitignored
- Images are uploaded with their original filenames
- No random suffix is added to filenames
- All uploads are public by default
- The script will fail if `BLOB_READ_WRITE_TOKEN` is not set
