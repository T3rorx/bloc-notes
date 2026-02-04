import path from 'node:path'
import { spawnSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const seedScript = path.resolve(__dirname, '../scripts/seed-from-resources.js')

function runSeed() {
  try {
    const r = spawnSync('node', [seedScript], {
      stdio: 'pipe',
      encoding: 'utf-8',
      cwd: __dirname,
    })
    if (r.status !== 0 && r.stderr) {
      console.warn('[seed]', r.stderr.slice(0, 200))
    }
  } catch {
    // script absent ou erreur : on continue sans bloquer
  }
}

export default defineConfig({
  plugins: [
    {
      name: 'seed-from-resources',
      buildStart() {
        runSeed()
      },
      configureServer() {
        runSeed()
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
