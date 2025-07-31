# Original Game Demo

A responsive gaming platform with separate mobile and desktop layouts.

## Features

- **Responsive Design**: Automatically switches between mobile and desktop layouts based on screen size
- **Mobile Layout**: Optimized for screens smaller than 768px with compact design
- **Desktop Layout**: Enhanced layout for larger screens with better spacing and hover effects
- **Dynamic Navigation**: Context-aware navigation that adapts to screen size

## Layout Structure

### Mobile Layout (`src/app/components/MobileLayout.tsx`)

- Compact header with smaller logo and text
- 2-column grid for sport cards
- Smaller navigation icons and text
- Optimized spacing for touch interaction

### Desktop Layout (`src/app/components/DesktopLayout.tsx`)

- Larger header with bigger logo and text
- 4-column grid for sport cards
- Larger navigation icons with hover effects
- Centered layout with max-width container

### Screen Detection (`src/app/hooks/useScreenSize.ts`)

- Custom hook that detects screen size
- Automatically switches layouts at 768px breakpoint
- Handles window resize events

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React Hooks for responsive design

## File Structure

```
src/app/
├── components/
│   ├── MobileLayout.tsx
│   └── DesktopLayout.tsx
├── hooks/
│   └── useScreenSize.ts
├── page.tsx
└── layout.tsx
```
