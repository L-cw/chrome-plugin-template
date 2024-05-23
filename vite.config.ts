import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 23456,
  },
  plugins: [
    vue(),
    {
      ...copy({
        targets: [
          { src: 'src/plugins/*', dest: 'dist' }
        ]
      }),
      apply: 'build'
    }
  ],
  root: './src',
  base: '/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/pages/index/index.html'),
        popup: resolve(__dirname, 'src/pages/popup/index.html'),
        devtool: resolve(__dirname, 'src/pages/devtool/index.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name]-chunk.js`
      }
    }
  },
  resolve: {
    alias: {
    '@': resolve(__dirname, './src/')
    },
  },
})
