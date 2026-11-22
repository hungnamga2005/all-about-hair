import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'assets/**/*', dest: 'assets' },
        { src: 'ken/**/*', dest: 'ken' },
        { src: 'list/**/*', dest: 'list' },
        { src: 'logo-goc.jpg', dest: '.' },
      ],
    }),
  ],

  publicDir: false,

  base: '/all-about-hair/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
