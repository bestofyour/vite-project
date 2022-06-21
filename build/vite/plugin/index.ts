import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    VitePluginCertificate({
      source: 'coding',
    }),
    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
    }),
  ];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  return vitePlugins;
}
