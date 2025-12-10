# Performance Optimization Guide for Messier Mastering

## The Problem
Your initial page load shows 1542ms for the first request, while subsequent requests only take 31ms. This is due to:
1. Loading all 12 components simultaneously
2. Heavy client-side components with media players
3. Large bundle size from Radix UI components
4. No code splitting or lazy loading

## Solutions Created

### 1. **LazySection Component** (`components/LazySection.tsx`)
A viewport-based lazy loading wrapper that:
- Uses Intersection Observer API
- Only loads components when they're about to enter the viewport
- Configurable preload margins for media components
- Shows loading placeholders while components load

### 2. **Optimized Page Versions**

#### Option A: Basic Lazy Loading (`app/page-optimized.tsx`)
- Uses Next.js `dynamic` imports
- Suspense boundaries for each section
- SSR disabled for media components
- Good for moderate performance improvement

#### Option B: Viewport Lazy Loading (`app/page-viewport-lazy.tsx`) ⭐ RECOMMENDED
- Combines dynamic imports with viewport detection
- Only loads Header and Hero initially
- Other components load as user scrolls
- Media components have larger preload margins (200-300px)
- Best performance improvement

### 3. **Optimized Configuration** (`next.config.optimized.js`)
- Enables SWC minification
- Optimized chunk splitting strategy
- Separate chunks for Radix UI components
- Cache headers for S3 deployment
- CSS optimization

## Implementation Steps

### Quick Start (Recommended)

1. **Apply the viewport-based lazy loading:**
   ```bash
   cp app/page-viewport-lazy.tsx app/page.tsx
   ```

2. **Test the improvement locally:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Deploy to S3 as usual**

### Full Optimization (Maximum Performance)

1. **Backup current files:**
   ```bash
   cp app/page.tsx app/page.tsx.original
   cp next.config.js next.config.js.original
   ```

2. **Apply all optimizations:**
   ```bash
   cp app/page-viewport-lazy.tsx app/page.tsx
   cp next.config.optimized.js next.config.js
   ```

3. **Build and test:**
   ```bash
   rm -rf .next out
   npm run build
   npm start
   ```

## Expected Improvements

### Before Optimization
- First load: ~1542ms
- All components load immediately
- Large initial JavaScript bundle
- No code splitting

### After Optimization
- First load: ~300-500ms (only Header + Hero)
- Components load on-demand as user scrolls
- Smaller initial bundle (30-50% reduction)
- Better code splitting with separate vendor chunks

## S3 Deployment Considerations

### CloudFront Cache Settings
Add these cache behaviors for optimal performance:

1. **Static Assets** (`*.js`, `*.css`, `*.jpg`, etc.)
   - Cache: 1 year (31536000 seconds)
   - Compress: Yes

2. **Media Files** (`*.mp4`, `*.wav`, `*.mp3`)
   - Cache: 1 day (86400 seconds)
   - Compress: No

3. **HTML Files**
   - Cache: 1 hour (3600 seconds)
   - Compress: Yes

### S3 Bucket Optimization
```bash
# Enable compression for text files
aws s3 sync out/ s3://your-bucket/ \
  --content-encoding gzip \
  --exclude "*" \
  --include "*.js" \
  --include "*.css" \
  --include "*.html" \
  --include "*.json"

# Set cache headers
aws s3 cp out/ s3://your-bucket/ \
  --recursive \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "*.json"
```

## Testing Performance

### Automated Testing
Run the provided test script:
```bash
./test-performance.sh
```

### Manual Testing with Lighthouse
1. Build for production: `npm run build`
2. Serve locally: `npx serve out`
3. Open Chrome DevTools → Lighthouse
4. Run performance audit
5. Target scores:
   - Performance: >90
   - First Contentful Paint: <1.5s
   - Largest Contentful Paint: <2.5s

## Monitoring

### Key Metrics to Track
1. **Core Web Vitals:**
   - LCP (Largest Contentful Paint): Should be <2.5s
   - FID (First Input Delay): Should be <100ms
   - CLS (Cumulative Layout Shift): Should be <0.1

2. **Custom Metrics:**
   - Time to Hero visible
   - Time to first media player ready
   - Total page load time

### Add Analytics (Optional)
```javascript
// In app/layout.tsx
useEffect(() => {
  // Log performance metrics
  if (typeof window !== 'undefined' && window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page Load Time:', pageLoadTime, 'ms');
    
    // Send to your analytics service
    // analytics.track('page_load', { duration: pageLoadTime });
  }
}, []);
```

## Rollback Plan

If you encounter issues, restore the original files:
```bash
cp app/page.tsx.original app/page.tsx
cp next.config.js.original next.config.js
rm -rf .next out
npm run build
```

## Additional Optimizations to Consider

1. **Convert WAV to MP3**: WAV files are huge. Converting to high-quality MP3 (320kbps) would reduce file sizes by ~70%

2. **Video Optimization**: Convert videos to WebM format for better compression

3. **Image Optimization**: Despite `unoptimized: true`, consider:
   - Converting to WebP format
   - Using responsive images
   - Lazy loading with blur placeholders

4. **Preconnect to External Domains**: If using external resources, add to `_document.tsx`:
   ```jsx
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="dns-prefetch" href="https://cdn.example.com" />
   ```

## Questions or Issues?

The optimizations are designed to be:
- ✅ Safe to implement
- ✅ Easy to rollback
- ✅ Compatible with static export
- ✅ S3/CloudFront friendly

Start with the viewport lazy loading for immediate improvement, then gradually apply other optimizations as needed.
