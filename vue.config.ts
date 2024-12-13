import { defineConfig } from '@vue/cli-service';
import { resolve } from 'path';

export default defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    devServer: {
      port: 8090,
    },
  },
});
