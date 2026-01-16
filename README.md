# Bonk Live

A crypto livestreaming platform for token communities built with Next.js 14+, TypeScript, and Tailwind CSS.

![Tech Stack](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

```bash
# Navigate to project directory
cd d:/BonkLive

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal).

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
d:/BonkLive/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.tsx           # Root layout with ThemeProvider, Navbar, Footer
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles with Cyan/Teal theme
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── streams/
│   │   │   ├── page.tsx         # Streams listing page
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Individual stream viewer (dynamic route)
│   │   └── create/
│   │       └── page.tsx         # Create stream page
│   │
│   ├── components/              # React components
│   │   ├── ui/                  # shadcn/ui base components (auto-generated)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── tabs.tsx
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Main navigation with theme toggle
│   │   │   └── Footer.tsx       # Site footer
│   │   │
│   │   ├── home/                # Home page components
│   │   │   ├── HeroSection.tsx  # Hero with branding & CTA
│   │   │   ├── HowItWorks.tsx   # 3-step explanation
│   │   │   ├── TokenInput.tsx   # Token address input with validation
│   │   │   └── CTASection.tsx   # Call-to-action cards
│   │   │
│   │   ├── streams/             # Streams page components
│   │   │   ├── StreamCard.tsx   # Individual stream card
│   │   │   ├── StreamGrid.tsx   # Responsive grid layout
│   │   │   └── StreamFilters.tsx # Search & filter controls
│   │   │
│   │   ├── viewer/              # Stream viewer components
│   │   │   ├── VideoPlayer.tsx  # Video player (placeholder)
│   │   │   ├── ChatSection.tsx  # Live chat (mock messages)
│   │   │   └── TokenStats.tsx   # Token info & stats
│   │   │
│   │   ├── creator/             # Stream creation components
│   │   │   ├── StreamKeyDisplay.tsx # Stream key with copy
│   │   │   └── OBSInstructions.tsx  # OBS setup guide
│   │   │
│   │   ├── shared/              # Shared components
│   │   │   ├── Logo.tsx         # Bonk Live logo
│   │   │   ├── ThemeToggle.tsx  # Dark/light mode switcher
│   │   │   └── WalletButton.tsx # Connect wallet button (UI only)
│   │   │
│   │   └── providers/
│   │       └── theme-provider.tsx # next-themes wrapper
│   │
│   ├── lib/
│   │   ├── utils.ts             # Utility functions (cn helper)
│   │   └── constants.ts         # Site config, routes, features
│   │
│   ├── data/
│   │   └── mockStreams.ts       # Mock data for development
│   │
│   └── types/
│       └── index.ts             # TypeScript type definitions
│
├── public/                      # Static assets (images, icons)
├── components.json              # shadcn/ui configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

---

## 🔑 Key Files Explained

### Core Configuration Files

**`src/app/layout.tsx`**
- Root layout component
- Wraps entire app with ThemeProvider for dark/light mode
- Includes Navbar and Footer on all pages
- Sets up fonts and metadata

**`src/app/globals.css`**
- Global CSS with Tailwind imports
- Defines color palette for light and dark modes
- Cyan/Teal accent colors (differentiates from competitors)
- Custom utility classes (glow effects, gradients)

**`tailwind.config.ts`**
- Tailwind CSS configuration (auto-generated by shadcn/ui)

**`components.json`**
- shadcn/ui configuration
- Defines where components are installed

### Data Layer

**`src/data/mockStreams.ts`**
- Mock stream data for development
- Mock token data
- Mock chat messages
- Helper functions: `getLiveStreams()`, `getStreamById()`, etc.
- **Replace with Supabase queries when backend is ready**

**`src/types/index.ts`**
- TypeScript interfaces for Stream, Token, ChatMessage
- StreamFilter type for filtering

### Layout Components

**`src/components/layout/Navbar.tsx`**
- Sticky navigation bar
- Logo, nav links (About, Streams)
- X (Twitter) link
- Theme toggle button
- Connect Wallet button
- Mobile hamburger menu

**`src/components/layout/Footer.tsx`**
- Footer with links and copyright
- Uses site constants

### Shared Components

**`src/components/shared/WalletButton.tsx`**
- Connect wallet button with dropdown
- States: disconnected, connecting, connected
- Mock functionality (ready for Solana wallet integration)

**`src/components/shared/ThemeToggle.tsx`**
- Sun/Moon icon button
- Switches between dark and light mode
- Uses next-themes

**`src/components/shared/Logo.tsx`**
- Bonk Live logo with SVG icon
- Configurable size (sm, md, lg)

### Page Components

**Home Page** (`src/app/page.tsx`)
- Combines: HeroSection, HowItWorks, TokenInput, CTASection
- Landing page for the site

**Streams Page** (`src/app/streams/page.tsx`)
- Lists all streams (live and ended)
- Search and filter functionality
- Uses StreamCard, StreamGrid, StreamFilters components

**Stream Viewer** (`src/app/streams/[id]/page.tsx`)
- Dynamic route for individual streams
- Video player, chat, token stats
- Two-column layout (player + chat)

**Create Stream** (`src/app/create/page.tsx`)
- Token verification flow
- Stream key display
- OBS setup instructions

**About Page** (`src/app/about/page.tsx`)
- Features grid
- How it works section
- Call-to-action

---

## 🎨 Design System

### Color Palette

**Cyan/Teal Accent** (unique identity, not orange like competitors)
- Primary: `#06B6D4` (oklch(0.7 0.15 195))
- Light: `#22D3EE` (for hover states)
- Dark: `#0891B2` (for active states)
- Glow: `rgba(6,182,212,0.3)` (for effects)

**Dark Mode** (default)
- Background: `#0A0A0A` (near black)
- Card: `#171717` (dark gray)
- Text: `#FAFAFA` (off-white)

**Light Mode**
- Background: `#FFFFFF` (white)
- Card: `#F5F5F5` (light gray)
- Text: `#171717` (dark gray)

### Custom Utility Classes

Defined in `src/app/globals.css`:
- `glow-cyan` - Large cyan glow effect
- `glow-cyan-sm` - Small cyan glow effect
- `text-gradient-cyan` - Cyan gradient text
- `bg-gradient-cyan` - Cyan gradient background


Built using Next.js, TypeScript, and Tailwind CSS
