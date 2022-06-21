import { defineConfig, loadEnv, PluginOption } from 'vite';
import type { ConfigEnv, UserConfig } from 'vite';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/env';
import { resolve } from 'path';
import pkg from './package.json';
function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir);
}
const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
};
export const OUTPUT_DIR = 'dist';
function setupVite({ command, mode }: ConfigEnv): UserConfig {
  const root = process.cwd();
  const isBuild = command === 'build';
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const plugins: PluginOption[] = createVitePlugins(viteEnv, isBuild);
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins,
    resolve: {
      alias: {
        '@': pathResolve('src'),
      },
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      /**
       * 当 minify=“minify:'terser'” 解开注释
       * Uncomment when minify="minify:'terser'"
       */
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@vue/runtime-core',
        '@vue/shared',
        '@iconify/iconify',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig(setupVite);
