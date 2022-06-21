import { defineConfig, loadEnv, PluginOption } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import { createVitePlugins } from './build/vite/plugin'
import { wrapperEnv } from './build/env'
import { resolve } from 'path'
function pathResolve(dir: string) {
    return resolve(__dirname, '.', dir)
}

function setupVite({ command, mode }: ConfigEnv): UserConfig {
    const root = process.cwd()
    const isBuild = command === 'build'
    const env = loadEnv(mode, root)
    const viteEnv = wrapperEnv(env)
    const plugins: PluginOption[] = createVitePlugins(viteEnv, isBuild)
    return {}
}
// https://vitejs.dev/config/
export default defineConfig(setupVite)
