# The Culinary Creative - Next.js Website

A modern, responsive website for The Culinary Creative, featuring private chef services and gourmet catering in Adelaide, South Australia.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd culinary-creative
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values if needed
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
culinary-creative/
├── app/                    # Next.js 13+ App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   ├── card-contents/    # Content for popup cards
│   ├── content-card.tsx  # Main content card component
│   ├── infinite-carousel.tsx # Carousel component
│   └── ...
├── lib/                  # Utility functions
├── hooks/               # Custom React hooks
├── public/              # Static assets
└── styles/              # Additional stylesheets
```

## 🛠 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Features

- **Modern Design**: Clean, responsive design with smooth animations
- **Image Galleries**: Interactive photo galleries with modal views
- **Video Content**: Embedded video content showcasing culinary work
- **SEO Optimized**: Comprehensive metadata and structured data
- **Mobile Responsive**: Optimized for all device sizes
- **Performance**: Optimized images and lazy loading

## 🧩 Key Components

- **InfiniteCarousel**: Horizontal scrolling carousel for content
- **ContentCard**: Reusable card component for services and images
- **PhotoModal**: Full-screen image viewer
- **Gallery**: Interactive photo gallery
- **SchemaMarkup**: Structured data for SEO

## 🔧 Configuration

### Next.js Config
The project uses Next.js 15 with:
- App Router
- TypeScript
- Image optimization disabled for external images
- ESLint and TypeScript errors ignored during builds (for development)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

## 📧 Contact & Services

The Culinary Creative offers:
- Private Chef Services
- Corporate Food Events
- Chef's Table Experiences
- Bespoke Catering
- Grazing Tables & Canapés

**Contact**: jamie@theculinarycreative.com.au
**Website**: https://www.theculinarycreative.com.au

## 🤝 Development

Built with modern web technologies:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI components

---

*Website designed by [Luxe & Lens Co](https://www.luxeandlens.co)*
