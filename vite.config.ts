import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Brotli compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  build: {
    // Code splitting optimization - more aggressive to reduce unused JS
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // More aggressive code splitting to reduce unused JS
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('framer-motion')) {
              return 'motion'
            }
            if (id.includes('react-helmet') || id.includes('react-router')) {
              return 'seo'
            }
            // Split other large dependencies
            return 'vendor'
          }
          // Split large application code
          if (id.includes('src/components/AIChatbot')) {
            return 'chatbot'
          }
        },
      },
    },
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3, // More passes for better optimization
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'], // Remove more console calls
        unused: true, // Remove unused code
        dead_code: true, // Remove dead code
        side_effects: false, // Allow tree-shaking
      },
      mangle: {
        safari10: true,
      },
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize chunk size
    target: 'es2015',
    cssCodeSplit: true,
    cssMinify: true, // Ensure CSS is minified
    // Optimize asset inlining
    assetsInlineLimit: 4096, // Inline small assets
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
