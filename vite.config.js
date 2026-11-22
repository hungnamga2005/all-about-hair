
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
      ],
    }),
  ],

  publicDir: false,

  base: '/all-about-hai/',
})
