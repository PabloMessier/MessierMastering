# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Messier Mastering is a Next.js 14 application for professional audio mastering services. The project uses TypeScript, Tailwind CSS, and shadcn/ui components with a focus on vibrant gradients, glassmorphism effects, and interactive media players.

## Common Development Commands

### Development
```bash
# Start development server with hot reload
npm run dev
# Opens on http://localhost:3000
```

### Build & Production
```bash
# Build for production (static export)
npm run build

# Start production server (after build)
npm start

# Clean build artifacts
rm -rf .next out
```

### Code Quality
```bash
# Run ESLint (configured to ignore errors during build)
npm run lint

# TypeScript type checking (separate from build)
npx tsc --noEmit

# Format code with Prettier (if needed)
npx prettier --write "**/*.{ts,tsx,js,jsx,json,css,md}"
```

## Architecture & Key Design Patterns

### Component Organization

The application follows a modular component structure where each major section is a standalone component in `/components/`:
- Each component is self-contained with its own state management
- Components use "use client" directive for client-side interactivity
- Media players (AudioExamples, Collaborations, MasteringVideos, RestorationVideos) manage their own playback state

### Styling Architecture

The project uses a multi-layer styling approach:
1. **CSS Custom Properties** in `app/globals.css` define gradient themes:
   - `--gradient-primary`: Purple gradient (#667eea to #764ba2)
   - `--gradient-secondary`: Pink gradient (#f093fb to #f5576c)
   - `--gradient-accent`: Blue gradient (#4facfe to #00f2fe)
   
2. **Tailwind Configuration** extends the default theme with:
   - Custom animations (fade-in-up, slide-up)
   - HSL color variables for shadcn/ui components
   - Inter font family

3. **Glassmorphism Pattern**: Components use backdrop-blur and semi-transparent backgrounds for depth

### Build Configuration

The project is configured for **static export** (`output: "export"` in next.config.js):
- All pages are pre-rendered at build time
- Images are unoptimized for static hosting
- ESLint and TypeScript errors are ignored during builds for faster deployment

### Media Asset Structure

Media files follow a specific directory structure in `/public/`:
```
/public/
  /audio/         # Audio mastering examples
  /VIDEO/
    /Collaboration/  # Collaboration videos
    /Mastering/      # Mastering process videos
    /Restoration/    # Audio restoration examples
  /IMAGES/        # Logo and studio images
```

### Component Communication Pattern

The application uses a flat component structure with no complex state management:
- All components are imported directly into `app/page.tsx`
- Navigation uses hash links (#about, #services, etc.) for smooth scrolling
- No global state management - each component manages its own state

### Path Aliasing

The project uses `@/` path alias configured in `tsconfig.json`:
- `@/components/` maps to `./components/`
- `@/lib/` maps to `./lib/`
- This enables consistent imports regardless of file depth

### Utility Functions

The `lib/utils.ts` file provides the `cn()` function for className merging:
```typescript
cn("base-class", conditionalClass && "conditional-class", "override-class")
```
This pattern is used throughout components for conditional styling with Tailwind.

### shadcn/ui Integration

The project uses shadcn/ui components configured via `components.json`:
- Components are in `/components/ui/`
- Radix UI primitives provide accessibility
- Tailwind CSS variables enable theming
- Components are copy-pasted, not installed as dependencies

## Critical Implementation Details

### Static Export Considerations
- Dynamic routes are not supported
- API routes cannot be used
- All data must be available at build time
- Use client-side fetching for dynamic content

### Performance Optimizations
- Images use Next.js Image component but with `unoptimized: true` for static export
- Lazy loading is handled by intersection observers in media components
- CSS animations use transform and opacity for GPU acceleration

### Media Player Implementation
Audio and video players maintain their own state for:
- Current playing item
- Play/pause state
- Progress tracking
- Volume control (audio only)

Each media component prevents multiple simultaneous playbacks within its category.

## Development Workflow

### Adding New Components
1. Create component in `/components/` with "use client" if interactive
2. Import in `app/page.tsx` 
3. Add corresponding hash link in Header navigation
4. Ensure component follows glassmorphism design pattern

### Modifying Styles
1. Global gradients: Edit CSS variables in `app/globals.css`
2. Component styles: Use Tailwind classes with `cn()` utility
3. Animations: Define in `tailwind.config.js` keyframes

### Working with Media
1. Place files in appropriate `/public/` subdirectory
2. Reference using relative paths in components
3. Ensure proper MIME types for audio/video playback
