import path from 'node:path'
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const seedScript = path.resolve(__dirname, '../scripts/seed-from-resources.js')

function runSeed() {
  if (!fs.existsSync(seedScript)) {
    console.log('[seed] Script absent (repo parent avec Resources/ requis)')
    return
  }
  try {
    const r = spawnSync('node', [seedScript], {
      stdio: 'pipe',
      encoding: 'utf-8',
      cwd: path.dirname(seedScript),
    })
    if (r.status === 0 && r.stdout) {
      console.log(r.stdout.trim() || '[seed] OK')
    } else if (r.status !== 0 && r.stderr) {
      console.warn('[seed]', r.stderr.slice(0, 300))
    }
  } catch (e) {
    console.warn('[seed]', e?.message || 'erreur')
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
