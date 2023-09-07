import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn, util } from 'vite-plugin-monkey'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [util.unimportPreset],
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        author: 'ningbnii',
        name: '掘金自动签到助手',
        icon: 'https://www.wxbuluo.com/favicon.ico',
        namespace: 'ningbnii/monkey_juejin',
        version: '0.0.2',
        description: '这个油猴脚本可以自动为您在掘金网站上进行签到，省去了手动签到的烦恼。只需安装脚本，它将为您自动完成每日签到任务。',
        match: ['https://juejin.cn/*'],
        license: 'GPLv3',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          sweetalert2: cdn.jsdelivr('sweetalert2', 'dist/sweetalert2.min.js'),
        },
      },
    }),
  ],
  build: {
    minify: true,
  },
})
