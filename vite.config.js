import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  build: { chunkSizeWarningLimit: 600 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['marca/*.webp', 'icons/*.png'],
      manifest: {
        name: 'Quiropraxia Dr. Pablo Andrade',
        short_name: 'Dr. Pablo',
        description: 'Seu acompanhamento com o Dr. Pablo Andrade.',
        lang: 'pt-BR',
        start_url: '/p',
        scope: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#0A4247',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        // Dados de saúde nunca ficam em cache: só o app (HTML/JS/CSS) é cacheado.
        navigateFallback: '/index.html',
        runtimeCaching: []
      }
    })
  ]
})
