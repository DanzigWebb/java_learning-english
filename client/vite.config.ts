import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        target: 'esnext',
        polyfillDynamicImport: false,
    },
    resolve: {
        alias: {
            '@root': __dirname,
            '@components': path.resolve(__dirname, 'src', 'lib', 'components'),
            '@services': path.resolve(__dirname, 'src', 'services'),
            '@shared': path.resolve(__dirname, 'src', 'shared'),
            '@api': path.resolve(__dirname, 'src', 'services', 'api'),
            '@models': path.resolve(__dirname, 'src', 'models'),
        }
    },
    server: {
        proxy: {
            '/app': {
                target: 'http://localhost:8080/',
                rewrite: (path) => path.replace(/^\/app/, '')
            },
        },
        host: true
    }
});
