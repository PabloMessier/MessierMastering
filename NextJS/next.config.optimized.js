/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["localhost"],
    unoptimized: true,
    // Add formats for better performance
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  output: "export",
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  
  // Optimize bundle splitting
  experimental: {
    optimizeCss: true,
  },
  
  // Add headers for better caching on S3
  async headers() {
    return [
      {
        source: '/:all*(css|js|gif|svg|jpg|jpeg|png|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(mp4|webm|wav|mp3)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate',
          },
        ],
      },
    ]
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimize chunks
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // Common components chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          },
          // Separate chunk for Radix UI components
          radix: {
            name: 'radix',
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            chunks: 'all',
            priority: 30,
          },
        },
      }
    }
    
    return config
  },
}

module.exports = nextConfig
