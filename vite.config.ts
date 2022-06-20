import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
function pathResolve(dir) {
    return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
        }),
    ],
    resolve: {
        alias: {
            '@': pathResolve('src'),
        },

        extensions: ['.vue', '.ts', '.tsx'],
    },
})
