# 🎨 July Graffiti Archive | জুলাই গ্রাফিতি আর্কাইভ (2024 Uprising)

> **"Walls of July: A photographic record and digital archive of the street art, murals, and calligraphy left behind after the July 2024 Bangladesh Revolution."**

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-rose.svg)](LICENSE)
[![Framework: Svelte 5](https://img.shields.io/badge/Framework-Svelte_5-orange.svg)](https://svelte.dev)
[![Styling: Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind_v4-blue.svg)](https://tailwindcss.com)

---

## 📌 Project Overview

During the historic **July 2024 Student-People Uprising in Bangladesh**, walls, flyover pillars, and campus boundaries across the nation were transformed into vibrant, fearless canvases of democracy, remembrance, and resistance. 

The **July Graffiti Archive** is an open-access, non-commercial digital preservation project designed to catalogue, document, and preserve these street art masterpieces in high-definition digital formats before physical weathering or urban repaint occurs.

---

## ✨ Key Features

- 🎞️ **Full-Bleed Hero Carousel**: Editorial hero banner ("Walls of July") cycling through featured murals with smooth transitions, autoplay control, and keyboard/button chevrons.
- 🖼️ **Natural Aspect-Ratio Masonry Grid**: Masonry photo layout keeping the un-cropped composition of every vertical and horizontal mural.
- 🏷️ **On-Image Metadata Overlays**:
  - Top-left translucent **React Heart Badge** (`❤️ count`) with local persistence.
  - Bottom gradient overlay displaying **Location**, **Bengali Title**, and **Date Painted** (*অঙ্কিত: ২০২৪*).
- 🔍 **Advanced Browse Catalog (`/browse`)**: Full catalog view supporting real-time search, category chips (*Resistance*, *Martyrs Tribute*, *Unity*, *Calligraphy*, *Satire*), district filtering, and sorting (*Most Liked*, *Alphabetical*).
- 🔍 **Fullscreen Lightbox Modal**: High-res detail viewer with click-to-zoom, historical context in English and Bengali, slogan callouts, share links, and arrow keyboard navigation (`Esc`, `←`, `→`).
- 📍 **Geographic Map Explorer**: Interactive district filter covering Dhaka (TSC, Shaheed Minar, Mirpur, Science Lab, Uttara), Rangpur (BRUR), Chittagong, Rajshahi, Sylhet, Khulna, and Savar.
- 📤 **Community Submissions (`/submit`)**: Dedicated upload portal for citizens and photographers to contribute photos and metadata.
- 🤝 **Project Support & Mission (`/support`, `/about`)**: Dedicated pages highlighting the open-access preservation mission and volunteer opportunities.

---

## 🛠️ Technology Stack

- **Framework**: [Svelte 5](https://svelte.dev) (utilizing `$state`, `$derived`, and `$effect` runes)
- **Application Routing**: [SvelteKit 2](https://svelte.dev/docs/kit)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom Glassmorphism & Typography Utilities
- **Typography**: 
  - `Playfair Display` (Hero Headline Serif)
  - `Hind Siliguri` (Bengali Typography)
  - `Permanent Marker` (Graffiti Accents)
  - `Outfit` (Modern Sans UI)
- **Build System**: [Vite 8](https://vitejs.dev)

---

## 📁 Repository Structure

```text
JulyGrafityWeb/
├── pictures/               # Raw high-resolution mural image files
├── static/
│   └── pictures/           # Served image assets (mural-01.jpg ... mural-15.jpg)
├── src/
│   ├── app.html            # HTML shell with Google Fonts & SEO metadata
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Navbar.svelte         # Primary navigation bar
│   │   │   ├── Hero.svelte           # Full-bleed Hero Carousel
│   │   │   ├── GraffitiCard.svelte   # Natural aspect ratio overlay item
│   │   │   ├── GraffitiModal.svelte  # Fullscreen Lightbox viewer
│   │   │   ├── MapExplorer.svelte    # Geographic district filter
│   │   │   ├── AboutSection.svelte   # Historical overview component
│   │   │   ├── TeamSection.svelte    # Contributor & developer team showcase
│   │   │   └── Footer.svelte         # Footer with tribute statement
│   │   └── data/
│   │       └── graffiti.js           # Archived graffiti dataset
│   └── routes/
│       ├── +page.svelte              # Home Page (Carousel, Top-12 Showcase, Map)
│       ├── browse/+page.svelte       # Full Catalog & Advanced Filters
│       ├── about/+page.svelte        # Dedicated History & Mission Page
│       ├── submit/+page.svelte       # Dedicated Photo Submission Page
│       ├── submissions/+page.svelte  # Submissions Status Tracking & Moderator Hub
│       ├── contributors/+page.svelte # Contributor Directory & Stats
│       ├── contact/+page.svelte      # Contact & Feedback Form
│       └── support/+page.svelte      # Dedicated Project Support Page
├── LICENSE                           # Creative Commons Attribution 4.0 International
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/JulyGrafityWeb.git
   cd JulyGrafityWeb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## ⚖️ Archival Purpose & Disclaimer

This platform is a **personal and community-driven initiative** built strictly for non-commercial archiving, memory preservation, and public education.

- **Non-Commercial Archiving**: This site operates with zero profit motive, zero monetization, and zero advertisements. Its purpose is to preserve the morale, spirit, and artistic expressions of the July 2024 movement.
- **Respectful Historical Record**: The archive maintains a record of public street murals as painted on urban spaces during the uprising. It is maintained in good faith and is not intended to offend, incite harm, or defame any individual or group.
- **Development & Maintenance**: Developed & Maintained by **Cap Labib** as an open-access community preservation project.
- **Open-Source & Photographer Credits**: Full credit belongs to the courageous student artists, painters, calligraphers, photographers, and citizen contributors who created and captured these works across Bangladesh.

---

## 📄 License & Attribution

This project and its documented contents are licensed under the **Creative Commons Attribution 4.0 International License (CC BY 4.0)**. Developed & Maintained by **Cap Labib**.

You are free to share, adapt, and build upon this material for any non-commercial and educational purpose, provided appropriate credit is given to the original artists, photographers, and the **July Graffiti Archive**.

See the full license text in the [`LICENSE`](LICENSE) file.

