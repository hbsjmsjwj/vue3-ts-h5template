import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { resolve } from 'path';
import autoprefixer from 'autoprefixer';
import pxtorem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 4200,
  },
  css:{
    postcss:{
      plugins:[
        autoprefixer(),
        pxtorem({
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: ['ignore'],
        })
      ]
    }
  }
});
